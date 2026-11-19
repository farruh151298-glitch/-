import {
  CityConfig,
  CityId,
  CourierJobOffer,
  CourierProfile,
  LanguageCode,
  ParcelCategoryId,
  PaymentMethodId,
  TariffConfig,
  TariffId,
} from '../types/delivery';

export const CITIES: Record<CityId, CityConfig> = {
  dushanbe: {
    id: 'dushanbe',
    names: {
      tj: 'Душанбе',
      ru: 'Душанбе',
      en: 'Dushanbe',
      uz: 'Dushanbe',
    },
    kmScale: 11.4,
    surgeMultiplier: 1.0,
    surgeLabels: {
      tj: 'Талаботи муқаррарӣ',
      ru: 'Обычный спрос',
      en: 'Normal demand',
      uz: 'Oddiy talab',
    },
    riverNames: {
      tj: 'Дарёи Душанбинка',
      ru: 'р. Душанбинка',
      en: 'Dushanbinka River',
      uz: 'Dushanbinka daryosi',
    },
    riverPath: [
      [355, 0],
      [368, 120],
      [345, 250],
      [360, 390],
      [338, 520],
      [325, 640],
    ],
    parks: [
      { x: 465, y: 205, w: 92, h: 78, label: 'Боғи Рӯдакӣ' },
      { x: 255, y: 235, w: 80, h: 95, label: 'Наврӯзгоҳ' },
      { x: 590, y: 120, w: 72, h: 55, label: 'Боғи Ирам' },
    ],
    roads: [
      { points: [[525, 20], [518, 180], [520, 360], [524, 620]], width: 10, name: 'хиёб. Рӯдакӣ' },
      { points: [[80, 265], [355, 260], [520, 255], [910, 252]], width: 9, name: 'хиёб. И. Сомонӣ' },
      { points: [[120, 415], [360, 405], [520, 395], [880, 425]], width: 8, name: 'кӯч. С. Айнӣ' },
      { points: [[200, 95], [368, 118], [520, 125], [820, 105]], width: 7, name: 'кӯч. Карамов' },
      { points: [[135, 130], [165, 290], [185, 520]], width: 7, name: 'кӯч. Б. Ғафуров' },
      { points: [[690, 60], [705, 260], [720, 560]], width: 7, name: 'кӯч. С. Шерозӣ' },
      { points: [[250, 545], [524, 535], [840, 550]], width: 8, name: 'кӯч. Н. Қарабоев' },
    ],
    landmarks: [
      { x: 520, y: 255, label: 'хиёб. Рӯдакӣ, 82', landmark: 'ЦУМ / Почтаи марказӣ' },
      { x: 645, y: 398, label: 'кӯч. Айнӣ, 48', landmark: 'МТ Садбарг' },
      { x: 165, y: 265, label: 'маҳаллаи 82', landmark: 'Гардиши 82 мкр' },
      { x: 245, y: 420, label: 'кӯч. Қаҳҳоров, 15', landmark: 'Сиёма Молл' },
      { x: 470, y: 585, label: 'Бозори Корвон', landmark: 'Корвон (Дарвозаи 1)' },
      { x: 775, y: 385, label: 'кӯч. М. Мастонгулов', landmark: 'Фурудгоҳи Душанбе' },
      { x: 300, y: 280, label: 'хиёб. И. Сомонӣ, 14', landmark: 'Кохи Наврӯз' },
      { x: 145, y: 145, label: 'маҳаллаи 102', landmark: 'Маҷмааи Сино' },
    ],
    defaultFromIndex: 0,
    defaultToIndex: 2,
  },
  khujand: {
    id: 'khujand',
    names: {
      tj: 'Хуҷанд',
      ru: 'Худжанд',
      en: 'Khujand',
      uz: 'Xoʻjand',
    },
    kmScale: 9.2,
    surgeMultiplier: 1.0,
    surgeLabels: {
      tj: 'Курйерҳои озод',
      ru: 'Свободные курьеры',
      en: 'Couriers nearby',
      uz: 'Boʻsh kuryerlar',
    },
    riverNames: {
      tj: 'Дарёи Сир',
      ru: 'р. Сырдарья',
      en: 'Syr Darya River',
      uz: 'Sirdaryo',
    },
    riverPath: [
      [0, 315],
      [220, 305],
      [480, 325],
      [760, 298],
      [1000, 310],
    ],
    parks: [
      { x: 420, y: 215, w: 95, h: 68, label: 'Боғи Камоли Хуҷандӣ' },
      { x: 565, y: 375, w: 80, h: 60, label: 'Боғи Ғалаба' },
    ],
    roads: [
      { points: [[480, 40], [485, 260], [492, 600]], width: 10, name: 'хиёб. И. Сомонӣ' },
      { points: [[110, 420], [490, 415], [890, 410]], width: 9, name: 'кӯч. К. Хуҷандӣ' },
      { points: [[140, 170], [485, 175], [840, 165]], width: 8, name: 'кӯч. Сирдарё' },
      { points: [[250, 90], [265, 310], [285, 550]], width: 7, name: 'кӯч. Фирдавсӣ' },
      { points: [[720, 100], [710, 310], [705, 540]], width: 7, name: 'кӯч. Гагарин' },
    ],
    landmarks: [
      { x: 492, y: 415, label: 'кӯч. Шарқ, 4', landmark: 'Бозори Панҷшанбе' },
      { x: 486, y: 255, label: 'хиёб. Сомонӣ, 42', landmark: 'Универмаги Хуҷанд' },
      { x: 265, y: 170, label: 'маҳаллаи 20', landmark: 'Микрорайони 20' },
      { x: 710, y: 165, label: 'маҳаллаи 34', landmark: 'Микрорайони 34' },
      { x: 645, y: 412, label: 'хиёб. Раҳмон, 88', landmark: 'МТ Аниса' },
      { x: 280, y: 505, label: 'кӯч. Ғафуров, 12', landmark: 'Автовокзал' },
    ],
    defaultFromIndex: 0,
    defaultToIndex: 2,
  },
  bokhtar: {
    id: 'bokhtar',
    names: {
      tj: 'Бохтар',
      ru: 'Бохтар',
      en: 'Bokhtar',
      uz: 'Boxtar',
    },
    kmScale: 7.5,
    surgeMultiplier: 1.0,
    surgeLabels: {
      tj: 'Расидани тез',
      ru: 'Быстрая подача',
      en: 'Fast pickup',
      uz: 'Tez yetib kelish',
    },
    riverNames: {
      tj: 'Наҳри Вахш',
      ru: 'канал Вахш',
      en: 'Vakhsh Canal',
      uz: 'Vaxsh kanali',
    },
    riverPath: [
      [0, 510],
      [300, 495],
      [660, 520],
      [1000, 505],
    ],
    parks: [{ x: 465, y: 265, w: 86, h: 75, label: 'Боғи Ваҳдат' }],
    roads: [
      { points: [[460, 50], [468, 300], [472, 580]], width: 10, name: 'кӯч. Ваҳдат' },
      { points: [[140, 295], [468, 290], [860, 300]], width: 9, name: 'кӯч. Б. Ғафуров' },
      { points: [[190, 165], [465, 170], [790, 160]], width: 7, name: 'кӯч. Айнӣ' },
      { points: [[210, 415], [470, 410], [780, 420]], width: 7, name: 'кӯч. Н. Хусрав' },
    ],
    landmarks: [
      { x: 468, y: 295, label: 'кӯч. Ваҳдат, 10', landmark: 'Марказ / Боғи Ваҳдат' },
      { x: 325, y: 412, label: 'кӯч. С. Айнӣ, 29', landmark: 'Бозори Фаровон' },
      { x: 685, y: 298, label: 'маҳаллаи 14', landmark: 'Донишгоҳи Н. Хусрав' },
      { x: 255, y: 168, label: 'кӯч. Борбад, 5', landmark: 'Беморхонаи вилоятӣ' },
    ],
    defaultFromIndex: 0,
    defaultToIndex: 1,
  },
  kulob: {
    id: 'kulob',
    names: {
      tj: 'Кӯлоб',
      ru: 'Куляб',
      en: 'Kulob',
      uz: 'Koʻlob',
    },
    kmScale: 7.0,
    surgeMultiplier: 1.0,
    surgeLabels: {
      tj: 'Курйерҳо дар наздикӣ',
      ru: 'Курьеры рядом',
      en: 'Couriers nearby',
      uz: 'Kuryerlar yaqinda',
    },
    riverNames: {
      tj: 'Дарёи Яхсу',
      ru: 'р. Яхсу',
      en: 'Yakhsu River',
      uz: 'Yaxsu daryosi',
    },
    riverPath: [
      [810, 0],
      [790, 220],
      [825, 450],
      [840, 640],
    ],
    parks: [{ x: 445, y: 245, w: 92, h: 72, label: 'Боғи И. Сомонӣ' }],
    roads: [
      { points: [[485, 60], [490, 310], [495, 580]], width: 10, name: 'кӯч. И. Сомонӣ' },
      { points: [[130, 310], [490, 305], [770, 315]], width: 9, name: 'кӯч. С. Сафаров' },
      { points: [[180, 180], [488, 175], [760, 185]], width: 7, name: 'кӯч. Ш. Шоҳин' },
      { points: [[200, 445], [492, 440], [750, 448]], width: 7, name: 'кӯч. Хувайдуллоев' },
    ],
    landmarks: [
      { x: 490, y: 308, label: 'кӯч. И. Сомонӣ, 24', landmark: 'Марказ / Боғи Сомонӣ' },
      { x: 315, y: 442, label: 'кӯч. Хувайдуллоев', landmark: 'Бозори Саховат' },
      { x: 660, y: 182, label: 'Маҳаллаи Шарқӣ', landmark: 'Донишгоҳи Кӯлоб' },
      { x: 215, y: 180, label: 'Шоҳроҳи фурудгоҳ', landmark: 'Фурудгоҳи Кӯлоб' },
    ],
    defaultFromIndex: 0,
    defaultToIndex: 1,
  },
};

