import {
  CityConfig,
  CityId,
  CourierJobOffer,
  CourierProfile,
  LanguageCode,
  PaymentMethodId,
  TariffConfig,
  TariffId,
} from '../types/delivery';

export const CITIES: Record<CityId, CityConfig> = {
  dushanbe: {
    id: 'dushanbe',
    nameRu: 'Душанбе',
    nameTj: 'Душанбе',
    kmScale: 11.4,
    surgeMultiplier: 1.0,
    surgeLabelRu: 'Обычный спрос',
    surgeLabelTj: 'Талаботи муқаррарӣ',
    riverName: 'р. Душанбинка',
    riverPath: [
      [355, 0],
      [368, 120],
      [345, 250],
      [360, 390],
      [338, 520],
      [325, 640],
    ],
    parks: [
      { x: 465, y: 205, w: 92, h: 78, label: 'Парк Рудаки' },
      { x: 255, y: 235, w: 80, h: 95, label: 'Наврузгох' },
      { x: 590, y: 120, w: 72, h: 55, label: 'Боги Ирам' },
    ],
    roads: [
      { points: [[525, 20], [518, 180], [520, 360], [524, 620]], width: 10, name: 'пр. Рудаки' },
      { points: [[80, 265], [355, 260], [520, 255], [910, 252]], width: 9, name: 'пр. Сомони' },
      { points: [[120, 415], [360, 405], [520, 395], [880, 425]], width: 8, name: 'ул. Айни' },
      { points: [[200, 95], [368, 118], [520, 125], [820, 105]], width: 7, name: 'ул. Карамова' },
      { points: [[135, 130], [165, 290], [185, 520]], width: 7, name: 'ул. Б. Гафурова' },
      { points: [[690, 60], [705, 260], [720, 560]], width: 7, name: 'ул. С. Шерози' },
      { points: [[250, 545], [524, 535], [840, 550]], width: 8, name: 'ул. Н. Карабаева' },
    ],
    landmarks: [
      { x: 520, y: 255, label: 'пр. Рудаки, 82', landmark: 'ЦУМ / Главпочтамт' },
      { x: 645, y: 398, label: 'ул. Айни, 48', landmark: 'ТЦ Садбарг' },
      { x: 165, y: 265, label: '82-й мкр', landmark: 'Кольцо 82 мкр' },
      { x: 245, y: 420, label: 'ул. Каххорова, 15', landmark: 'ТЦ Сиёма Молл' },
      { x: 470, y: 585, label: 'Южный выезд', landmark: 'Рынок Корвон' },
      { x: 775, y: 385, label: 'ул. М. Мастонгулова', landmark: 'Аэропорт Душанбе' },
      { x: 300, y: 280, label: 'пр. И. Сомони, 14', landmark: 'Дворец Навруз' },
      { x: 145, y: 145, label: '102-й мкр', landmark: 'ЖК Сино' },
    ],
    defaultFromIndex: 0,
    defaultToIndex: 2,
  },
  khujand: {
    id: 'khujand',
    nameRu: 'Худжанд',
    nameTj: 'Хуҷанд',
    kmScale: 9.2,
    surgeMultiplier: 1.0,
    surgeLabelRu: 'Свободные курьеры',
    surgeLabelTj: 'Курйерҳои озод',
    riverName: 'р. Сырдарья',
    riverPath: [
      [0, 315],
      [220, 305],
      [480, 325],
      [760, 298],
      [1000, 310],
    ],
    parks: [
      { x: 420, y: 215, w: 95, h: 68, label: 'Парк Камола Худжанди' },
      { x: 565, y: 375, w: 80, h: 60, label: 'Парк Победы' },
    ],
    roads: [
      { points: [[480, 40], [485, 260], [492, 600]], width: 10, name: 'пр. И. Сомони' },
      { points: [[110, 420], [490, 415], [890, 410]], width: 9, name: 'ул. К. Худжанди' },
      { points: [[140, 170], [485, 175], [840, 165]], width: 8, name: 'ул. Сырдарьинская' },
      { points: [[250, 90], [265, 310], [285, 550]], width: 7, name: 'ул. Фирдавси' },
      { points: [[720, 100], [710, 310], [705, 540]], width: 7, name: 'ул. Гагарина' },
    ],
    landmarks: [
      { x: 492, y: 415, label: 'ул. Шарк, 4', landmark: 'Рынок Панчшанбе' },
      { x: 486, y: 255, label: 'пр. Сомони, 42', landmark: 'Универмаг Худжанд' },
      { x: 265, y: 170, label: '20-й мкр', landmark: 'Микрорайон 20' },
      { x: 710, y: 165, label: '34-й мкр', landmark: 'Микрорайон 34' },
      { x: 645, y: 412, label: 'пр. Рахмона, 88', landmark: 'ТЦ Аниса' },
      { x: 280, y: 505, label: 'ул. Гафурова, 12', landmark: 'Автовокзал' },
    ],
    defaultFromIndex: 0,
    defaultToIndex: 2,
  },
  bokhtar: {
    id: 'bokhtar',
    nameRu: 'Бохтар',
    nameTj: 'Бохтар',
    kmScale: 7.5,
    surgeMultiplier: 1.0,
    surgeLabelRu: 'Быстрая подача',
    surgeLabelTj: 'Расидани тез',
    riverName: 'канал Вахш',
    riverPath: [
      [0, 510],
      [300, 495],
      [660, 520],
      [1000, 505],
    ],
    parks: [{ x: 465, y: 265, w: 86, h: 75, label: 'Парк Вахдат' }],
    roads: [
      { points: [[460, 50], [468, 300], [472, 580]], width: 10, name: 'ул. Вахдат' },
      { points: [[140, 295], [468, 290], [860, 300]], width: 9, name: 'ул. Б. Гафурова' },
      { points: [[190, 165], [465, 170], [790, 160]], width: 7, name: 'ул. Айни' },
      { points: [[210, 415], [470, 410], [780, 420]], width: 7, name: 'ул. Н. Хусрав' },
    ],
    landmarks: [
      { x: 468, y: 295, label: 'ул. Вахдат, 10', landmark: 'Центр / Парк Вахдат' },
      { x: 325, y: 412, label: 'ул. С. Айни, 29', landmark: 'Центральный рынок Фаровон' },
      { x: 685, y: 298, label: '14-й мкр', landmark: 'Университет Н. Хусрава' },
      { x: 255, y: 168, label: 'ул. Борбад, 5', landmark: 'Областная больница' },
    ],
    defaultFromIndex: 0,
    defaultToIndex: 1,
  },
  kulob: {
    id: 'kulob',
    nameRu: 'Куляб',
    nameTj: 'Кӯлоб',
    kmScale: 7.0,
    surgeMultiplier: 1.0,
    surgeLabelRu: 'Курьеры рядом',
    surgeLabelTj: 'Курйерҳо дар наздикӣ',
    riverName: 'р. Яхсу',
    riverPath: [
      [810, 0],
      [790, 220],
      [825, 450],
      [840, 640],
    ],
    parks: [{ x: 445, y: 245, w: 92, h: 72, label: 'Парк И. Сомони' }],
    roads: [
      { points: [[485, 60], [490, 310], [495, 580]], width: 10, name: 'ул. И. Сомони' },
      { points: [[130, 310], [490, 305], [770, 315]], width: 9, name: 'ул. С. Сафарова' },
      { points: [[180, 180], [488, 175], [760, 185]], width: 7, name: 'ул. Шамсиддина Шохина' },
      { points: [[200, 445], [492, 440], [750, 448]], width: 7, name: 'ул. Хувайдуллоева' },
    ],
    landmarks: [
      { x: 490, y: 308, label: 'ул. И. Сомони, 24', landmark: 'Центр / Парк Сомони' },
      { x: 315, y: 442, label: 'ул. Хувайдуллоева', landmark: 'Рынок Саховат' },
      { x: 660, y: 182, label: 'Восточный квартал', landmark: 'Кулябский университет' },
      { x: 215, y: 180, label: 'Аэропортное шоссе', landmark: 'Аэропорт Куляб' },
    ],
    defaultFromIndex: 0,
    defaultToIndex: 1,
  },
};

