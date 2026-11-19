import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LocateFixed, Minus, Navigation, Plus } from 'lucide-react';
import { ActiveOrder, CityConfig, MapPoint, TariffId } from '../types/delivery';

interface CityMapProps {
  city: CityConfig;
  from: MapPoint;
  to: MapPoint;
  selectedTariff: TariffId;
  distanceKm: number;
  etaMinutes: number;
  activeOrder: ActiveOrder | null;
  pickTarget: 'from' | 'to';
  onPickTargetChange: (target: 'from' | 'to') => void;
  onMapSelectPoint: (point: MapPoint, target: 'from' | 'to') => void;
  mapHint: string;
}

interface RoamingVehicle {
  id: number;
  type: 'scooter' | 'car';
  roadIndex: number;
  t: number;
  dir: 1 | -1;
  speed: number;
}

function interpolatePolyline(points: Array<[number, number]>, t: number): [number, number] {
  if (points.length === 0) return [500, 320];
  if (points.length === 1) return points[0];
  const clamped = Math.max(0, Math.min(1, t));
  const segCount = points.length - 1;
  const scaled = clamped * segCount;
  const idx = Math.min(segCount - 1, Math.floor(scaled));
  const localT = scaled - idx;
  const [x1, y1] = points[idx];
  const [x2, y2] = points[idx + 1];
  return [x1 + (x2 - x1) * localT, y1 + (y2 - y1) * localT];
}