export const TARIFFS: Record<TariffId, TariffConfig> = {
  scooter: {
    id: 'scooter',
    names: {
      tj: 'Скутери барқӣ',
      ru: 'Электроскутер',
      en: 'Electric Scooter',
      uz: 'Elektr skuter',
    },
    subtitles: {
      tj: 'Бе танбашавии роҳ дар марказ',
      ru: 'По городу без пробок',
      en: 'Fast city bypass',
      uz: 'Tirbandliksiz shahar ichida',
    },
    basePriceTjs: 10,
    perKmTjs: 2.2,
    maxWeightKg: 15,
    dimensionsCm: '45 × 40 × 40 см',
    avgEtaMin: 12,
    speedFactor: 1.25,
    fleetNotes: {
      tj: 'Беҳтарин барои ҳуҷҷатҳо, ошу самбӯса, дору ва хариди мағозаҳои Instagram.',
      ru: 'Идеально для документов, оша и самбусы, лекарств и заказов из Instagram-магазинов.',
      en: 'Ideal for documents, hot food, pharmacy items, and social commerce parcels.',
      uz: 'Hujjatlar, osh va somsa, dorilar hamda Instagram doʻkon buyurtmalari uchun qulay.',
    },
  },
  car: {
    id: 'car',
    names: {
      tj: 'Мошин',
      ru: 'Авто',
      en: 'Sedan Car',
      uz: 'Avtomobil',
    },
    subtitles: {
      tj: 'Бағоҷ, муҳофизат аз гармо (+45°C)',
      ru: 'Багажник, защита от жары (+45°C)',
      en: 'Trunk & AC protection',
      uz: 'Yukxona va issiqdan himoya',
    },
    basePriceTjs: 18,
    perKmTjs: 3.5,
    maxWeightKg: 50,
    dimensionsCm: '90 × 60 × 50 см',
    avgEtaMin: 16,
    speedFactor: 1.0,
    fleetNotes: {
      tj: 'Барои борҳои шикананда, гул, торт, хариди калон ва маҳаллаҳои дур.',
      ru: 'Для хрупких товаров, тортов, цветов, техники и поездок в отдалённые махалли.',
      en: 'Best for fragile gifts, cakes, flowers, electronics, and cross-district trips.',
      uz: 'Nozik buyumlar, tort, gullar, texnika va uzoq mahallalar uchun.',
    },
  },
  cargo: {
    id: 'cargo',
    names: {
      tj: 'Боркаш (Лабо)',
      ru: 'Грузовой Лабо',
      en: 'Labo Mini-Truck',
      uz: 'Labo yuk mashinasi',
    },
    subtitles: {
      tj: 'Техника, мебел, бор аз Корвон',
      ru: 'Техника, мебель, опт с Корвона',
      en: 'Appliances, furniture & wholesale',
      uz: 'Texnika, mebel va bozordan yuk',
    },
    basePriceTjs: 45,
    perKmTjs: 5.8,
    maxWeightKg: 500,
    dimensionsCm: '200 × 140 × 120 см',
    avgEtaMin: 24,
    speedFactor: 0.85,
    fleetNotes: {
      tj: 'Барои техникаи маишӣ, мебел, масолеҳи сохтмонӣ ва бори яклухт аз бозорҳо.',
      ru: 'Для бытовой техники, мебели, стройматериалов и оптовых партий с рынков.',
      en: 'Designed for home appliances, furniture, and market wholesale shipments.',
      uz: 'Maishiy texnika, mebel, qurilish mollari va bozordan ulgurji yuklar uchun.',
    },
  },
};

