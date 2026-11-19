export type CityId = 'dushanbe' | 'khujand' | 'bokhtar' | 'kulob';
export type TariffId = 'scooter' | 'car' | 'cargo';
export type PaymentMethodId = 'alif' | 'dc' | 'corti' | 'cash';
export type WorkspaceMode = 'client' | 'courier' | 'track';
export type LanguageCode = 'tj' | 'ru' | 'en' | 'uz';
export type ParcelCategoryId = 'parcel' | 'food' | 'docs' | 'cod_shop' | 'pharmacy' | 'bulk';

export type OrderStage =
  | 'idle'
  | 'searching'
  | 'to_pickup'
  | 'at_pickup'
  | 'in_transit'
  | 'delivered';

export interface MapPoint {
  x: number; // 0..1000 normalized SVG coordinate
  y: number; // 0..640 normalized SVG coordinate
  label: string;
  landmark?: string;
}

export interface CityRoad {
  points: Array<[number, number]>;
  width: number;
  name?: string;
}

export interface CityConfig {
  id: CityId;
  names: Record<LanguageCode, string>;
  kmScale: number;
  surgeMultiplier: number;
  surgeLabels: Record<LanguageCode, string>;
  riverPath: Array<[number, number]>;
  riverNames: Record<LanguageCode, string>;
  parks: Array<{ x: number; y: number; w: number; h: number; label: string }>;
  roads: CityRoad[];
  landmarks: MapPoint[];
  defaultFromIndex: number;
  defaultToIndex: number;
}

export interface TariffConfig {
  id: TariffId;
  names: Record<LanguageCode, string>;
  subtitles: Record<LanguageCode, string>;
  basePriceTjs: number;
  perKmTjs: number;
  maxWeightKg: number;
  dimensionsCm: string;
  avgEtaMin: number;
  speedFactor: number;
  fleetNotes: Record<LanguageCode, string>;
}

export interface DeliveryOptions {
  doorToDoor: boolean;
  thermalBag: boolean;
  photoProof: boolean;
  cashOnDelivery: boolean;
  codAmountTjs: string;
}

export interface CourierProfile {
  name: string;
  vehicleModel: string;
  plate: string;
  rating: string;
  completedTrips: number;
  phone: string;
  tariff: TariffId;
}

export interface ActiveOrder {
  id: string;
  cityId: CityId;
  tariff: TariffId;
  category: ParcelCategoryId;
  from: MapPoint;
  to: MapPoint;
  fromLandmarkNote: string;
  toLandmarkNote: string;
  recipientPhone: string;
  payment: PaymentMethodId;
  options: DeliveryOptions;
  distanceKm: number;
  priceTjs: number;
  etaMinutes: number;
  stage: OrderStage;
  pinCode: string;
  courier: CourierProfile;
  createdAt: string;
  progress: number;
}

export interface CourierJobOffer {
  id: string;
  tariff: TariffId;
  fromLabel: string;
  toLabel: string;
  distanceKm: number;
  payoutTjs: number;
  surge: string;
  tags: string[];
  pickupMinutes: number;
}
