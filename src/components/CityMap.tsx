import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LocateFixed, Minus, Navigation, Plus } from 'lucide-react';
import { ActiveOrder, CityConfig, LanguageCode, MapPoint, TariffId } from '../types/delivery';
import { STRINGS } from '../data/i18n';

interface CityMapProps {
  lang: LanguageCode;
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
  lang,
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
}) => {
  const s = STRINGS[lang];
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [roaming, setRoaming] = useState<RoamingVehicle[]>([]);

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
        label: `${city.names[lang]} (${Math.round(normX)}, ${Math.round(normY)})`,
        landmark: city.names[lang],
      },
      pickTarget
    );
  };

  const viewW = 1000 / zoom;
  const viewH = 640 / zoom;
  const viewX = (1000 - viewW) / 2;
  const viewY = (640 - viewH) / 2;

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[680px] bg-[#EAE8E0] rounded-2xl border border-[#D9D6CB] overflow-hidden flex flex-col justify-between select-none">
      {/* Top Pin Selector Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-1 p-1 bg-white/95 backdrop-blur-sm border border-[#D9D6CB] rounded-xl shadow-xs">
          <button
            type="button"
            onClick={() => onPickTargetChange('from')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              pickTarget === 'from'
                ? 'bg-[#0B6E4F] text-white'
                : 'text-[#5A655F] hover:text-[#15201B]'
            }`}
          >
            {s.mapPinFromBtn}
          </button>
          <button
            type="button"
            onClick={() => onPickTargetChange('to')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              pickTarget === 'to'
                ? 'bg-[#D98218] text-white'
                : 'text-[#5A655F] hover:text-[#15201B]'
            }`}
          >
            {s.mapPinToBtn}
          </button>
        </div>

        <div className="pointer-events-auto hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm border border-[#D9D6CB] rounded-xl text-xs text-[#5A655F]">
          <Navigation className="w-3.5 h-3.5 text-[#0B6E4F]" />
          <span>{s.mapHint}</span>
        </div>
      </div>

      {/* Cartographic Canvas */}
      <svg
        ref={svgRef}
        onClick={handleSvgClick}
        viewBox={`${viewX} ${viewY} ${viewW} ${viewH}`}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        role="img"
        aria-label={city.names[lang]}
      >
        <defs>
          <pattern id="tj-city-blocks" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="#EAE8E0" />
            <rect x="6" y="6" width="32" height="28" rx="3" fill="#E1DFD5" />
            <rect x="44" y="6" width="30" height="32" rx="3" fill="#E2E0D6" />
            <rect x="6" y="40" width="34" height="34" rx="3" fill="#E3E1D7" />
            <rect x="46" y="44" width="28" height="30" rx="3" fill="#DFDDD3" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="1000" height="640" fill="url(#tj-city-blocks)" />

        {/* City Parks */}
        {city.parks.map((park) => (
          <g key={park.label}>
            <rect
              x={park.x}
              y={park.y}
              width={park.w}
              height={park.h}
              rx="10"
              fill="#CFE0CC"
              stroke="#B7CEB3"
              strokeWidth="1.5"
            />
            <text
              x={park.x + park.w / 2}
              y={park.y + park.h / 2 + 4}
              textAnchor="middle"
              className="fill-[#3C5C42] text-[10px] font-medium pointer-events-none"
            >
              {park.label}
            </text>
          </g>
        ))}

        {/* Glacial River */}
        <polyline
          points={city.riverPath.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke="#A8CBE0"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x={city.riverPath[1]?.[0] ? city.riverPath[1][0] + 18 : 370}
          y={city.riverPath[1]?.[1] ? city.riverPath[1][1] + 12 : 120}
          className="fill-[#3D6F8E] text-[10px] font-medium pointer-events-none"
        >
          {city.riverNames[lang]}
        </text>

        {/* Arterial Roads */}
        {city.roads.map((road, idx) => {
          const pts = road.points.map(([x, y]) => `${x},${y}`).join(' ');
          return (
            <g key={`road-${idx}`}>
              <polyline
                points={pts}
                fill="none"
                stroke="#D1CEC2"
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
                  className="fill-[#6D756F] text-[10px] font-semibold pointer-events-none"
                >
                  {road.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Roaming Fleet */}
        {roaming.map((vehicle) => {
          const road = city.roads[vehicle.roadIndex];
          if (!road) return null;
          const [vx, vy] = interpolatePolyline(road.points, vehicle.t);
          return (
            <g key={`fleet-${vehicle.id}`} transform={`translate(${vx}, ${vy})`}>
              {vehicle.type === 'scooter' ? (
                <g>
                  <circle r="7" fill="#0B6E4F" stroke="#FFFFFF" strokeWidth="1.5" />
                  <rect x="-2.5" y="-2.5" width="5" height="5" rx="1" fill="#F0A830" />
                </g>
              ) : (
                <g>
                  <rect
                    x="-8"
                    y="-5"
                    width="16"
                    height="10"
                    rx="3"
                    fill="#15201B"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <rect x="-3" y="-3" width="6" height="6" rx="1" fill="#0B6E4F" />
                </g>
              )}
            </g>
          );
        })}

        {/* Route Path A -> B */}
        <path
          d={routePathD}
          fill="none"
          stroke="#0B6E4F"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={routePathD}
          fill="none"
          stroke="#F0A830"
          strokeWidth="2.4"
          strokeDasharray="8 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Landmarks */}
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
                stroke="#0B6E4F"
                strokeWidth="2"
                className="group-hover:fill-[#E89E24] transition-colors"
              />
              <rect
                x="9"
                y="-11"
                width={(lm.landmark?.length || lm.label.length) * 6.4 + 12}
                height="20"
                rx="5"
                fill="#FFFFFF"
                fillOpacity="0.94"
                stroke="#D9D6CB"
                strokeWidth="1"
              />
              <text
                x="15"
                y="2"
                className="fill-[#15201B] text-[10px] font-semibold pointer-events-none"
              >
                {lm.landmark || lm.label}
              </text>
            </g>
          );
        })}

        {/* Pin A */}
        <g transform={`translate(${from.x}, ${from.y})`}>
          <circle r="16" fill="#0B6E4F" fillOpacity="0.16" />
          <circle r="11" fill="#0B6E4F" stroke="#FFFFFF" strokeWidth="2.5" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            className="fill-white text-[11px] font-bold pointer-events-none"
          >
            А
          </text>
          <rect x="-68" y="-36" width="136" height="20" rx="6" fill="#0B6E4F" />
          <text
            x="0"
            y="-22"
            textAnchor="middle"
            className="fill-white text-[10px] font-semibold pointer-events-none"
          >
            {from.landmark || from.label}
          </text>
        </g>

        {/* Pin B */}
        <g transform={`translate(${to.x}, ${to.y})`}>
          <circle r="16" fill="#D98218" fillOpacity="0.24" />
          <circle r="11" fill="#D98218" stroke="#FFFFFF" strokeWidth="2.5" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            className="fill-white text-[11px] font-bold pointer-events-none"
          >
            Б
          </text>
          <rect
            x="-68"
            y="16"
            width="136"
            height="20"
            rx="6"
            fill="#FFFFFF"
            stroke="#D98218"
            strokeWidth="1.4"
          />
          <text
            x="0"
            y="30"
            textAnchor="middle"
            className="fill-[#15201B] text-[10px] font-semibold pointer-events-none"
          >
            {to.landmark || to.label}
          </text>
        </g>

        {/* Active Dispatched Courier Marker */}
        {activeCourierCoords && activeOrder && (
          <g transform={`translate(${activeCourierCoords[0]}, ${activeCourierCoords[1]})`}>
            <circle r="18" fill="#0B6E4F" fillOpacity="0.2" />
            <circle r="13" fill="#E89E24" stroke="#15201B" strokeWidth="2.5" />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              className="fill-[#15201B] text-[10px] font-extrabold pointer-events-none"
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

      {/* Bottom Summary & Zoom */}
      <div className="relative z-10 flex items-end justify-between gap-3 p-3 sm:p-4 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-sm border border-[#D9D6CB] rounded-xl px-4 py-2.5 flex items-center gap-4 text-xs sm:text-sm">
          <div>
            <span className="text-[#5A655F]">{s.mapRouteLabel} </span>
            <span className="font-bold text-[#15201B] tabular-nums">
              {distanceKm} {s.kmShort}
            </span>
          </div>
          <span className="text-[#D9D6CB]" aria-hidden="true">
            |
          </span>
          <div>
            <span className="text-[#5A655F]">{s.mapEtaLabel} </span>
            <span className="font-bold text-[#15201B] tabular-nums">
              ~{etaMinutes} {s.minShort}
            </span>
          </div>
          <span className="hidden md:inline text-[#D9D6CB]" aria-hidden="true">
            |
          </span>
          <div className="hidden md:block text-[#5A655F]">
            {s.mapTariffHints[selectedTariff]}
          </div>
        </div>

        <div className="pointer-events-auto flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.6, Number((z + 0.2).toFixed(2))))}
            aria-label="+"
            className="w-10 h-10 bg-white/95 border border-[#D9D6CB] rounded-xl flex items-center justify-center text-[#15201B] hover:bg-[#F6F5F0] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(1, Number((z - 0.2).toFixed(2))))}
            aria-label="-"
            className="w-10 h-10 bg-white/95 border border-[#D9D6CB] rounded-xl flex items-center justify-center text-[#15201B] hover:bg-[#F6F5F0] transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            aria-label="Reset zoom"
            className="w-10 h-10 bg-white/95 border border-[#D9D6CB] rounded-xl flex items-center justify-center text-[#15201B] hover:bg-[#F6F5F0] transition-colors cursor-pointer"
          >
            <LocateFixed className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
