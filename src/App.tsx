import React, { useEffect, useMemo, useState } from 'react';
import {
  CITIES,
  COURIERS_POOL,
  computeDeliveryPriceTjs,
  computeEtaMinutes,
  computeRouteDistanceKm,
} from './data/tajikistanData';
import { STRINGS } from './data/i18n';
import {
  ActiveOrder,
  CityId,
  DeliveryOptions,
  LanguageCode,
  MapPoint,
  ParcelCategoryId,
  PaymentMethodId,
  TariffId,
  WorkspaceMode,
} from './types/delivery';
import { DispatchPanel } from './components/DispatchPanel';
import { CityMap } from './components/CityMap';
import { FeatureArchitecture } from './components/FeatureArchitecture';

const STORAGE_KEY = 'payk_tj_orders_v1';

const LANGUAGE_OPTIONS: Array<{ code: LanguageCode; label: string }> = [
  { code: 'tj', label: 'Тоҷикӣ' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'uz', label: 'Oʻzbekcha' },
];

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('ru');
  const [cityId, setCityId] = useState<CityId>('dushanbe');
  const [mode, setMode] = useState<WorkspaceMode>('client');
  const [category, setCategory] = useState<ParcelCategoryId>('parcel');

  const city = CITIES[cityId];
  const s = STRINGS[lang];

  const [from, setFrom] = useState<MapPoint>(city.landmarks[city.defaultFromIndex]);
  const [to, setTo] = useState<MapPoint>(city.landmarks[city.defaultToIndex]);
  const [pickTarget, setPickTarget] = useState<'from' | 'to'>('to');

  const [selectedTariff, setSelectedTariff] = useState<TariffId>('scooter');
  const [payment, setPayment] = useState<PaymentMethodId>('alif');
  const [options, setOptions] = useState<DeliveryOptions>({
    doorToDoor: false,
    thermalBag: false,
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orderHistory.slice(0, 10)));
    } catch {
      // Ignore storage quota errors
    }
  }, [orderHistory]);

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
      category,
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

  const handleCancelOrder = () => setActiveOrder(null);
  const handleResetOrder = () => setActiveOrder(null);

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
    <div className="min-h-screen flex flex-col bg-[#F6F5F0] text-[#15201B]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#F6F5F0]/95 backdrop-blur-sm border-b border-[#D9D6CB]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#dispatch"
            className="text-xl font-extrabold tracking-tight text-[#0B6E4F] whitespace-nowrap shrink-0"
          >
            {s.brandName}
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5A655F]">
            <a
              href="#dispatch"
              className="hover:text-[#15201B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {s.navOrder}
            </a>
            <a
              href="#tariffs"
              className="hover:text-[#15201B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {s.navTariffs}
            </a>
            <a
              href="#features"
              className="hover:text-[#15201B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {s.navFeatures}
            </a>
            <a
              href="#business"
              className="hover:text-[#15201B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {s.navBusiness}
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={jumpToDispatch}
              className="px-4 py-2 bg-[#0B6E4F] hover:bg-[#09583F] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {s.navAction}
            </button>
          </div>
        </div>

        {/* Subtle Tajik Geometric Girih Band (3px architectural accent) */}
        <div
          className="h-1 w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #0B6E4F 0 24px, #D98218 24px 36px, #F6F5F0 36px 40px)',
          }}
          aria-hidden="true"
        />
      </header>

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col gap-16">
        {/* Hero + Workspace Toolbar (Cities + 4 Languages) + Dispatch Split */}
        <section id="dispatch" className="scroll-mt-24 flex flex-col gap-6">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold text-[#0B6E4F] mb-2">{s.heroKicker}</p>
              <h1
                className="font-extrabold tracking-tight text-[#15201B] leading-[1.12] text-balance"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.65rem)' }}
              >
                {s.heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-[#5A655F] mt-3 max-w-2xl leading-relaxed">
                {s.heroSubtitle}
              </p>
            </div>

            {/* Workspace Toolbar: Cities + 4-Language Switcher */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2.5 shrink-0">
              <div
                className="inline-flex items-center p-1 bg-[#EAE6DA] rounded-xl"
                role="group"
                aria-label="City selector"
              >
                {(['dushanbe', 'khujand', 'bokhtar', 'kulob'] as CityId[]).map((cId) => (
                  <button
                    key={cId}
                    type="button"
                    onClick={() => handleCityChange(cId)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      cityId === cId
                        ? 'bg-white text-[#15201B]'
                        : 'text-[#5A655F] hover:text-[#15201B]'
                    }`}
                  >
                    {CITIES[cId].names[lang]}
                  </button>
                ))}
              </div>

              <div
                className="inline-flex items-center p-1 bg-[#EAE6DA] rounded-xl"
                role="group"
                aria-label="Language selector"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLang(opt.code)}
                    className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      lang === opt.code
                        ? 'bg-[#0B6E4F] text-white'
                        : 'text-[#5A655F] hover:text-[#15201B]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 12-Column Interactive Split */}
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
                category={category}
                onSelectCategory={setCategory}
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
                lang={lang}
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
              />
            </div>
          </div>
        </section>

        {/* Tajikistan Delivery Features, Tariff Matrix & Business Calculator */}
        <FeatureArchitecture lang={lang} />
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#D9D6CB] bg-[#EFECE3] mt-12">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5A655F]">
          <div>
            <span className="font-bold text-[#0B6E4F]">{s.brandName}</span> · {s.footerNote}
          </div>
          <div className="flex items-center gap-6">
            <a href="#dispatch" className="hover:text-[#15201B] whitespace-nowrap">
              {s.navOrder}
            </a>
            <a href="#tariffs" className="hover:text-[#15201B] whitespace-nowrap">
              {s.navTariffs}
            </a>
            <a href="#features" className="hover:text-[#15201B] whitespace-nowrap">
              {s.navFeatures}
            </a>
            <a href="#business" className="hover:text-[#15201B] whitespace-nowrap">
              {s.navBusiness}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
