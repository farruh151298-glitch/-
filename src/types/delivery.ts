export type CityId = 'dushanbe' | 'khujand' | 'bokhtar' | 'kulob';
export type TariffId = 'scooter' | 'car' | 'cargo';
export type PaymentMethodId = 'alif' | 'dc' | 'corti' | 'cash';
export type WorkspaceMode = 'client' | 'courier' | 'track';
export type LanguageCode = 'ru' | 'tj';

export type OrderStage =
  | 'idle'
  | 'searching'
  | 'to_pickup'
  | 'at_pickup'
  | 'in_transit'
  | 'delivered';

export interface MapPoint {
  x: number; // 0..1000 normalized SVG/Canvas coordinate
  y: number; // 0..640 normalized SVG/Canvas coordinate
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
  nameRu: string;
  nameTj: string;
  kmScale: number; // km per 1000 map units
  surgeMultiplier: number;
  surgeLabelRu: string;
  surgeLabelTj: string;
  riverPath: Array<[number, number]>;
  riverName: string;
  parks: Array<{ x: number; y: number; w: number; h: number; label: string }>;
  roads: CityRoad[];
  landmarks: MapPoint[];
  defaultFromIndex: number;
  defaultToIndex: number;
}

export interface TariffConfig {
  id: TariffId;
  nameRu: string;
  nameTj: string;
  subtitleRu: string;
  subtitleTj: string;
  basePriceTjs: number;
  perKmTjs: number;
  maxWeightKg: number;
  dimensionsCm: string;
  avgEtaMin: number;
  speedFactor: number; // higher = faster in city traffic
  fleetNoteRu: string;
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
  progress: number; // 0..1 along current leg
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