export const TARIFFS: Record<TariffId, TariffConfig> = {
  scooter: {
    id: 'scooter',
    nameRu: 'Электроскутер',
    nameTj: 'Скутери барқӣ',
    subtitleRu: 'По городу без пробок',
    subtitleTj: 'Бе танбашавии роҳ',
    basePriceTjs: 10,
    perKmTjs: 2.2,
    maxWeightKg: 15,
    dimensionsCm: '45 × 40 × 40 см',
    avgEtaMin: 12,
    speedFactor: 1.25,
    fleetNoteRu: 'Идеально для документов, еды из кафе, лекарств и посылок из Instagram-магазинов.',
  },
  car: {
    id: 'car',
    nameRu: 'Авто',
    nameTj: 'Мошини сабукрав',
    subtitleRu: 'Багажник, защита от жары и дождя',
    subtitleTj: 'Бағоҷ, муҳофизат аз гармо ва борон',
    basePriceTjs: 18,
    perKmTjs: 3.5,
    maxWeightKg: 50,
    dimensionsCm: '90 × 60 × 50 см',
    avgEtaMin: 16,
    speedFactor: 1.0,
    fleetNoteRu: 'Для хрупких товаров, крупных покупок, тортов, цветов и межрайонных поездок.',
  },
  cargo: {
    id: 'cargo',
    nameRu: 'Грузовой Лабо',
    nameTj: 'Боркаш (Лабо)',
    subtitleRu: 'Техника, мебель, опт с Корвона',
    subtitleTj: 'Техника, мебел, бор аз бозор',
    basePriceTjs: 45,
    perKmTjs: 5.8,
    maxWeightKg: 500,
    dimensionsCm: '200 × 140 × 120 см',
    avgEtaMin: 24,
    speedFactor: 0.85,
    fleetNoteRu: 'Для бытовой техники, стройматериалов и оптовых партий с рынков.',
  },
};

