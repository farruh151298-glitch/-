import React, { useState } from 'react';
import {
  ArrowUpDown,
  Camera,
  Check,
  ChevronDown,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Search,
  ShieldCheck,
  Thermometer,
  Wallet,
} from 'lucide-react';
import {
  ActiveOrder,
  CityConfig,
  CourierJobOffer,
  DeliveryOptions,
  LanguageCode,
  MapPoint,
  ParcelCategoryId,
  PaymentMethodId,
  TariffId,
  WorkspaceMode,
} from '../types/delivery';
import {
  PARCEL_CATEGORY_PRESETS,
  PAYMENT_METHODS,
  SAMPLE_COURIER_JOBS,
  TARIFFS,
  computeDeliveryPriceTjs,
  computeEtaMinutes,
} from '../data/tajikistanData';
import { STRINGS } from '../data/i18n';
import { VehicleArtwork } from './VehicleArtwork';

interface DispatchPanelProps {
  lang: LanguageCode;
  mode: WorkspaceMode;
  onModeChange: (mode: WorkspaceMode) => void;
  city: CityConfig;
  from: MapPoint;
  to: MapPoint;
  onFromChange: (pt: MapPoint) => void;
  onToChange: (pt: MapPoint) => void;
  onSwapPoints: () => void;
  onFocusMapTarget: (target: 'from' | 'to') => void;
  selectedTariff: TariffId;
  onSelectTariff: (tariff: TariffId) => void;
  category: ParcelCategoryId;
  onSelectCategory: (cat: ParcelCategoryId) => void;
  options: DeliveryOptions;
  onOptionsChange: (next: DeliveryOptions) => void;
  payment: PaymentMethodId;
  onPaymentChange: (method: PaymentMethodId) => void;
  distanceKm: number;
  activeOrder: ActiveOrder | null;
  orderHistory: ActiveOrder[];
  onCreateOrder: (payload: {
    fromLandmarkNote: string;
    toLandmarkNote: string;
    recipientPhone: string;
  }) => void;
  onCancelOrder: () => void;
  onResetOrder: () => void;
}