export const CityMap: React.FC<CityMapProps> = ({
  city,
  from,
  to,
  selectedTariff,
  distanceKm,
  etaMinutes,
  activeOrder,
  pickTarget,
  onPickTargetChange,
  onMapSelectPoint,
  mapHint,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [roaming, setRoaming] = useState<RoamingVehicle[]>([]);

  // Initialize roaming background fleet whenever city changes
  useEffect(() => {
    const roadCount = Math.max(1, city.roads.length);
    const fleet: RoamingVehicle[] = Array.from({ length: 8 }).map((_, idx) => ({
      id: idx,
      type: idx % 3 === 0 ? 'car' : 'scooter',
      roadIndex: idx % roadCount,
      t: ((idx * 0.19) % 0.8) + 0.1,
      dir: idx % 2 === 0 ? 1 : -1,
      speed: idx % 3 === 0 ? 0.0028 : 0.0042,
    }));
    setRoaming(fleet);
  }, [city]);

  // Animate background fleet smoothly using requestAnimationFrame
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(50, now - lastTime);
      lastTime = now;
      const stepFactor = dt / 16.67;

      setRoaming((prev) =>
        prev.map((v) => {
          let nextT = v.t + v.dir * v.speed * stepFactor;
          let nextDir = v.dir;
          if (nextT >= 0.96) {
            nextT = 0.96;
            nextDir = -1;
          } else if (nextT <= 0.04) {
            nextT = 0.04;
            nextDir = 1;
          }
          return { ...v, t: nextT, dir: nextDir };
        })
      );

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Urban street-grid route polyline with intermediate bend point
  const routePoints = useMemo<Array<[number, number]>>(() => {
    const midX = (from.x + to.x) / 2;
    const bendX = Math.abs(from.x - to.x) > 120 ? midX : from.x;
    const bendY = from.y + (to.y - from.y) * 0.42;
    return [
      [from.x, from.y],
      [bendX, from.y + (bendY - from.y) * 0.3],
      [to.x, bendY],
      [to.x, to.y],
    ];
  }, [from.x, from.y, to.x, to.y]);

  const routePathD = useMemo(() => {
    return routePoints
      .map(([x, y], idx) => `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(' ');
  }, [routePoints]);

  // Active courier position during order tracking
  const activeCourierCoords = useMemo<[number, number] | null>(() => {
    if (!activeOrder || activeOrder.stage === 'idle' || activeOrder.stage === 'searching') {
      return null;
    }
    const approachStart: [number, number] = [
      Math.max(60, Math.min(940, activeOrder.from.x - 110)),
      Math.max(60, Math.min(580, activeOrder.from.y + 85)),
    ];
    if (activeOrder.stage === 'to_pickup') {
      return interpolatePolyline([approachStart, [activeOrder.from.x, activeOrder.from.y]], activeOrder.progress);
    }
    if (activeOrder.stage === 'at_pickup') {
      return [activeOrder.from.x, activeOrder.from.y];
    }
    if (activeOrder.stage === 'in_transit') {
      return interpolatePolyline(routePoints, activeOrder.progress);
    }
    return [activeOrder.to.x, activeOrder.to.y];
  }, [activeOrder, routePoints]);

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const viewW = 1000 / zoom;
    const viewH = 640 / zoom;
    const viewX = (1000 - viewW) / 2;
    const viewY = (640 - viewH) / 2;
    const normX = Math.max(40, Math.min(960, viewX + ((e.clientX - rect.left) / rect.width) * viewW));
    const normY = Math.max(40, Math.min(600, viewY + ((e.clientY - rect.top) / rect.height) * viewH));

    onMapSelectPoint(
      {
        x: Math.round(normX),
        y: Math.round(normY),
        label: `Точка на карте (${Math.round(normX)}, ${Math.round(normY)})`,
        landmark: city.nameRu,
      },
      pickTarget
    );
  };

  const viewW = 1000 / zoom;
  const viewH = 640 / zoom;
  const viewX = (1000 - viewW) / 2;
  const viewY = (640 - viewH) / 2;

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[640px] bg-[#ECEBE6] rounded-2xl border border-[#DEDCD4] overflow-hidden flex flex-col justify-between select-none">
      {/* Top interactive pin-selection bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-1 p-1 bg-white/95 backdrop-blur-sm border border-[#DEDCD4] rounded-xl shadow-xs">
          <button
            type="button"
            onClick={() => onPickTargetChange('from')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              pickTarget === 'from'
                ? 'bg-[#141413] text-white'
                : 'text-[#5C5C58] hover:text-[#141413]'
            }`}
          >
            Точка А (Откуда)
          </button>
          <button
            type="button"
            onClick={() => onPickTargetChange('to')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              pickTarget === 'to'
                ? 'bg-[#FFCC00] text-[#141413]'
                : 'text-[#5C5C58] hover:text-[#141413]'
            }`}
          >
            Точка Б (Куда)
          </button>
        </div>

        <div className="pointer-events-auto hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm border border-[#DEDCD4] rounded-xl text-xs text-[#5C5C58]">
          <Navigation className="w-3.5 h-3.5 text-[#141413]" />
          <span>{mapHint}</span>
        </div>
      </div>

      {/* Main SVG Cartographic Canvas */}
      <svg
        ref={svgRef}
        onClick={handleSvgClick}
        viewBox={`${viewX} ${viewY} ${viewW} ${viewH}`}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        role="img"
        aria-label={`Интерактивная карта доставки ${city.nameRu}`}
      >
        {/* City Blocks Subtle Grid */}
        <defs>
          <pattern id="city-blocks" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="#ECEBE6" />
            <rect x="6" y="6" width="32" height="28" rx="3" fill="#E3E1DA" />
            <rect x="44" y="6" width="30" height="32" rx="3" fill="#E4E2DB" />
            <rect x="6" y="40" width="34" height="34" rx="3" fill="#E5E3DC" />
            <rect x="46" y="44" width="28" height="30" rx="3" fill="#E2E0D9" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="1000" height="640" fill="url(#city-blocks)" />

        {/* City Parks */}
        {city.parks.map((park) => (
          <g key={park.label}>
            <rect
              x={park.x}
              y={park.y}
              width={park.w}
              height={park.h}
              rx="10"
              fill="#D4E4CE"
              stroke="#C1D6BA"
              strokeWidth="1.5"
            />
            <text
              x={park.x + park.w / 2}
              y={park.y + park.h / 2 + 4}
              textAnchor="middle"
              className="fill-[#4E6B47] text-[10px] font-medium pointer-events-none"
            >
              {park.label}
            </text>
          </g>
        ))}

        {/* River */}
        <polyline
          points={city.riverPath.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke="#BBD9EE"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x={city.riverPath[1]?.[0] ? city.riverPath[1][0] + 18 : 370}
          y={city.riverPath[1]?.[1] ? city.riverPath[1][1] + 12 : 120}
          className="fill-[#5A85A3] text-[10px] font-medium pointer-events-none"
        >
          {city.riverName}
        </text>

        {/* Arterial Roads (casing + inner fill) */}
        {city.roads.map((road, idx) => {
          const pts = road.points.map(([x, y]) => `${x},${y}`).join(' ');
          return (
            <g key={`road-${idx}`}>
              <polyline
                points={pts}
                fill="none"
                stroke="#D4D2C9"
                strokeWidth={road.width + 3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points={pts}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={road.width}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {road.name && road.points[1] && (
                <text
                  x={road.points[1][0]}
                  y={road.points[1][1] - road.width - 4}
                  textAnchor="middle"
                  className="fill-[#76756F] text-[10px] font-semibold pointer-events-none"
                >
                  {road.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Background Roaming Fleet (E-Scooters & Cars) */}
        {roaming.map((vehicle) => {
          const road = city.roads[vehicle.roadIndex];
          if (!road) return null;
          const [vx, vy] = interpolatePolyline(road.points, vehicle.t);
          return (
            <g key={`fleet-${vehicle.id}`} transform={`translate(${vx}, ${vy})`}>
              {vehicle.type === 'scooter' ? (
                <g>
                  <circle r="7" fill="#FFCC00" stroke="#141413" strokeWidth="1.5" />
                  <rect x="-2.5" y="-2.5" width="5" height="5" rx="1" fill="#141413" />
                </g>
              ) : (
                <g>
                  <rect
                    x="-8"
                    y="-5"
                    width="16"
                    height="10"
                    rx="3"
                    fill="#141413"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <rect x="-3" y="-3" width="6" height="6" rx="1" fill="#FFCC00" />
                </g>
              )}
            </g>
          );
        })}

        {/* Routed Delivery Path A -> B */}
        <path
          d={routePathD}
          fill="none"
          stroke="#141413"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={routePathD}
          fill="none"
          stroke="#FFCC00"
          strokeWidth="2.5"
          strokeDasharray="8 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Clickable City Landmarks */}
        {city.landmarks.map((lm) => {
          const isFrom = Math.abs(lm.x - from.x) < 4 && Math.abs(lm.y - from.y) < 4;
          const isTo = Math.abs(lm.x - to.x) < 4 && Math.abs(lm.y - to.y) < 4;
          if (isFrom || isTo) return null;
          return (
            <g
              key={lm.label}
              transform={`translate(${lm.x}, ${lm.y})`}
              onClick={(e) => {
                e.stopPropagation();
                onMapSelectPoint(lm, pickTarget);
              }}
              className="cursor-pointer group"
            >
              <circle
                r="5.5"
                fill="#FFFFFF"
                stroke="#5C5C58"
                strokeWidth="2"
                className="group-hover:fill-[#FFCC00] group-hover:stroke-[#141413] transition-colors"
              />
              <rect
                x="9"
                y="-11"
                width={(lm.landmark?.length || lm.label.length) * 6.3 + 12}
                height="20"
                rx="5"
                fill="#FFFFFF"
                fillOpacity="0.92"
                stroke="#DEDCD4"
                strokeWidth="1"
              />
              <text
                x="15"
                y="2"
                className="fill-[#2B2B28] text-[10px] font-semibold pointer-events-none"
              >
                {lm.landmark || lm.label}
              </text>
            </g>
          );
        })}

        {/* Pin A (Pickup) */}
        <g transform={`translate(${from.x}, ${from.y})`}>
          <circle r="16" fill="#141413" fillOpacity="0.14" />
          <circle r="11" fill="#141413" stroke="#FFFFFF" strokeWidth="2.5" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            className="fill-white text-[11px] font-bold pointer-events-none"
          >
            А
          </text>
          <rect
            x="-65"
            y="-36"
            width="130"
            height="20"
            rx="6"
            fill="#141413"
          />
          <text
            x="0"
            y="-22"
            textAnchor="middle"
            className="fill-white text-[10px] font-semibold pointer-events-none"
          >
            {from.landmark || from.label}
          </text>
        </g>

        {/* Pin B (Dropoff) */}
        <g transform={`translate(${to.x}, ${to.y})`}>
          <circle r="16" fill="#FFCC00" fillOpacity="0.32" />
          <circle r="11" fill="#FFCC00" stroke="#141413" strokeWidth="2.5" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            className="fill-[#141413] text-[11px] font-bold pointer-events-none"
          >
            Б
          </text>
          <rect
            x="-65"
            y="16"
            width="130"
            height="20"
            rx="6"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.2"
          />
          <text
            x="0"
            y="30"
            textAnchor="middle"
            className="fill-[#141413] text-[10px] font-semibold pointer-events-none"
          >
            {to.landmark || to.label}
          </text>
        </g>

        {/* Active Dispatched Courier Marker */}
        {activeCourierCoords && activeOrder && (
          <g transform={`translate(${activeCourierCoords[0]}, ${activeCourierCoords[1]})`}>
            <circle r="18" fill="#141413" fillOpacity="0.18" />
            <circle r="13" fill="#FFCC00" stroke="#141413" strokeWidth="2.5" />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              className="fill-[#141413] text-[10px] font-extrabold pointer-events-none"
            >
              {activeOrder.tariff === 'scooter'
                ? 'ЭЛ'
                : activeOrder.tariff === 'car'
                  ? 'АВТ'
                  : 'ГРЗ'}
            </text>
          </g>
        )}
      </svg>

      {/* Bottom Route Summary + Zoom Controls */}
      <div className="relative z-10 flex items-end justify-between gap-3 p-3 sm:p-4 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-sm border border-[#DEDCD4] rounded-xl px-4 py-2.5 flex items-center gap-4 text-xs sm:text-sm">
          <div>
            <span className="text-[#5C5C58]">Маршрут: </span>
            <span className="font-bold text-[#141413] tabular-nums">{distanceKm} км</span>
          </div>
          <span className="text-[#DEDCD4]" aria-hidden="true">
            |
          </span>
          <div>
            <span className="text-[#5C5C58]">Подача и путь: </span>
            <span className="font-bold text-[#141413] tabular-nums">~{etaMinutes} мин</span>
          </div>
          <span className="hidden md:inline text-[#DEDCD4]" aria-hidden="true">
            |
          </span>
          <div className="hidden md:block text-[#5C5C58]">
            {selectedTariff === 'scooter'
              ? 'Электроскутер в объезд пробок'
              : selectedTariff === 'car'
                ? 'Климат-контроль и багажник'
                : 'Грузовой борт до 500 кг'}
          </div>
        </div>

        <div className="pointer-events-auto flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.6, Number((z + 0.2).toFixed(2))))}
            aria-label="Увеличить карту"
            className="w-10 h-10 bg-white/95 border border-[#DEDCD4] rounded-xl flex items-center justify-center text-[#141413] hover:bg-[#F7F7F5] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(1, Number((z - 0.2).toFixed(2))))}
            aria-label="Уменьшить карту"
            className="w-10 h-10 bg-white/95 border border-[#DEDCD4] rounded-xl flex items-center justify-center text-[#141413] hover:bg-[#F7F7F5] transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            aria-label="Сбросить масштаб"
            className="w-10 h-10 bg-white/95 border border-[#DEDCD4] rounded-xl flex items-center justify-center text-[#141413] hover:bg-[#F7F7F5] transition-colors cursor-pointer"
          >
            <LocateFixed className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