export const PAYMENT_METHODS: Array<{
  id: PaymentMethodId;
  label: string;
  hint: string;
}> = [
  { id: 'alif', label: 'Alif Mobi', hint: 'Моментально по номеру' },
  { id: 'dc', label: 'Dushanbe City', hint: 'Кошелёк DC' },
  { id: 'corti', label: 'Корти Милли', hint: 'Любой банк РТ' },
  { id: 'cash', label: 'Наличные', hint: 'Сомони курьеру' },
];

export const COURIERS_POOL: Record<TariffId, CourierProfile[]> = {
  scooter: [
    {
      name: 'Фаррух Назаров',
      vehicleModel: 'Yadea G5 Электроскутер',
      plate: 'ЭЛ-482 TJ',
      rating: '4.97',
      completedTrips: 1420,
      phone: '+992 93 512 40 18',
      tariff: 'scooter',
    },
    {
      name: 'Бахтиёр Саидов',
      vehicleModel: 'NIU NQi Pro Скутер',
      plate: 'ЭЛ-119 TJ',
      rating: '4.94',
      completedTrips: 890,
      phone: '+992 90 441 22 05',
      tariff: 'scooter',
    },
  ],
  car: [
    {
      name: 'Далер Каримов',
      vehicleModel: 'BYD Seagull EV',
      plate: '4481 AA 01',
      rating: '4.98',
      completedTrips: 2150,
      phone: '+992 98 710 33 91',
      tariff: 'car',
    },
    {
      name: 'Сомон Рахимов',
      vehicleModel: 'Hyundai Accent',
      plate: '1029 BB 01',
      rating: '4.92',
      completedTrips: 1640,
      phone: '+992 91 884 19 40',
      tariff: 'car',
    },
  ],
  cargo: [
    {
      name: 'Азиз Шарипов',
      vehicleModel: 'Chevrolet Labo',
      plate: '7720 CC 01',
      rating: '4.95',
      completedTrips: 980,
      phone: '+992 92 775 08 11',
      tariff: 'cargo',
    },
  ],
};

