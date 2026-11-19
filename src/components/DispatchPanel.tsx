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
  PaymentMethodId,
  TariffId,
  WorkspaceMode,
} from '../types/delivery';
import {
  PAYMENT_METHODS,
  SAMPLE_COURIER_JOBS,
  TARIFFS,
  UI_COPY,
  computeDeliveryPriceTjs,
  computeEtaMinutes,
} from '../data/tajikistanData';
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

const STAGE_LABELS: Record<ActiveOrder['stage'], string> = {
  idle: 'Черновик',
  searching: 'Поиск ближайшего курьера…',
  to_pickup: 'Курьер выехал к точке А',
  at_pickup: 'Курьер на месте · Фотофиксация посылки',
  in_transit: 'Посылка в пути к получателю',
  delivered: 'Доставлено по ПИН-коду',
};

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
  const copy = UI_COPY[lang];
  const [fromNote, setFromNote] = useState('Ориентир: главный вход, 1 этаж');
  const [toNote, setToNote] = useState('Домофон 24, позвонить за 5 мин');
  const [recipientPhone, setRecipientPhone] = useState('+992 93 400 12 88');
  const [phoneError, setPhoneError] = useState('');
  const [showFromMenu, setShowFromMenu] = useState(false);
  const [showToMenu, setShowToMenu] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'me' | 'courier'; text: string }>>([
    { sender: 'courier', text: 'Салом! Выехал к вам, буду на месте через пару минут.' },
  ]);

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

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = recipientPhone.replace(/[^\d+]/g, '');
    if (cleaned.length < 9) {
      setPhoneError('Введите корректный номер Таджикистана (+992...)');
      return;
    }
    setPhoneError('');
    onCreateOrder({
      fromLandmarkNote: fromNote,
      toLandmarkNote: toNote,
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
      { sender: 'courier', text: 'Хорошо, принял информацию. Уже в пути!' },
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
    <div className="bg-white rounded-2xl border border-[#DEDCD4] p-5 sm:p-6 flex flex-col gap-5 h-full">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between gap-3">
        <div
          className="inline-flex items-center p-1 bg-[#F2F1EC] rounded-xl w-full sm:w-auto"
          role="tablist"
          aria-label="Режим работы приложения"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'client'}
            onClick={() => onModeChange('client')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'client'
                ? 'bg-white text-[#141413] shadow-xs'
                : 'text-[#5C5C58] hover:text-[#141413]'
            }`}
          >
            {copy.modeClient}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'courier'}
            onClick={() => onModeChange('courier')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'courier'
                ? 'bg-white text-[#141413] shadow-xs'
                : 'text-[#5C5C58] hover:text-[#141413]'
            }`}
          >
            {copy.modeCourier}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'track'}
            onClick={() => onModeChange('track')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'track'
                ? 'bg-white text-[#141413] shadow-xs'
                : 'text-[#5C5C58] hover:text-[#141413]'
            }`}
          >
            {copy.modeTrack}
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#5C5C58] whitespace-nowrap shrink-0">
          <span>{lang === 'ru' ? city.surgeLabelRu : city.surgeLabelTj}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono font-medium text-[#141413] tabular-nums">
            ×{city.surgeMultiplier.toFixed(1)}
          </span>
        </div>
      </div>

      {/* MODE 1: CLIENT ORDER DISPATCH */}
      {mode === 'client' && (!activeOrder || activeOrder.stage === 'idle') && (
        <form onSubmit={handleDispatchSubmit} className="flex flex-col gap-5">
          {/* Route A -> B Inputs */}
          <div className="flex flex-col gap-2.5 relative">
            {/* Point A */}
            <div className="relative">
              <div className="flex items-center gap-2.5 border border-[#DEDCD4] rounded-xl px-3.5 py-2.5 bg-[#FAF9F6] focus-within:border-[#141413] focus-within:bg-white transition-colors">
                <span className="w-6 h-6 rounded-full bg-[#141413] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  А
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-[#5C5C58]">{copy.pickupLabel}</div>
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
                    placeholder={copy.fromPlaceholder}
                    className="w-full bg-transparent text-sm font-semibold text-[#141413] placeholder:text-[#8E8D87] focus:outline-none truncate"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowFromMenu((v) => !v)}
                  aria-label="Выбрать ориентир отправления"
                  className="p-1.5 text-[#5C5C58] hover:text-[#141413] cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {showFromMenu && (
                <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-white border border-[#DEDCD4] rounded-xl shadow-lg max-h-52 overflow-y-auto py-1">
                  {city.landmarks.map((lm) => (
                    <button
                      key={`from-${lm.label}`}
                      type="button"
                      onClick={() => {
                        onFromChange(lm);
                        setShowFromMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F7F7F5] flex items-center justify-between gap-2 text-sm cursor-pointer"
                    >
                      <span className="font-medium text-[#141413] truncate">{lm.landmark || lm.label}</span>
                      <span className="text-xs text-[#5C5C58] shrink-0">{lm.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-end -my-3.5 pr-10 relative z-20">
              <button
                type="button"
                onClick={onSwapPoints}
                title="Поменять точки А и Б местами"
                className="w-8 h-8 rounded-full bg-white border border-[#DEDCD4] flex items-center justify-center text-[#141413] hover:bg-[#F7F7F5] transition-colors shadow-xs cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Point B */}
            <div className="relative">
              <div className="flex items-center gap-2.5 border border-[#DEDCD4] rounded-xl px-3.5 py-2.5 bg-[#FAF9F6] focus-within:border-[#141413] focus-within:bg-white transition-colors">
                <span className="w-6 h-6 rounded-full bg-[#FFCC00] text-[#141413] border border-[#141413] text-xs font-bold flex items-center justify-center shrink-0">
                  Б
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-[#5C5C58]">{copy.dropoffLabel}</div>
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
                    placeholder={copy.toPlaceholder}
                    className="w-full bg-transparent text-sm font-semibold text-[#141413] placeholder:text-[#8E8D87] focus:outline-none truncate"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowToMenu((v) => !v)}
                  aria-label="Выбрать ориентир получения"
                  className="p-1.5 text-[#5C5C58] hover:text-[#141413] cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {showToMenu && (
                <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-white border border-[#DEDCD4] rounded-xl shadow-lg max-h-52 overflow-y-auto py-1">
                  {city.landmarks.map((lm) => (
                    <button
                      key={`to-${lm.label}`}
                      type="button"
                      onClick={() => {
                        onToChange(lm);
                        setShowToMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#F7F7F5] flex items-center justify-between gap-2 text-sm cursor-pointer"
                    >
                      <span className="font-medium text-[#141413] truncate">{lm.landmark || lm.label}</span>
                      <span className="text-xs text-[#5C5C58] shrink-0">{lm.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Landmark Note (crucial in Tajikistan) */}
            <input
              type="text"
              value={toNote}
              onChange={(e) => setToNote(e.target.value)}
              placeholder={copy.landmarkPlaceholder}
              className="w-full border border-[#DEDCD4] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#141413] placeholder:text-[#8E8D87] bg-white focus:border-[#141413] focus:outline-none"
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
                      ? 'border-[#141413] bg-[#FFFBEB]'
                      : 'border-[#DEDCD4] bg-white hover:border-[#A8A69E]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <VehicleArtwork type={tId} className="w-14 h-9" />
                    <span className="text-xs font-mono font-semibold text-[#141413] tabular-nums">
                      ~{eta} {copy.minShort}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#141413]">
                      {lang === 'ru' ? t.nameRu : t.nameTj}
                    </div>
                    <div className="text-[11px] text-[#5C5C58] mt-0.5">
                      до {t.maxWeightKg} {copy.kgShort} · {t.dimensionsCm}
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#ECEAE3] flex items-baseline justify-between">
                    <span className="text-base font-extrabold text-[#141413] tabular-nums">
                      {price} {copy.currency}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#141413]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Delivery Options */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-[#5C5C58]">{copy.optionsLabel}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="flex items-center gap-2.5 px-3 py-2 border border-[#DEDCD4] rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-[#FAF9F6]">
                <input
                  type="checkbox"
                  checked={options.doorToDoor}
                  onChange={(e) =>
                    onOptionsChange({ ...options, doorToDoor: e.target.checked })
                  }
                  className="accent-[#141413] w-4 h-4 rounded"
                />
                <Package className="w-3.5 h-3.5 text-[#5C5C58] shrink-0" />
                <span className="text-[#141413] truncate">{copy.optDoor}</span>
              </label>

              <label className="flex items-center gap-2.5 px-3 py-2 border border-[#DEDCD4] rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-[#FAF9F6]">
                <input
                  type="checkbox"
                  checked={options.thermalBag}
                  onChange={(e) =>
                    onOptionsChange({ ...options, thermalBag: e.target.checked })
                  }
                  className="accent-[#141413] w-4 h-4 rounded"
                />
                <Thermometer className="w-3.5 h-3.5 text-[#5C5C58] shrink-0" />
                <span className="text-[#141413] truncate">{copy.optThermal}</span>
              </label>

              <label className="flex items-center gap-2.5 px-3 py-2 border border-[#DEDCD4] rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-[#FAF9F6]">
                <input
                  type="checkbox"
                  checked={options.photoProof}
                  onChange={(e) =>
                    onOptionsChange({ ...options, photoProof: e.target.checked })
                  }
                  className="accent-[#141413] w-4 h-4 rounded"
                />
                <Camera className="w-3.5 h-3.5 text-[#5C5C58] shrink-0" />
                <span className="text-[#141413] truncate">{copy.optPhoto}</span>
              </label>

              <label className="flex items-center gap-2.5 px-3 py-2 border border-[#DEDCD4] rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-[#FAF9F6]">
                <input
                  type="checkbox"
                  checked={options.cashOnDelivery}
                  onChange={(e) =>
                    onOptionsChange({ ...options, cashOnDelivery: e.target.checked })
                  }
                  className="accent-[#141413] w-4 h-4 rounded"
                />
                <Wallet className="w-3.5 h-3.5 text-[#5C5C58] shrink-0" />
                <span className="text-[#141413] truncate">{copy.optCod}</span>
              </label>
            </div>

            {options.cashOnDelivery && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[#5C5C58] whitespace-nowrap">
                  Сумма выкупа у получателя:
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
                  className="w-28 border border-[#DEDCD4] rounded-lg px-2.5 py-1 text-sm font-mono tabular-nums focus:border-[#141413] focus:outline-none"
                />
                <span className="text-xs font-medium text-[#141413]">{copy.currency}</span>
              </div>
            )}
          </div>

          {/* Payment + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#5C5C58] mb-1.5">
                {copy.paymentLabel}
              </label>
              <select
                value={payment}
                onChange={(e) => onPaymentChange(e.target.value as PaymentMethodId)}
                className="w-full border border-[#DEDCD4] rounded-xl px-3 py-2.5 text-sm font-semibold text-[#141413] bg-white focus:border-[#141413] focus:outline-none cursor-pointer"
              >
                {PAYMENT_METHODS.map((pm) => (
                  <option key={pm.id} value={pm.id}>
                    {pm.label} — {pm.hint}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C5C58] mb-1.5">
                {copy.recipientPhoneLabel}
              </label>
              <input
                type="tel"
                value={recipientPhone}
                onChange={(e) => {
                  setRecipientPhone(e.target.value);
                  setPhoneError('');
                }}
                placeholder="+992 90 123 45 67"
                className="w-full border border-[#DEDCD4] rounded-xl px-3 py-2.5 text-sm font-mono tabular-nums text-[#141413] bg-white focus:border-[#141413] focus:outline-none"
              />
              {phoneError && <p className="text-xs text-[#C62828] mt-1">{phoneError}</p>}
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 px-5 bg-[#FFCC00] hover:bg-[#F5C400] text-[#141413] font-bold text-sm sm:text-base rounded-xl transition-colors flex items-center justify-between gap-3 cursor-pointer"
          >
            <span>{copy.dispatchCta}</span>
            <span className="font-mono tabular-nums">
              {calculatedPrice} {copy.currency}
            </span>
          </button>
        </form>
      )}

      {/* MODE 1B: LIVE ACTIVE ORDER VIEW */}
      {mode === 'client' && activeOrder && activeOrder.stage !== 'idle' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#ECEAE3] pb-3">
            <div>
              <div className="text-xs text-[#5C5C58]">
                Заказ <span className="font-mono font-semibold text-[#141413]">{activeOrder.id}</span> ·{' '}
                {CITIES_NAME_FALLBACK(city.nameRu)}
              </div>
              <h3 className="text-lg font-bold text-[#141413] mt-0.5">
                {STAGE_LABELS[activeOrder.stage]}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-base font-extrabold font-mono tabular-nums text-[#141413]">
                {activeOrder.priceTjs} {copy.currency}
              </div>
              <div className="text-xs text-[#5C5C58] tabular-nums">{activeOrder.distanceKm} км</div>
            </div>
          </div>

          {/* 4-Step Progress Bar */}
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
                        ? 'bg-[#141413]'
                        : active
                          ? 'bg-[#FFCC00]'
                          : 'bg-[#ECEAE3]'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Assigned Courier */}
          {activeOrder.stage !== 'searching' && (
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#DEDCD4] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <VehicleArtwork type={activeOrder.tariff} className="w-14 h-9 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#141413] truncate">
                    {activeOrder.courier.name} · ★ {activeOrder.courier.rating}
                  </div>
                  <div className="text-xs text-[#5C5C58] truncate">
                    {activeOrder.courier.vehicleModel} ·{' '}
                    <span className="font-mono font-semibold text-[#141413]">
                      {activeOrder.courier.plate}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen((v) => !v)}
                className="px-3 py-2 rounded-lg border border-[#DEDCD4] bg-white hover:bg-[#F2F1EC] text-xs font-semibold text-[#141413] flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Чат</span>
              </button>
            </div>
          )}

          {/* Security PIN & Photo Proof */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-[#DEDCD4] bg-white">
              <div className="flex items-center gap-1.5 text-xs text-[#5C5C58]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#141413]" />
                <span>ПИН-код вручения</span>
              </div>
              <div className="text-xl font-extrabold font-mono tracking-widest text-[#141413] mt-1 tabular-nums">
                {activeOrder.pinCode}
              </div>
              <div className="text-[11px] text-[#5C5C58] mt-0.5">
                Получатель называет курьеру
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#DEDCD4] bg-white">
              <div className="flex items-center gap-1.5 text-xs text-[#5C5C58]">
                <Camera className="w-3.5 h-3.5 text-[#141413]" />
                <span>Фотоотчёт</span>
              </div>
              <div className="text-sm font-bold text-[#141413] mt-1">
                {activeOrder.stage === 'in_transit' || activeOrder.stage === 'delivered'
                  ? 'Фото посылки загружено'
                  : 'Ожидает забора в точке А'}
              </div>
              <div className="text-[11px] text-[#5C5C58] mt-0.5">
                {activeOrder.options.thermalBag ? 'Термосумка активна' : 'Стандартная упаковка'}
              </div>
            </div>
          </div>

          {/* Route Recap */}
          <div className="text-xs text-[#5C5C58] space-y-1.5 border-t border-[#ECEAE3] pt-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#141413] shrink-0" />
              <span className="font-semibold text-[#141413]">А:</span>
              <span className="truncate">{activeOrder.from.landmark || activeOrder.from.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#141413] shrink-0" />
              <span className="font-semibold text-[#141413]">Б:</span>
              <span className="truncate">
                {activeOrder.to.landmark || activeOrder.to.label} ({activeOrder.toLandmarkNote})
              </span>
            </div>
          </div>

          {/* Inline Chat Drawer */}
          {chatOpen && (
            <div className="border border-[#DEDCD4] rounded-xl p-3 bg-[#FAF9F6] flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#141413]">
                <span>Чат с курьером ({activeOrder.courier.phone})</span>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="text-[#5C5C58] hover:text-[#141413] cursor-pointer"
                >
                  Закрыть
                </button>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 text-xs">
                {chatLog.map((m, i) => (
                  <div
                    key={i}
                    className={`px-2.5 py-1.5 rounded-lg max-w-[85%] ${
                      m.sender === 'me'
                        ? 'ml-auto bg-[#141413] text-white'
                        : 'bg-white border border-[#DEDCD4] text-[#141413]'
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
                  placeholder="Написать ориентир курьеру..."
                  className="flex-1 border border-[#DEDCD4] rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:border-[#141413]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#FFCC00] text-[#141413] text-xs font-bold cursor-pointer"
                >
                  Отправить
                </button>
              </form>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2.5 pt-1">
            {activeOrder.stage !== 'delivered' ? (
              <button
                type="button"
                onClick={onCancelOrder}
                className="w-full py-2.5 px-4 border border-[#DEDCD4] rounded-xl text-sm font-semibold text-[#141413] hover:bg-[#F7F7F5] transition-colors cursor-pointer"
              >
                Отменить заказ
              </button>
            ) : (
              <button
                type="button"
                onClick={onResetOrder}
                className="w-full py-3 px-4 bg-[#141413] text-white rounded-xl text-sm font-bold hover:bg-[#2B2B28] transition-colors cursor-pointer"
              >
                Оформить новую доставку
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: COURIER PRO WORKSPACE */}
      {mode === 'courier' && (
        <div className="flex flex-col gap-4">
          {/* Shift Header */}
          <div className="p-4 rounded-xl bg-[#141413] text-white flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs text-[#B5B3AB]">Заработок за смену · {city.nameRu}</div>
              <div className="text-2xl font-extrabold font-mono tabular-nums mt-0.5">
                {earningsTjs} сом.
              </div>
              <div className="text-xs text-[#B5B3AB] mt-0.5 tabular-nums">
                Выполнено заказов: {completedShifts} · Вывод на Alif Mobi без комиссии
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCourierOnline((v) => !v)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                courierOnline
                  ? 'bg-[#FFCC00] text-[#141413]'
                  : 'bg-[#2B2B28] text-white border border-[#454540]'
              }`}
            >
              {courierOnline ? 'На линии (принимаю заказы)' : 'Выйти на линию'}
            </button>
          </div>

          {/* Courier Vehicle Switch */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[#5C5C58]">Ваш транспорт:</span>
            <div className="inline-flex p-1 bg-[#F2F1EC] rounded-lg">
              <button
                type="button"
                onClick={() => setCourierVehicle('scooter')}
                className={`px-3 py-1 text-xs font-semibold rounded-md cursor-pointer ${
                  courierVehicle === 'scooter' ? 'bg-white text-[#141413]' : 'text-[#5C5C58]'
                }`}
              >
                Электроскутер
              </button>
              <button
                type="button"
                onClick={() => setCourierVehicle('car')}
                className={`px-3 py-1 text-xs font-semibold rounded-md cursor-pointer ${
                  courierVehicle === 'car' ? 'bg-white text-[#141413]' : 'text-[#5C5C58]'
                }`}
              >
                Автомобиль
              </button>
            </div>
          </div>

          {/* Active Courier Job or Incoming Feed */}
          {!courierOnline ? (
            <div className="p-6 rounded-xl border border-[#DEDCD4] bg-[#FAF9F6] text-center">
              <p className="text-sm font-semibold text-[#141413]">Вы офлайн</p>
              <p className="text-xs text-[#5C5C58] mt-1">
                Нажмите «Выйти на линию», чтобы видеть заказы рядом в {city.nameRu}.
              </p>
            </div>
          ) : acceptedJob ? (
            <div className="p-4 rounded-xl border border-[#141413] bg-[#FFFBEB] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#141413]">
                  Заказ {acceptedJob.job.id} · +{acceptedJob.job.payoutTjs} сом.
                </span>
                <span className="text-xs font-semibold text-[#141413]">
                  {acceptedJob.step === 'to_a' && 'Еду к точке А'}
                  {acceptedJob.step === 'at_a' && 'Забираю посылку'}
                  {acceptedJob.step === 'to_b' && 'Везу получателю'}
                  {acceptedJob.step === 'done' && 'Заказ завершён'}
                </span>
              </div>

              <div className="text-xs text-[#141413] space-y-1">
                <div>
                  <span className="font-bold">Забрать:</span> {acceptedJob.job.fromLabel}
                </div>
                <div>
                  <span className="font-bold">Доставить:</span> {acceptedJob.job.toLabel}
                </div>
              </div>

              {acceptedJob.step === 'to_a' && (
                <button
                  type="button"
                  onClick={() => setAcceptedJob({ ...acceptedJob, step: 'at_a' })}
                  className="w-full py-2.5 bg-[#141413] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Приехал в точку А
                </button>
              )}
              {acceptedJob.step === 'at_a' && (
                <button
                  type="button"
                  onClick={() => setAcceptedJob({ ...acceptedJob, step: 'to_b' })}
                  className="w-full py-2.5 bg-[#141413] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Сделать фото посылки и забрать
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
                  className="w-full py-2.5 bg-[#FFCC00] text-[#141413] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Проверить ПИН и выдать заказ (+{acceptedJob.job.payoutTjs} сом.)
                </button>
              )}
              {acceptedJob.step === 'done' && (
                <button
                  type="button"
                  onClick={() => setAcceptedJob(null)}
                  className="w-full py-2.5 bg-white border border-[#141413] text-[#141413] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Вернуться к списку заказов
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <div className="text-xs font-semibold text-[#5C5C58]">
                Доступные заказы рядом ({jobsForCity.length})
              </div>
              {jobsForCity.map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-xl border border-[#DEDCD4] bg-white hover:border-[#141413] transition-colors flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs text-[#5C5C58]">
                        {job.id} · {job.distanceKm} км · подача {job.pickupMinutes} мин · {job.surge}
                      </div>
                      <div className="text-sm font-bold text-[#141413] mt-0.5">
                        {job.fromLabel} → {job.toLabel}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-extrabold font-mono tabular-nums text-[#141413]">
                        +{job.payoutTjs} сом.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#ECEAE3]">
                    <span className="text-[11px] text-[#5C5C58] truncate">
                      {job.tags.join(' · ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAcceptedJob({ job, step: 'to_a' })}
                      className="px-3.5 py-1.5 bg-[#FFCC00] hover:bg-[#F5C400] text-[#141413] text-xs font-bold rounded-lg shrink-0 cursor-pointer"
                    >
                      Принять
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
            <div className="flex-1 flex items-center gap-2 border border-[#DEDCD4] rounded-xl px-3.5 py-2.5 bg-[#FAF9F6] focus-within:bg-white focus-within:border-[#141413]">
              <Search className="w-4 h-4 text-[#5C5C58]" />
              <input
                type="text"
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="Номер заказа (например TJ-4810)"
                className="w-full bg-transparent text-sm font-mono text-[#141413] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#141413] text-white text-sm font-bold rounded-xl cursor-pointer"
            >
              Найти
            </button>
          </form>

          {trackedOrder ? (
            <div className="p-4 rounded-xl border border-[#DEDCD4] bg-[#FAF9F6] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#141413]">{trackedOrder.id}</span>
                <span className="text-xs font-semibold text-[#141413]">
                  {STAGE_LABELS[trackedOrder.stage]}
                </span>
              </div>
              <div className="text-xs text-[#5C5C58]">
                {trackedOrder.from.landmark || trackedOrder.from.label} →{' '}
                {trackedOrder.to.landmark || trackedOrder.to.label}
              </div>
              <div className="text-xs text-[#141413] font-medium">
                Курьер: {trackedOrder.courier.name} ({trackedOrder.courier.plate}) · ПИН:{' '}
                <span className="font-mono font-bold">{trackedOrder.pinCode}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-[#DEDCD4] bg-[#FAF9F6] text-xs text-[#5C5C58]">
              {orderHistory.length === 0
                ? 'У вас пока нет оформленных заказов в этой сессии. Оформите тестовую доставку во вкладке «Клиент», чтобы отследить её здесь по номеру.'
                : 'Заказ с таким номером не найден. Выберите один из ваших недавних заказов ниже.'}
            </div>
          )}

          {orderHistory.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#5C5C58]">Недавние заказы</div>
              {orderHistory.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTrackQuery(item.id);
                    setTrackedOrder(item);
                  }}
                  className="w-full text-left p-3 rounded-xl border border-[#DEDCD4] bg-white hover:border-[#141413] flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-mono font-bold text-[#141413]">{item.id}</div>
                    <div className="text-xs text-[#5C5C58] truncate">
                      {item.from.landmark || item.from.label} → {item.to.landmark || item.to.label}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold font-mono tabular-nums text-[#141413]">
                      {item.priceTjs} сом.
                    </div>
                    <div className="text-[11px] text-[#5C5C58]">{STAGE_LABELS[item.stage]}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="p-3.5 rounded-xl border border-[#ECEAE3] bg-white flex items-center gap-3 text-xs text-[#5C5C58]">
            <Phone className="w-4 h-4 text-[#141413] shrink-0" />
            <span>
              В реальном приложении ссылка на live-трекер автоматически отправляется получателю в SMS, Telegram или WhatsApp.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

function CITIES_NAME_FALLBACK(name: string): string {
  return name || 'Душанбе';
}