export const PARCEL_CATEGORY_PRESETS: Record<
  ParcelCategoryId,
  { recommendedTariff: TariffId; thermalBag: boolean; cod: boolean }
> = {
  parcel: { recommendedTariff: 'scooter', thermalBag: false, cod: false },
  food: { recommendedTariff: 'scooter', thermalBag: true, cod: false },
  docs: { recommendedTariff: 'scooter', thermalBag: false, cod: false },
  cod_shop: { recommendedTariff: 'scooter', thermalBag: false, cod: true },
  pharmacy: { recommendedTariff: 'scooter', thermalBag: false, cod: false },
  bulk: { recommendedTariff: 'cargo', thermalBag: false, cod: false },
};

export const PAYMENT_METHODS: Array<{
  id: PaymentMethodId;
  label: string;
  hints: Record<LanguageCode, string>;
}> = [
  {
    id: 'alif',
    label: 'Alif Mobi',
    hints: {
      tj: 'Фавран бо рақам',
      ru: 'Моментально по номеру',
      en: 'Instant wallet pay',
      uz: 'Raqam orqali tez toʻlov',
    },
  },
  {
    id: 'dc',
    label: 'Dushanbe City',
    hints: {
      tj: 'Ҳамёни DC',
      ru: 'Кошелёк DC',
      en: 'DC mobile wallet',
      uz: 'DC hamyoni',
    },
  },
  {
    id: 'corti',
    label: 'Корти Миллӣ',
    hints: {
      tj: 'Ҳамаи бонкҳои ҶТ',
      ru: 'Любой банк РТ',
      en: 'Any Tajik bank card',
      uz: 'Tojikiston bank kartalari',
    },
  },
  {
    id: 'cash',
    label: 'Нақд / Наличные',
    hints: {
      tj: 'Сомонӣ ба курйер',
      ru: 'Сомони курьеру',
      en: 'Cash (TJS) to courier',
      uz: 'Kuryerga naqd somoniy',
    },
  },
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
      name: 'Сомон Раҳимов',
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
      fromLabel: 'Сиёма Молл (Ошхона)',
      toLabel: 'хиёб. Рӯдакӣ, 82 (ЦУМ)',
      distanceKm: 4.3,
      payoutTjs: 19,
      surge: '×1.2',
      tags: ['Термосумка', 'От двери до двери'],
      pickupMinutes: 4,
    },
    {
      id: 'TJ-8495',
      tariff: 'car',
      fromLabel: 'МТ Садбарг',
      toLabel: 'маҳаллаи 102, ЖК Сино',
      distanceKm: 6.8,
      payoutTjs: 38,
      surge: '×1.0',
      tags: ['Наложенный 340 сом.', 'Фотоотчёт'],
      pickupMinutes: 6,
    },
    {
      id: 'TJ-8501',
      tariff: 'scooter',
      fromLabel: 'Дорухона, 82 мкр',
      toLabel: 'Кохи Наврӯз, хиёб. Сомонӣ',
      distanceKm: 2.9,
      payoutTjs: 16,
      surge: '×1.15',
      tags: ['Alif Mobi', 'Срочно'],
      pickupMinutes: 3,
    },
  ],
  khujand: [
    {
      id: 'KH-3104',
      tariff: 'scooter',
      fromLabel: 'Бозори Панҷшанбе',
      toLabel: 'маҳаллаи 20, хонаи 12',
      distanceKm: 3.4,
      payoutTjs: 17,
      surge: '×1.2',
      tags: ['Термосумка', 'Фотоотчёт'],
      pickupMinutes: 5,
    },
    {
      id: 'KH-3109',
      tariff: 'car',
      fromLabel: 'Универмаги Хуҷанд',
      toLabel: 'маҳаллаи 34, назди мактаби №18',
      distanceKm: 5.1,
      payoutTjs: 32,
      surge: '×1.0',
      tags: ['Dushanbe City', 'Хрупкий груз'],
      pickupMinutes: 7,
    },
  ],
  bokhtar: [
    {
      id: 'BK-1208',
      tariff: 'scooter',
      fromLabel: 'Бозори Фаровон',
      toLabel: 'кӯч. Ваҳдат, 10',
      distanceKm: 2.4,
      payoutTjs: 14,
      surge: '×1.0',
      tags: ['От двери до двери'],
      pickupMinutes: 4,
    },
  ],
  kulob: [
    {
      id: 'KL-0941',
      tariff: 'scooter',
      fromLabel: 'Боғи И. Сомонӣ',
      toLabel: 'Бозори Саховат',
      distanceKm: 2.8,
      payoutTjs: 15,
      surge: '×1.0',
      tags: ['Термосумка'],
      pickupMinutes: 5,
    },
  ],
};

export function computeRouteDistanceKm(
  a: { x: number; y: number },
  b: { x: number; y: number },
  kmScale: number
): number {
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
  const travelMins = distanceKm / (0.48 * t.speedFactor) + t.avgEtaMin * 0.45;
  return Math.max(8, Math.round(travelMins));
}