export const SAMPLE_COURIER_JOBS: Record<CityId, CourierJobOffer[]> = {
  dushanbe: [
    {
      id: 'TJ-8492',
      tariff: 'scooter',
      fromLabel: 'ТЦ Сиёма Молл (кафе)',
      toLabel: 'пр. Рудаки, 82 (ЦУМ)',
      distanceKm: 4.3,
      payoutTjs: 19,
      surge: '×1.2 Час пик',
      tags: ['Термосумка', 'От двери до двери'],
      pickupMinutes: 4,
    },
    {
      id: 'TJ-8495',
      tariff: 'car',
      fromLabel: 'ул. Айни, 48 (Садбарг)',
      toLabel: '102-й мкр, ЖК Сино',
      distanceKm: 6.8,
      payoutTjs: 38,
      surge: 'Обычный',
      tags: ['Наложенный платёж 340 сом.', 'Фотоотчёт'],
      pickupMinutes: 6,
    },
    {
      id: 'TJ-8501',
      tariff: 'scooter',
      fromLabel: 'Аптека, 82-й мкр',
      toLabel: 'ул. Сомони, 14 (Наврузгох)',
      distanceKm: 2.9,
      payoutTjs: 16,
      surge: '×1.15',
      tags: ['Срочно', 'Alif Mobi оплачено'],
      pickupMinutes: 3,
    },
  ],
  khujand: [
    {
      id: 'KH-3104',
      tariff: 'scooter',
      fromLabel: 'Рынок Панчшанбе',
      toLabel: '20-й мкр, дом 12',
      distanceKm: 3.4,
      payoutTjs: 17,
      surge: '×1.2',
      tags: ['Термосумка', 'Фотоотчёт'],
      pickupMinutes: 5,
    },
    {
      id: 'KH-3109',
      tariff: 'car',
      fromLabel: 'Универмаг Худжанд',
      toLabel: '34-й мкр, ориентир школа №18',
      distanceKm: 5.1,
      payoutTjs: 32,
      surge: 'Обычный',
      tags: ['Хрупкий груз', 'Dushanbe City'],
      pickupMinutes: 7,
    },
  ],
  bokhtar: [
    {
      id: 'BK-1208',
      tariff: 'scooter',
      fromLabel: 'Рынок Фаровон',
      toLabel: 'ул. Вахдат, 10',
      distanceKm: 2.4,
      payoutTjs: 14,
      surge: 'Обычный',
      tags: ['От двери до двери'],
      pickupMinutes: 4,
    },
  ],
  kulob: [
    {
      id: 'KL-0941',
      tariff: 'scooter',
      fromLabel: 'Парк И. Сомони',
      toLabel: 'Рынок Саховат',
      distanceKm: 2.8,
      payoutTjs: 15,
      surge: 'Обычный',
      tags: ['Термосумка'],
      pickupMinutes: 5,
    },
  ],
};

export const UI_COPY: Record<
  LanguageCode,
  {
    navOrder: string;
    navTariffs: string;
    navFeatures: string;
    navBusiness: string;
    navAction: string;
    heroTitle: string;
    heroSubtitle: string;
    modeClient: string;
    modeCourier: string;
    modeTrack: string;
    fromPlaceholder: string;
    toPlaceholder: string;
    pickupLabel: string;
    dropoffLabel: string;
    landmarkPlaceholder: string;
    recipientPhoneLabel: string;
    paymentLabel: string;
    optionsLabel: string;
    optDoor: string;
    optThermal: string;
    optPhoto: string;
    optCod: string;
    dispatchCta: string;
    currency: string;
    minShort: string;
    kmShort: string;
    kgShort: string;
    mapHint: string;
  }
