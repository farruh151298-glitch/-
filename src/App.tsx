import React, { useEffect, useMemo, useState } from 'react';
import {
  CITIES,
  COURIERS_POOL,
  UI_COPY,
  computeDeliveryPriceTjs,
  computeEtaMinutes,
  computeRouteDistanceKm,
} from './data/tajikistanData';
import {
  ActiveOrder,
  CityId,
  DeliveryOptions,
  LanguageCode,
  MapPoint,
  PaymentMethodId,
  TariffId,
  WorkspaceMode,
} from './types/delivery';
import { DispatchPanel } from './components/DispatchPanel';
import { CityMap } from './components/CityMap';
import { FeatureArchitecture } from './components/FeatureArchitecture';

const STORAGE_KEY = 'tezbar_tj_orders_v1';

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('ru');
  const [cityId, setCityId] = useState<CityId>('dushanbe');
  const [mode, setMode] = useState<WorkspaceMode>('client');

  const city = CITIES[cityId];

  const [from, setFrom] = useState<MapPoint>(city.landmarks[city.defaultFromIndex]);
  const [to, setTo] = useState<MapPoint>(city.landmarks[city.defaultToIndex]);
  const [pickTarget, setPickTarget] = useState<'from' | 'to'>('to');

  const [selectedTariff, setSelectedTariff] = useState<TariffId>('scooter');
  const [payment, setPayment] = useState<PaymentMethodId>('alif');
  const [options, setOptions] = useState<DeliveryOptions>({
    doorToDoor: false,
    thermalBag: true,
    photoProof: true,
    cashOnDelivery: false,
    codAmountTjs: '250',
  });

  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);
  const [orderHistory, setOrderHistory] = useState<ActiveOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ActiveOrder[]) : [];
    } catch {
      return [];
    }
  });

  const copy = UI_COPY[lang];

  // Update map points when switching cities
  const handleCityChange = (nextCityId: CityId) => {
    const nextCity = CITIES[nextCityId];
    setCityId(nextCityId);
    setFrom(nextCity.landmarks[nextCity.defaultFromIndex]);
    setTo(nextCity.landmarks[nextCity.defaultToIndex]);
    setActiveOrder(null);
  };

  const distanceKm = useMemo(
    () => computeRouteDistanceKm(from, to, city.kmScale),
    [from, to, city.kmScale]
  );

  const etaMinutes = useMemo(
    () => computeEtaMinutes(selectedTariff, distanceKm),
    [selectedTariff, distanceKm]
  );

  // Persist order history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orderHistory.slice(0, 10)));
    } catch {
      // Ignore storage quota errors
    }
  }, [orderHistory]);

  // Real-time courier dispatch progression simulation
  useEffect(() => {
    if (!activeOrder || activeOrder.stage === 'idle' || activeOrder.stage === 'delivered') {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveOrder((prev) => {
        if (!prev || prev.stage === 'idle' || prev.stage === 'delivered') return prev;

        if (prev.stage === 'searching') {
          return { ...prev, stage: 'to_pickup', progress: 0.05 };
        }

        if (prev.stage === 'to_pickup') {
          const nextProg = prev.progress + 0.14;
          if (nextProg >= 1) {
            return { ...prev, stage: 'at_pickup', progress: 1 };
          }
          return { ...prev, progress: nextProg };
        }

        if (prev.stage === 'at_pickup') {
          return { ...prev, stage: 'in_transit', progress: 0.06 };
        }

        if (prev.stage === 'in_transit') {
          const nextProg = prev.progress + 0.11;
          if (nextProg >= 1) {
            const completed: ActiveOrder = { ...prev, stage: 'delivered', progress: 1 };
            setOrderHistory((hist) =>
              hist.map((item) => (item.id === completed.id ? completed : item))
            );
            return completed;
          }
          return { ...prev, progress: nextProg };
        }

        return prev;
      });
    }, 1100);

    return () => window.clearInterval(timer);
  }, [activeOrder?.id, activeOrder?.stage]);

  const handleCreateOrder = (payload: {
    fromLandmarkNote: string;
    toLandmarkNote: string;
    recipientPhone: string;
  }) => {
    const pool = COURIERS_POOL[selectedTariff];
    const courier = pool[Math.floor(Math.random() * pool.length)];
    const priceTjs = computeDeliveryPriceTjs(
      selectedTariff,
      distanceKm,
      options.doorToDoor,
      city.surgeMultiplier
    );
    const idPrefix =
      cityId === 'dushanbe'
        ? 'TJ'
        : cityId === 'khujand'
          ? 'KH'
          : cityId === 'bokhtar'
            ? 'BK'
            : 'KL';
    const orderNum = Math.floor(1000 + Math.random() * 8999);
    const pinCode = String(Math.floor(1000 + Math.random() * 8999));

    const newOrder: ActiveOrder = {
      id: `${idPrefix}-${orderNum}`,
      cityId,
      tariff: selectedTariff,
      from,
      to,
      fromLandmarkNote: payload.fromLandmarkNote,
      toLandmarkNote: payload.toLandmarkNote,
      recipientPhone: payload.recipientPhone,
      payment,
      options,
      distanceKm,
      priceTjs,
      etaMinutes,
      stage: 'searching',
      pinCode,
      courier,
      createdAt: new Date().toISOString(),
      progress: 0,
    };

    setActiveOrder(newOrder);
    setOrderHistory((prev) => [newOrder, ...prev].slice(0, 10));
  };

  const handleCancelOrder = () => {
    setActiveOrder(null);
  };

  const handleResetOrder = () => {
    setActiveOrder(null);
  };

  const handleSwapPoints = () => {
    const prevFrom = from;
    setFrom(to);
    setTo(prevFrom);
  };

  const handleMapSelectPoint = (point: MapPoint, target: 'from' | 'to') => {
    if (target === 'from') {
      setFrom(point);
      setPickTarget('to');
    } else {
      setTo(point);
    }
  };

  const jumpToDispatch = () => {
    setMode('client');
    const el = document.getElementById('dispatch');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#141413]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#F7F7F5]/95 backdrop-blur-sm border-b border-[#DEDCD4]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#dispatch"
            className="text-xl font-extrabold tracking-tight text-[#141413] whitespace-nowrap shrink-0"
          >
            TezBar
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5C5C58]">
            <a
              href="#dispatch"
              className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {copy.navOrder}
            </a>
            <a
              href="#tariffs"
              className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {copy.navTariffs}
            </a>
            <a
              href="#features"
              className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {copy.navFeatures}
            </a>
            <a
              href="#business"
              className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {copy.navBusiness}
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={jumpToDispatch}
              className="px-4 py-2 bg-[#141413] hover:bg-[#2B2B28] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copy.navAction}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col gap-16">
        {/* Hero + Workspace Toolbar + Dispatch Split */}
        <section id="dispatch" className="scroll-mt-24 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold text-[#5C5C58] mb-2">
                Таджикистан · Электроскутеры, авто и грузовой Лабо
              </p>
              <h1
                className="font-extrabold tracking-tight text-[#141413] leading-[1.12] text-balance"
                style={{ fontSize: 'clamp(1.75rem, 3.1vw, 2.75rem)' }}
              >
                {copy.heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-[#5C5C58] mt-3 max-w-2xl leading-relaxed">
                {copy.heroSubtitle}
              </p>
            </div>

            {/* Workspace Toolbar: City Selector + Language Toggle */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div
                className="inline-flex items-center p-1 bg-[#EAE8E1] rounded-xl"
                role="group"
                aria-label="Город доставки"
              >
                {(['dushanbe', 'khujand', 'bokhtar', 'kulob'] as CityId[]).map((cId) => (
                  <button
                    key={cId}
                    type="button"
                    onClick={() => handleCityChange(cId)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      cityId === cId
                        ? 'bg-white text-[#141413]'
                        : 'text-[#5C5C58] hover:text-[#141413]'
                    }`}
                  >
                    {lang === 'ru' ? CITIES[cId].nameRu : CITIES[cId].nameTj}
                  </button>
                ))}
              </div>

              <div
                className="inline-flex items-center p-1 bg-[#EAE8E1] rounded-xl"
                role="group"
                aria-label="Язык интерфейса"
              >
                <button
                  type="button"
                  onClick={() => setLang('ru')}
                  className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    lang === 'ru'
                      ? 'bg-[#141413] text-white'
                      : 'text-[#5C5C58] hover:text-[#141413]'
                  }`}
                >
                  RU
                </button>
                <button
                  type="button"
                  onClick={() => setLang('tj')}
                  className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    lang === 'tj'
                      ? 'bg-[#141413] text-white'
                      : 'text-[#5C5C58] hover:text-[#141413]'
                  }`}
                >
                  Тоҷикӣ
                </button>
              </div>
            </div>
          </div>

          {/* 12-Column Interactive Split: Dispatch Console + Vector City Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 flex flex-col">
              <DispatchPanel
                lang={lang}
                mode={mode}
                onModeChange={setMode}
                city={city}
                from={from}
                to={to}
                onFromChange={setFrom}
                onToChange={setTo}
                onSwapPoints={handleSwapPoints}
                onFocusMapTarget={setPickTarget}
                selectedTariff={selectedTariff}
                onSelectTariff={setSelectedTariff}
                options={options}
                onOptionsChange={setOptions}
                payment={payment}
                onPaymentChange={setPayment}
                distanceKm={distanceKm}
                activeOrder={activeOrder}
                orderHistory={orderHistory}
                onCreateOrder={handleCreateOrder}
                onCancelOrder={handleCancelOrder}
                onResetOrder={handleResetOrder}
              />
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <CityMap
                city={city}
                from={from}
                to={to}
                selectedTariff={selectedTariff}
                distanceKm={distanceKm}
                etaMinutes={etaMinutes}
                activeOrder={activeOrder}
                pickTarget={pickTarget}
                onPickTargetChange={setPickTarget}
                onMapSelectPoint={handleMapSelectPoint}
                mapHint={copy.mapHint}
              />
            </div>
          </div>
        </section>

        {/* Full Tajikistan Delivery Feature Architecture & Tariff Matrix */}
        <FeatureArchitecture />
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#DEDCD4] bg-[#F2F1EC] mt-12">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5C5C58]">
          <div>
            <span className="font-bold text-[#141413]">TezBar</span> · Прототип сервиса городской
            доставки для Таджикистана (Душанбе, Худжанд, Бохтар, Куляб)
          </div>
          <div className="flex items-center gap-6">
            <a href="#dispatch" className="hover:text-[#141413] whitespace-nowrap">
              Оформление заказа
            </a>
            <a href="#tariffs" className="hover:text-[#141413] whitespace-nowrap">
              Тарифы
            </a>
            <a href="#features" className="hover:text-[#141413] whitespace-nowrap">
              Функции
            </a>
            <a href="#business" className="hover:text-[#141413] whitespace-nowrap">
              Бизнесу
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