export const DispatchPanel: React.FC<DispatchPanelProps> = ({
  lang,
  mode,
  onModeChange,
  city,
  from,
  to,
  onFromChange,
  onToChange,
  onSwapPoints,
  onFocusMapTarget,
  selectedTariff,
  onSelectTariff,
  category,
  onSelectCategory,
  options,
  onOptionsChange,
  payment,
  onPaymentChange,
  distanceKm,
  activeOrder,
  orderHistory,
  onCreateOrder,
  onCancelOrder,
  onResetOrder,
}) => {
  const s = STRINGS[lang];
  const [fromNote, setFromNote] = useState('');
  const [toNote, setToNote] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('+992 93 400 12 88');
  const [phoneError, setPhoneError] = useState('');
  const [showFromMenu, setShowFromMenu] = useState(false);
  const [showToMenu, setShowToMenu] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'me' | 'courier'; text: string }>>([]);

  // Courier Pro Mode state
  const [courierOnline, setCourierOnline] = useState(true);
  const [courierVehicle, setCourierVehicle] = useState<'scooter' | 'car'>('scooter');
  const [earningsTjs, setEarningsTjs] = useState(142);
  const [completedShifts, setCompletedShifts] = useState(7);
  const [acceptedJob, setAcceptedJob] = useState<{
    job: CourierJobOffer;
    step: 'to_a' | 'at_a' | 'to_b' | 'done';
  } | null>(null);

  // Track Mode state
  const [trackQuery, setTrackQuery] = useState('TJ-8492');
  const [trackedOrder, setTrackedOrder] = useState<ActiveOrder | null>(null);

  const calculatedPrice = computeDeliveryPriceTjs(
    selectedTariff,
    distanceKm,
    options.doorToDoor,
    city.surgeMultiplier
  );

  const handleCategoryClick = (cat: ParcelCategoryId) => {
    onSelectCategory(cat);
    const preset = PARCEL_CATEGORY_PRESETS[cat];
    onSelectTariff(preset.recommendedTariff);
    onOptionsChange({
      ...options,
      thermalBag: preset.thermalBag,
      cashOnDelivery: preset.cod,
    });
  };

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = recipientPhone.replace(/[^\d+]/g, '');
    if (cleaned.length < 9) {
      setPhoneError(s.phoneErrorMsg);
      return;
    }
    setPhoneError('');
    setChatLog([{ sender: 'courier', text: s.chatGreeting }]);
    onCreateOrder({
      fromLandmarkNote: fromNote,
      toLandmarkNote: toNote || s.landmarkPlaceholder,
      recipientPhone,
    });
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chatMessage.trim();
    if (!trimmed) return;
    setChatLog((prev) => [
      ...prev,
      { sender: 'me', text: trimmed },
      { sender: 'courier', text: s.chatAutoReply },
    ]);
    setChatMessage('');
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = trackQuery.trim().toUpperCase();
    const found =
      (activeOrder && activeOrder.id.toUpperCase() === q ? activeOrder : null) ||
      orderHistory.find((o) => o.id.toUpperCase() === q) ||
      null;
    setTrackedOrder(found);
  };

  const jobsForCity = SAMPLE_COURIER_JOBS[city.id] || [];

  return (
    <div className="bg-white rounded-2xl border border-[#D9D6CB] p-5 sm:p-6 flex flex-col gap-5 h-full">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between gap-3">
        <div
          className="inline-flex items-center p-1 bg-[#EFECE3] rounded-xl w-full sm:w-auto"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'client'}
            onClick={() => onModeChange('client')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'client'
                ? 'bg-white text-[#15201B] shadow-xs'
                : 'text-[#5A655F] hover:text-[#15201B]'
            }`}
          >
            {s.modeClient}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'courier'}
            onClick={() => onModeChange('courier')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'courier'
                ? 'bg-white text-[#15201B] shadow-xs'
                : 'text-[#5A655F] hover:text-[#15201B]'
            }`}
          >
            {s.modeCourier}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'track'}
            onClick={() => onModeChange('track')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'track'
                ? 'bg-white text-[#15201B] shadow-xs'
                : 'text-[#5A655F] hover:text-[#15201B]'
            }`}
          >
            {s.modeTrack}
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#5A655F] whitespace-nowrap shrink-0">
          <span>{city.surgeLabels[lang]}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono font-medium text-[#0B6E4F] tabular-nums">
            ×{city.surgeMultiplier.toFixed(1)}
          </span>
        </div>
      </div>

      {/* MODE 1: CLIENT ORDER DISPATCH */}
      {mode === 'client' && (!activeOrder || activeOrder.stage === 'idle') && (
        <form onSubmit={handleDispatchSubmit} className="flex flex-col gap-4">
          {/* Tajik Parcel Category Selector */}
          <div>
            <div className="text-xs font-semibold text-[#5A655F] mb-2">{s.categoryLabel}</div>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(s.categories) as ParcelCategoryId[]).map((catId) => (
                <button
                  key={catId}
                  type="button"
                  onClick={() => handleCategoryClick(catId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    category === catId
                      ? 'bg-[#0B6E4F] text-white border-[#0B6E4F]'
                      : 'bg-[#FAF9F5] text-[#15201B] border-[#D9D6CB] hover:border-[#0B6E4F]'
                  }`}
                >
                  {s.categories[catId]}
                </button>
              ))}
            </div>
          </div>

          {/* Route A -> B Inputs */}
          <div className="flex flex-col gap-2.5 relative">
            <div className="relative">
              <div className="flex items-center gap-2.5 border border-[#D9D6CB] rounded-xl px-3.5 py-2.5 bg-[#FAF9F5] focus-within:border-[#0B6E4F] focus-within:bg-white transition-colors">
                <span className="w-6 h-6 rounded-full bg-[#0B6E4F] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  А
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-[#5A655F]">{s.pickupLabel}</div>
                  <input
                    type="text"
                    value={from.landmark ? `${from.label} (${from.landmark})` : from.label}
                    onChange={(e) =>
                      onFromChange({
                        ...from,
                        label: e.target.value,
                        landmark: undefined,
                      })
                    }
                    onFocus={() => {
                      setShowFromMenu(true);
                      setShowToMenu(false);
                      onFocusMapTarget('from');
                    }}
                    placeholder={s.fromPlaceholder}
                    className="w-full bg-transparent text-sm font-semibold text-[#15201B] placeholder:text-[#8A928D] focus:outline-none truncate"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowFromMenu((v) => !v)}
                  aria-label="Open pickup landmarks"
                  className="p-1.5 text-[#5A655F] hover:text-[#15201B] cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {showFromMenu && (
                <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-white border border-[#D9D6CB] rounded-xl shadow-lg max-h-52 overflow-y-auto py-1">
                  {city.landmarks.map((lm) => (
                    <button
                      key={`from-${lm.label}`}
                      type="button"
                      onClick={() => {
                        onFromChange(lm);
                        setShowFromMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F6F5F0] flex items-center justify-between gap-2 text-sm cursor-pointer"
                    >
                      <span className="font-medium text-[#15201B] truncate">{lm.landmark || lm.label}</span>
                      <span className="text-xs text-[#5A655F] shrink-0">{lm.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end -my-3.5 pr-10 relative z-20">
              <button
                type="button"
                onClick={onSwapPoints}
                aria-label="Swap points"
                className="w-8 h-8 rounded-full bg-white border border-[#D9D6CB] flex items-center justify-center text-[#0B6E4F] hover:bg-[#F6F5F0] transition-colors shadow-xs cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative">
              <div className="flex items-center gap-2.5 border border-[#D9D6CB] rounded-xl px-3.5 py-2.5 bg-[#FAF9F5] focus-within:border-[#D98218] focus-within:bg-white transition-colors">
                <span className="w-6 h-6 rounded-full bg-[#D98218] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  Б
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-[#5A655F]">{s.dropoffLabel}</div>
                  <input
                    type="text"
                    value={to.landmark ? `${to.label} (${to.landmark})` : to.label}
                    onChange={(e) =>
                      onToChange({
                        ...to,
                        label: e.target.value,
                        landmark: undefined,
                      })
                    }
                    onFocus={() => {
                      setShowToMenu(true);
                      setShowFromMenu(false);
                      onFocusMapTarget('to');
                    }}
                    placeholder={s.toPlaceholder}
                    className="w-full bg-transparent text-sm font-semibold text-[#15201B] placeholder:text-[#8A928D] focus:outline-none truncate"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowToMenu((v) => !v)}
                  aria-label="Open dropoff landmarks"
                  className="p-1.5 text-[#5A655F] hover:text-[#15201B] cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {showToMenu && (
                <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-white border border-[#D9D6CB] rounded-xl shadow-lg max-h-52 overflow-y-auto py-1">
                  {city.landmarks.map((lm) => (
                    <button
                      key={`to-${lm.label}`}
                      type="button"
                      onClick={() => {
                        onToChange(lm);
                        setShowToMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F6F5F0] flex items-center justify-between gap-2 text-sm cursor-pointer"
                    >
                      <span className="font-medium text-[#15201B] truncate">{lm.landmark || lm.label}</span>
                      <span className="text-xs text-[#5A655F] shrink-0">{lm.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              value={toNote}
              onChange={(e) => setToNote(e.target.value)}
              placeholder={s.landmarkPlaceholder}
              className="w-full border border-[#D9D6CB] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#15201B] placeholder:text-[#8A928D] bg-white focus:border-[#0B6E4F] focus:outline-none"
            />
          </div>

          {/* Vehicle Tariff Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {(['scooter', 'car', 'cargo'] as TariffId[]).map((tId) => {
              const t = TARIFFS[tId];
              const price = computeDeliveryPriceTjs(
                tId,
                distanceKm,
                options.doorToDoor,
                city.surgeMultiplier
              );
              const eta = computeEtaMinutes(tId, distanceKm);
              const isSelected = selectedTariff === tId;
              return (
                <button
                  key={tId}
                  type="button"
                  onClick={() => onSelectTariff(tId)}
                  className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'border-[#0B6E4F] bg-[#F1F8F5]'
                      : 'border-[#D9D6CB] bg-white hover:border-[#8A928D]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <VehicleArtwork type={tId} className="w-14 h-9" />
                    <span className="text-xs font-mono font-semibold text-[#15201B] tabular-nums">
                      ~{eta} {s.minShort}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#15201B]">{t.names[lang]}</div>
                    <div className="text-[11px] text-[#5A655F] mt-0.5">
                      {s.upTo} {t.maxWeightKg} {s.kgShort} · {t.dimensionsCm}
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#E6E4DA] flex items-baseline justify-between">
                    <span className="text-base font-extrabold text-[#15201B] tabular-nums">
                      {price} {s.currency}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#0B6E4F]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Delivery Options */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-[#5A655F]">{s.optionsLabel}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="flex items-center gap-2.5 px-3 py-2 border border-[#D9D6CB] rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-[#FAF9F5]">
                <input
                  type="checkbox"
                  checked={options.doorToDoor}
                  onChange={(e) =>
                    onOptionsChange({ ...options, doorToDoor: e.target.checked })
                  }
                  className="accent-[#0B6E4F] w-4 h-4 rounded"
                />
                <Package className="w-3.5 h-3.5 text-[#5A655F] shrink-0" />
                <span className="text-[#15201B] truncate">{s.optDoor}</span>
              </label>

              <label className="flex items-center gap-2.5 px-3 py-2 border border-[#D9D6CB] rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-[#FAF9F5]">
                <input
                  type="checkbox"
                  checked={options.thermalBag}
                  onChange={(e) =>
                    onOptionsChange({ ...options, thermalBag: e.target.checked })
                  }
                  className="accent-[#0B6E4F] w-4 h-4 rounded"
                />
                <Thermometer className="w-3.5 h-3.5 text-[#5A655F] shrink-0" />
                <span className="text-[#15201B] truncate">{s.optThermal}</span>
              </label>

              <label className="flex items-center gap-2.5 px-3 py-2 border border-[#D9D6CB] rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-[#FAF9F5]">
                <input
                  type="checkbox"
                  checked={options.photoProof}
                  onChange={(e) =>
                    onOptionsChange({ ...options, photoProof: e.target.checked })
                  }
                  className="accent-[#0B6E4F] w-4 h-4 rounded"
                />
                <Camera className="w-3.5 h-3.5 text-[#5A655F] shrink-0" />
                <span className="text-[#15201B] truncate">{s.optPhoto}</span>
              </label>

              <label className="flex items-center gap-2.5 px-3 py-2 border border-[#D9D6CB] rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-[#FAF9F5]">
                <input
                  type="checkbox"
                  checked={options.cashOnDelivery}
                  onChange={(e) =>
                    onOptionsChange({ ...options, cashOnDelivery: e.target.checked })
                  }
                  className="accent-[#0B6E4F] w-4 h-4 rounded"
                />
                <Wallet className="w-3.5 h-3.5 text-[#5A655F] shrink-0" />
                <span className="text-[#15201B] truncate">{s.optCod}</span>
              </label>
            </div>

            {options.cashOnDelivery && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[#5A655F] whitespace-nowrap">
                  {s.codAmountLabel}
                </span>
                <input
                  type="number"
                  min={10}
                  max={10000}
                  value={options.codAmountTjs}
                  onChange={(e) =>
                    onOptionsChange({ ...options, codAmountTjs: e.target.value })
                  }
                  placeholder="250"
                  className="w-28 border border-[#D9D6CB] rounded-lg px-2.5 py-1 text-sm font-mono tabular-nums focus:border-[#0B6E4F] focus:outline-none"
                />
                <span className="text-xs font-medium text-[#15201B]">{s.currency}</span>
              </div>
            )}
          </div>

          {/* Payment + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#5A655F] mb-1.5">
                {s.paymentLabel}
              </label>
              <select
                value={payment}
                onChange={(e) => onPaymentChange(e.target.value as PaymentMethodId)}
                className="w-full border border-[#D9D6CB] rounded-xl px-3 py-2.5 text-sm font-semibold text-[#15201B] bg-white focus:border-[#0B6E4F] focus:outline-none cursor-pointer"
              >
                {PAYMENT_METHODS.map((pm) => (
                  <option key={pm.id} value={pm.id}>
                    {pm.label} — {pm.hints[lang]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A655F] mb-1.5">
                {s.recipientPhoneLabel}
              </label>
              <input
                type="tel"
                value={recipientPhone}
                onChange={(e) => {
                  setRecipientPhone(e.target.value);
                  setPhoneError('');
                }}
                placeholder="+992 90 123 45 67"
                className="w-full border border-[#D9D6CB] rounded-xl px-3 py-2.5 text-sm font-mono tabular-nums text-[#15201B] bg-white focus:border-[#0B6E4F] focus:outline-none"
              />
              {phoneError && <p className="text-xs text-[#C62828] mt-1">{phoneError}</p>}
            </div>
          </div>

          {/* Submit CTA in Tajik Emerald */}
          <button
            type="submit"
            className="w-full py-3.5 px-5 bg-[#0B6E4F] hover:bg-[#09583F] text-white font-bold text-sm sm:text-base rounded-xl transition-colors flex items-center justify-between gap-3 cursor-pointer"
          >
            <span>{s.dispatchCta}</span>
            <span className="font-mono tabular-nums">
              {calculatedPrice} {s.currency}
            </span>
          </button>
        </form>
      )}

      {/* MODE 1B: LIVE ACTIVE ORDER VIEW */}
      {mode === 'client' && activeOrder && activeOrder.stage !== 'idle' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#E6E4DA] pb-3">
            <div>
              <div className="text-xs text-[#5A655F]">
                {s.orderLabel} <span className="font-mono font-semibold text-[#15201B]">{activeOrder.id}</span> ·{' '}
                {city.names[lang]}
              </div>
              <h3 className="text-lg font-bold text-[#15201B] mt-0.5">
                {s.stages[activeOrder.stage]}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-base font-extrabold font-mono tabular-nums text-[#0B6E4F]">
                {activeOrder.priceTjs} {s.currency}
              </div>
              <div className="text-xs text-[#5A655F] tabular-nums">
                {activeOrder.distanceKm} {s.kmShort}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {(['searching', 'to_pickup', 'at_pickup', 'in_transit'] as const).map((step, idx) => {
              const orderOrder = ['searching', 'to_pickup', 'at_pickup', 'in_transit', 'delivered'];
              const currentIdx = orderOrder.indexOf(activeOrder.stage);
              const done = currentIdx > idx;
              const active = currentIdx === idx;
              return (
                <div key={step} className="flex flex-col gap-1">
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      done || activeOrder.stage === 'delivered'
                        ? 'bg-[#0B6E4F]'
                        : active
                          ? 'bg-[#D98218]'
                          : 'bg-[#E6E4DA]'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {activeOrder.stage !== 'searching' && (
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#D9D6CB] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <VehicleArtwork type={activeOrder.tariff} className="w-14 h-9 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#15201B] truncate">
                    {activeOrder.courier.name} · ★ {activeOrder.courier.rating}
                  </div>
                  <div className="text-xs text-[#5A655F] truncate">
                    {activeOrder.courier.vehicleModel} ·{' '}
                    <span className="font-mono font-semibold text-[#15201B]">
                      {activeOrder.courier.plate}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen((v) => !v)}
                className="px-3 py-2 rounded-lg border border-[#D9D6CB] bg-white hover:bg-[#F6F5F0] text-xs font-semibold text-[#15201B] flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#0B6E4F]" />
                <span>{s.chatBtn}</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-[#D9D6CB] bg-white">
              <div className="flex items-center gap-1.5 text-xs text-[#5A655F]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B6E4F]" />
                <span>{s.pinTitle}</span>
              </div>
              <div className="text-xl font-extrabold font-mono tracking-widest text-[#15201B] mt-1 tabular-nums">
                {activeOrder.pinCode}
              </div>
              <div className="text-[11px] text-[#5A655F] mt-0.5">{s.pinHint}</div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#D9D6CB] bg-white">
              <div className="flex items-center gap-1.5 text-xs text-[#5A655F]">
                <Camera className="w-3.5 h-3.5 text-[#0B6E4F]" />
                <span>{s.photoTitle}</span>
              </div>
              <div className="text-sm font-bold text-[#15201B] mt-1">
                {activeOrder.stage === 'in_transit' || activeOrder.stage === 'delivered'
                  ? s.photoDone
                  : s.photoWait}
              </div>
              <div className="text-[11px] text-[#5A655F] mt-0.5">
                {activeOrder.options.thermalBag ? s.thermalActive : s.standardPack}
              </div>
            </div>
          </div>

          <div className="text-xs text-[#5A655F] space-y-1.5 border-t border-[#E6E4DA] pt-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#0B6E4F] shrink-0" />
              <span className="font-semibold text-[#15201B]">А:</span>
              <span className="truncate">{activeOrder.from.landmark || activeOrder.from.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D98218] shrink-0" />
              <span className="font-semibold text-[#15201B]">Б:</span>
              <span className="truncate">
                {activeOrder.to.landmark || activeOrder.to.label} ({activeOrder.toLandmarkNote})
              </span>
            </div>
          </div>

          {chatOpen && (
            <div className="border border-[#D9D6CB] rounded-xl p-3 bg-[#FAF9F5] flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#15201B]">
                <span>
                  {s.chatHeader} ({activeOrder.courier.phone})
                </span>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="text-[#5A655F] hover:text-[#15201B] cursor-pointer"
                >
                  {s.chatClose}
                </button>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 text-xs">
                {chatLog.map((m, i) => (
                  <div
                    key={i}
                    className={`px-2.5 py-1.5 rounded-lg max-w-[85%] ${
                      m.sender === 'me'
                        ? 'ml-auto bg-[#0B6E4F] text-white'
                        : 'bg-white border border-[#D9D6CB] text-[#15201B]'
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={s.chatPlaceholder}
                  className="flex-1 border border-[#D9D6CB] rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:border-[#0B6E4F]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#0B6E4F] text-white text-xs font-bold cursor-pointer"
                >
                  {s.chatSend}
                </button>
              </form>
            </div>
          )}

          <div className="flex items-center gap-2.5 pt-1">
            {activeOrder.stage !== 'delivered' ? (
              <button
                type="button"
                onClick={onCancelOrder}
                className="w-full py-2.5 px-4 border border-[#D9D6CB] rounded-xl text-sm font-semibold text-[#15201B] hover:bg-[#F6F5F0] transition-colors cursor-pointer"
              >
                {s.cancelOrder}
              </button>
            ) : (
              <button
                type="button"
                onClick={onResetOrder}
                className="w-full py-3 px-4 bg-[#0B6E4F] text-white rounded-xl text-sm font-bold hover:bg-[#09583F] transition-colors cursor-pointer"
              >
                {s.newOrder}
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: COURIER PRO WORKSPACE */}
      {mode === 'courier' && (
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-[#0F241C] text-white flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs text-[#A7C4B8]">
                {s.courierEarningsTitle} · {city.names[lang]}
              </div>
              <div className="text-2xl font-extrabold font-mono tabular-nums mt-0.5">
                {earningsTjs} {s.currency}
              </div>
              <div className="text-xs text-[#A7C4B8] mt-0.5 tabular-nums">
                {s.courierCompletedPrefix} {completedShifts} · Alif Mobi / DC
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCourierOnline((v) => !v)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                courierOnline
                  ? 'bg-[#E89E24] text-[#15201B]'
                  : 'bg-[#1D3B30] text-white border border-[#355E4E]'
              }`}
            >
              {courierOnline ? s.courierOnlineBtn : s.courierOfflineBtn}
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[#5A655F]">{s.courierVehicleLabel}</span>
            <div className="inline-flex p-1 bg-[#EFECE3] rounded-lg">
              <button
                type="button"
                onClick={() => setCourierVehicle('scooter')}
                className={`px-3 py-1 text-xs font-semibold rounded-md cursor-pointer ${
                  courierVehicle === 'scooter' ? 'bg-white text-[#15201B]' : 'text-[#5A655F]'
                }`}
              >
                {s.courierScooter}
              </button>
              <button
                type="button"
                onClick={() => setCourierVehicle('car')}
                className={`px-3 py-1 text-xs font-semibold rounded-md cursor-pointer ${
                  courierVehicle === 'car' ? 'bg-white text-[#15201B]' : 'text-[#5A655F]'
                }`}
              >
                {s.courierCar}
              </button>
            </div>
          </div>

          {!courierOnline ? (
            <div className="p-6 rounded-xl border border-[#D9D6CB] bg-[#FAF9F5] text-center">
              <p className="text-sm font-semibold text-[#15201B]">{s.courierOfflineTitle}</p>
              <p className="text-xs text-[#5A655F] mt-1">{s.courierOfflineBody}</p>
            </div>
          ) : acceptedJob ? (
            <div className="p-4 rounded-xl border border-[#0B6E4F] bg-[#F1F8F5] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0B6E4F]">
                  {acceptedJob.job.id} · +{acceptedJob.job.payoutTjs} {s.currency}
                </span>
                <span className="text-xs font-semibold text-[#15201B]">
                  {acceptedJob.step === 'to_a' && s.courierStepToA}
                  {acceptedJob.step === 'at_a' && s.courierStepAtA}
                  {acceptedJob.step === 'to_b' && s.courierStepToB}
                  {acceptedJob.step === 'done' && s.courierStepDone}
                </span>
              </div>

              <div className="text-xs text-[#15201B] space-y-1">
                <div>
                  <span className="font-bold">{s.courierPickLabel}</span> {acceptedJob.job.fromLabel}
                </div>
                <div>
                  <span className="font-bold">{s.courierDropLabel}</span> {acceptedJob.job.toLabel}
                </div>
              </div>

              {acceptedJob.step === 'to_a' && (
                <button
                  type="button"
                  onClick={() => setAcceptedJob({ ...acceptedJob, step: 'at_a' })}
                  className="w-full py-2.5 bg-[#0B6E4F] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {s.courierBtnArrivedA}
                </button>
              )}
              {acceptedJob.step === 'at_a' && (
                <button
                  type="button"
                  onClick={() => setAcceptedJob({ ...acceptedJob, step: 'to_b' })}
                  className="w-full py-2.5 bg-[#0B6E4F] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {s.courierBtnPhotoTake}
                </button>
              )}
              {acceptedJob.step === 'to_b' && (
                <button
                  type="button"
                  onClick={() => {
                    setEarningsTjs((prev) => prev + acceptedJob.job.payoutTjs);
                    setCompletedShifts((prev) => prev + 1);
                    setAcceptedJob({ ...acceptedJob, step: 'done' });
                  }}
                  className="w-full py-2.5 bg-[#D98218] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {s.courierBtnPinFinish} (+{acceptedJob.job.payoutTjs} {s.currency})
                </button>
              )}
              {acceptedJob.step === 'done' && (
                <button
                  type="button"
                  onClick={() => setAcceptedJob(null)}
                  className="w-full py-2.5 bg-white border border-[#0B6E4F] text-[#0B6E4F] text-xs font-bold rounded-xl cursor-pointer"
                >
                  {s.courierBtnBackToFeed}
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <div className="text-xs font-semibold text-[#5A655F]">
                {s.courierAvailableJobs} ({jobsForCity.length})
              </div>
              {jobsForCity.map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-xl border border-[#D9D6CB] bg-white hover:border-[#0B6E4F] transition-colors flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs text-[#5A655F]">
                        {job.id} · {job.distanceKm} {s.kmShort} · {job.pickupMinutes} {s.minShort} · {job.surge}
                      </div>
                      <div className="text-sm font-bold text-[#15201B] mt-0.5">
                        {job.fromLabel} → {job.toLabel}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-extrabold font-mono tabular-nums text-[#0B6E4F]">
                        +{job.payoutTjs} {s.currency}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E6E4DA]">
                    <span className="text-[11px] text-[#5A655F] truncate">
                      {job.tags.join(' · ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAcceptedJob({ job, step: 'to_a' })}
                      className="px-3.5 py-1.5 bg-[#0B6E4F] hover:bg-[#09583F] text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer"
                    >
                      {s.courierAcceptBtn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODE 3: ORDER TRACKING */}
      {mode === 'track' && (
        <div className="flex flex-col gap-4">
          <form onSubmit={handleTrackSearch} className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 border border-[#D9D6CB] rounded-xl px-3.5 py-2.5 bg-[#FAF9F5] focus-within:bg-white focus-within:border-[#0B6E4F]">
              <Search className="w-4 h-4 text-[#5A655F]" />
              <input
                type="text"
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder={s.trackPlaceholder}
                className="w-full bg-transparent text-sm font-mono text-[#15201B] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#0B6E4F] text-white text-sm font-bold rounded-xl cursor-pointer"
            >
              {s.trackBtn}
            </button>
          </form>

          {trackedOrder ? (
            <div className="p-4 rounded-xl border border-[#D9D6CB] bg-[#FAF9F5] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#15201B]">{trackedOrder.id}</span>
                <span className="text-xs font-semibold text-[#0B6E4F]">
                  {s.stages[trackedOrder.stage]}
                </span>
              </div>
              <div className="text-xs text-[#5A655F]">
                {trackedOrder.from.landmark || trackedOrder.from.label} →{' '}
                {trackedOrder.to.landmark || trackedOrder.to.label}
              </div>
              <div className="text-xs text-[#15201B] font-medium">
                {trackedOrder.courier.name} ({trackedOrder.courier.plate}) · PIN:{' '}
                <span className="font-mono font-bold">{trackedOrder.pinCode}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-[#D9D6CB] bg-[#FAF9F5] text-xs text-[#5A655F]">
              {orderHistory.length === 0 ? s.trackEmpty : s.trackNotFound}
            </div>
          )}

          {orderHistory.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#5A655F]">{s.trackRecent}</div>
              {orderHistory.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTrackQuery(item.id);
                    setTrackedOrder(item);
                  }}
                  className="w-full text-left p-3 rounded-xl border border-[#D9D6CB] bg-white hover:border-[#0B6E4F] flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-mono font-bold text-[#15201B]">{item.id}</div>
                    <div className="text-xs text-[#5A655F] truncate">
                      {item.from.landmark || item.from.label} → {item.to.landmark || item.to.label}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold font-mono tabular-nums text-[#0B6E4F]">
                      {item.priceTjs} {s.currency}
                    </div>
                    <div className="text-[11px] text-[#5A655F]">{s.stages[item.stage]}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="p-3.5 rounded-xl border border-[#E6E4DA] bg-white flex items-center gap-3 text-xs text-[#5A655F]">
            <Phone className="w-4 h-4 text-[#0B6E4F] shrink-0" />
            <span>{s.trackSmsNote}</span>
          </div>
        </div>
      )}
    </div>
  );
};