> = {
  ru: {
    navOrder: 'Заказать',
    navTariffs: 'Тарифы',
    navFeatures: 'Функции',
    navBusiness: 'Для бизнеса',
    navAction: 'Вызвать курьера',
    heroTitle: 'Экспресс-доставка по Таджикистану на электроскутерах и авто',
    heroSubtitle:
      'Рассчитайте маршрут в Душанбе, Худжанде, Бохтаре или Кулябе, выберите транспорт и протестируйте путь заказа от оформления до вручения по ПИН-коду.',
    modeClient: 'Клиент',
    modeCourier: 'Курьер Pro',
    modeTrack: 'Отследить',
    fromPlaceholder: 'Откуда забрать (адрес или ориентир)',
    toPlaceholder: 'Куда доставить (адрес или ориентир)',
    pickupLabel: 'Точка А · Откуда',
    dropoffLabel: 'Точка Б · Куда',
    landmarkPlaceholder: 'Ориентир, подъезд, этаж (напр. рядом с мечетью, домофон 24)',
    recipientPhoneLabel: 'Телефон получателя',
    paymentLabel: 'Способ оплаты',
    optionsLabel: 'Опции доставки',
    optDoor: 'От двери до двери (+5 сом.)',
    optThermal: 'Термосумка для еды',
    optPhoto: 'Фотоотчёт при вручении',
    optCod: 'Наложенный платёж (выкуп)',
    dispatchCta: 'Вызвать курьера',
    currency: 'сом.',
    minShort: 'мин',
    kmShort: 'км',
    kgShort: 'кг',
    mapHint: 'Нажмите на карту, чтобы поставить точку на маршруте',
  },
  tj: {
    navOrder: 'Фармоиш',
    navTariffs: 'Тарофаҳо',
    navFeatures: 'Имкониятҳо',
    navBusiness: 'Барои бизнес',
    navAction: 'Даъвати курйер',
    heroTitle: 'Расонидани фаврӣ дар Тоҷикистон бо скутери барқӣ ва мошин',
    heroSubtitle:
      'Масирро дар Душанбе, Хуҷанд, Бохтар ё Кӯлоб ҳисоб кунед, нақлиётро интихоб намоед ва раванди расониданро то супоридан бо рамзи ПИН санҷед.',
    modeClient: 'Мизоҷ',
    modeCourier: 'Курйер Pro',
    modeTrack: 'Пайгирӣ',
    fromPlaceholder: 'Аз куҷо гирифтан (суроға ё нишона)',
    toPlaceholder: 'Ба куҷо расонидан (суроға ё нишона)',
    pickupLabel: 'Нуқтаи А · Аз куҷо',
    dropoffLabel: 'Нуқтаи Б · Ба куҷо',
    landmarkPlaceholder: 'Нишона, даромадгоҳ, ошёна',
    recipientPhoneLabel: 'Рақами қабулкунанда',
    paymentLabel: 'Тарзи пардохт',
    optionsLabel: 'Интихобҳои иловагӣ',
    optDoor: 'Аз дар то дар (+5 сом.)',
    optThermal: 'Халтаи гармнигоҳдор',
    optPhoto: 'Акс-ҳисобот ҳангоми супоридан',
    optCod: 'Пардохт ҳангоми гирифтан',
    dispatchCta: 'Даъвати курйер',
    currency: 'сом.',
    minShort: 'дақ',
    kmShort: 'км',
    kgShort: 'кг',
    mapHint: 'Барои интихоби нуқта ба харита пахш кунед',
  },
};

export function computeRouteDistanceKm(
  a: { x: number; y: number },
  b: { x: number; y: number },
  kmScale: number
): number {
  // Manhattan-weighted urban distance to reflect city street grid rather than straight bird flight
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  const euclidean = Math.sqrt(dx * dx + dy * dy);
  const manhattan = dx + dy;
  const urbanUnits = euclidean * 0.65 + manhattan * 0.35;
  const km = Math.max(0.8, (urbanUnits / 1000) * kmScale);
  return Math.round(km * 10) / 10;
}

export function computeDeliveryPriceTjs(
  tariffId: TariffId,
  distanceKm: number,
  doorToDoor: boolean,
  surgeMultiplier: number
): number {
  const t = TARIFFS[tariffId];
  const raw = (t.basePriceTjs + distanceKm * t.perKmTjs) * surgeMultiplier + (doorToDoor ? 5 : 0);
  return Math.round(raw);
}

export function computeEtaMinutes(tariffId: TariffId, distanceKm: number): number {
  const t = TARIFFS[tariffId];
  const travelMins = (distanceKm / (0.48 * t.speedFactor)) + t.avgEtaMin * 0.45;
  return Math.max(8, Math.round(travelMins));
}
