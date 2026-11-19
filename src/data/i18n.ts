import { ActiveOrder, LanguageCode, ParcelCategoryId } from '../types/delivery';

export interface AppStrings {
  brandName: string;
  navOrder: string;
  navTariffs: string;
  navFeatures: string;
  navBusiness: string;
  navAction: string;
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  modeClient: string;
  modeCourier: string;
  modeTrack: string;
  categoryLabel: string;
  categories: Record<ParcelCategoryId, string>;
  fromPlaceholder: string;
  toPlaceholder: string;
  pickupLabel: string;
  dropoffLabel: string;
  landmarkPlaceholder: string;
  recipientPhoneLabel: string;
  phoneErrorMsg: string;
  paymentLabel: string;
  optionsLabel: string;
  optDoor: string;
  optThermal: string;
  optPhoto: string;
  optCod: string;
  codAmountLabel: string;
  dispatchCta: string;
  currency: string;
  minShort: string;
  kmShort: string;
  kgShort: string;
  upTo: string;
  mapPinFromBtn: string;
  mapPinToBtn: string;
  mapHint: string;
  mapRouteLabel: string;
  mapEtaLabel: string;
  mapTariffHints: {
    scooter: string;
    car: string;
    cargo: string;
  };
  orderLabel: string;
  stages: Record<ActiveOrder['stage'], string>;
  pinTitle: string;
  pinHint: string;
  photoTitle: string;
  photoDone: string;
  photoWait: string;
  thermalActive: string;
  standardPack: string;
  chatBtn: string;
  chatHeader: string;
  chatPlaceholder: string;
  chatSend: string;
  chatClose: string;
  chatAutoReply: string;
  chatGreeting: string;
  cancelOrder: string;
  newOrder: string;
  courierEarningsTitle: string;
  courierCompletedPrefix: string;
  courierOnlineBtn: string;
  courierOfflineBtn: string;
  courierVehicleLabel: string;
  courierScooter: string;
  courierCar: string;
  courierOfflineTitle: string;
  courierOfflineBody: string;
  courierAvailableJobs: string;
  courierAcceptBtn: string;
  courierStepToA: string;
  courierStepAtA: string;
  courierStepToB: string;
  courierStepDone: string;
  courierPickLabel: string;
  courierDropLabel: string;
  courierBtnArrivedA: string;
  courierBtnPhotoTake: string;
  courierBtnPinFinish: string;
  courierBtnBackToFeed: string;
  trackPlaceholder: string;
  trackBtn: string;
  trackEmpty: string;
  trackNotFound: string;
  trackRecent: string;
  trackSmsNote: string;
  featuresKicker: string;
  featuresTitle: string;
  tabClients: string;
  tabCouriers: string;
  tabBusiness: string;
  realitiesPrefix: string;
  tariffsKicker: string;
  tariffsTitle: string;
  thTransport: string;
  thCapacity: string;
  thBase: string;
  thPerKm: string;
  thEta: string;
  thUseCase: string;
  bizKicker: string;
  bizTitle: string;
  bizDesc: string;
  bizOrdersLabel: string;
  bizOrdersUnit: string;
  bizShareLabel: string;
  bizDailySplit: string;
  bizAvgCheck: string;
  bizDailyBudget: string;
  bizAllCarNote: string;
  bizMonthlySavings: string;
  bizTestBtn: string;
  footerNote: string;
}

export const STRINGS: Record<LanguageCode, AppStrings> = {
  tj: {
    brandName: 'Пайк',
    navOrder: 'Фармоиш',
    navTariffs: 'Тарофаҳо',
    navFeatures: 'Имкониятҳо',
    navBusiness: 'Барои бизнес',
    navAction: 'Даъвати курйер',
    heroKicker: 'Тоҷикистон · Скутерҳои барқӣ, мошин ва Лабо',
    heroTitle: 'Хизмати миллии расонидан дар Тоҷикистон бо скутери барқӣ ва мошин',
    heroSubtitle:
      'Масирро дар Душанбе, Хуҷанд, Бохтар ва Кӯлоб бо нишонаҳои маҳалла ҳисоб кунед, нақлиётро интихоб намоед ва пардохтро тавассути Alif Mobi, DC ё Корти Миллӣ анҷом диҳед.',
    modeClient: 'Мизоҷ',
    modeCourier: 'Курйер Pro',
    modeTrack: 'Пайгирӣ',
    categoryLabel: 'Чӣ мефиристед?',
    categories: {
      parcel: 'Баста',
      food: 'Ош ва хӯрок',
      docs: 'Ҳуҷҷатҳо',
      cod_shop: 'Харид (Instagram)',
      pharmacy: 'Дорухона',
      bulk: 'Бори калон',
    },
    fromPlaceholder: 'Аз куҷо гирифтан (суроға ё нишона)',
    toPlaceholder: 'Ба куҷо расонидан (суроға ё нишона)',
    pickupLabel: 'Нуқтаи А · Аз куҷо',
    dropoffLabel: 'Нуқтаи Б · Ба куҷо',
    landmarkPlaceholder: 'Нишона, маҳалла, даромадгоҳ (мас. назди масҷид, ошёнаи 2)',
    recipientPhoneLabel: 'Рақами қабулкунанда',
    phoneErrorMsg: 'Рақами дурусти Тоҷикистонро ворид кунед (+992...)',
    paymentLabel: 'Тарзи пардохт',
    optionsLabel: 'Интихобҳои иловагӣ',
    optDoor: 'Аз дар то дар (+5 сом.)',
    optThermal: 'Халтаи гармнигоҳдор',
    optPhoto: 'Акс-ҳисобот ҳангоми супоридан',
    optCod: 'Пардохт ҳангоми гирифтан',
    codAmountLabel: 'Маблағи харид аз мизоҷ:',
    dispatchCta: 'Даъвати курйер',
    currency: 'сом.',
    minShort: 'дақ',
    kmShort: 'км',
    kgShort: 'кг',
    upTo: 'то',
    mapPinFromBtn: 'Нуқтаи А (Аз куҷо)',
    mapPinToBtn: 'Нуқтаи Б (Ба куҷо)',
    mapHint: 'Барои интихоби нуқта ба харита пахш кунед',
    mapRouteLabel: 'Масир:',
    mapEtaLabel: 'Расидан:',
    mapTariffHints: {
      scooter: 'Скутери барқӣ бе танбашавӣ',
      car: 'Мошини кондитсионердор ва бағоҷ',
      cargo: 'Боркаши Лабо то 500 кг',
    },
    orderLabel: 'Фармоиш',
    stages: {
      idle: 'Лоиҳа',
      searching: 'Ҷустуҷӯи курйери наздиктарин…',
      to_pickup: 'Курйер ба нуқтаи А баромад',
      at_pickup: 'Курйер дар ҷояш · Аксгирии бор',
      in_transit: 'Бор дар роҳ ба сӯи қабулкунанда',
      delivered: 'Бо рамзи ПИН супорида шуд',
    },
    pinTitle: 'ПИН-коди супоридан',
    pinHint: 'Қабулкунанда ба курйер мегӯяд',
    photoTitle: 'Акс-ҳисобот',
    photoDone: 'Акси бор боргузорӣ шуд',
    photoWait: 'Интизории гирифтан дар А',
    thermalActive: 'Термохалта фаъол аст',
    standardPack: 'Бастабандии муқаррарӣ',
    chatBtn: 'Чат',
    chatHeader: 'Чат бо курйер',
    chatPlaceholder: 'Нишонаро ба курйер нависед...',
    chatSend: 'Фиристодан',
    chatClose: 'Пӯшидан',
    chatAutoReply: 'Хуб, фаҳмидам. Дар роҳ ҳастам!',
    chatGreeting: 'Салом! Ба сӯи шумо баромадам, дар чанд дақиқа мерасам.',
    cancelOrder: 'Бекор кардани фармоиш',
    newOrder: 'Фармоиши нав',
    courierEarningsTitle: 'Даромади имрӯза',
    courierCompletedPrefix: 'Фармоишҳои иҷрошуда:',
    courierOnlineBtn: 'Дар хат (фаъол)',
    courierOfflineBtn: 'Ба хат баромадан',
    courierVehicleLabel: 'Нақлиёти шумо:',
    courierScooter: 'Скутери барқӣ',
    courierCar: 'Мошин',
    courierOfflineTitle: 'Шумо офлайн ҳастед',
    courierOfflineBody: 'Барои дидани фармоишҳои наздик ба хат бароед.',
    courierAvailableJobs: 'Фармоишҳои озод дар наздикӣ',
    courierAcceptBtn: 'Қабул кардан',
    courierStepToA: 'Ба нуқтаи А меравам',
    courierStepAtA: 'Борро мегирам',
    courierStepToB: 'Ба мизоҷ мебарам',
    courierStepDone: 'Фармоиш анҷом ёфт',
    courierPickLabel: 'Гирифтан:',
    courierDropLabel: 'Расонидан:',
    courierBtnArrivedA: 'Ба нуқтаи А расидам',
    courierBtnPhotoTake: 'Акс гирифта борро гирифтан',
    courierBtnPinFinish: 'Санҷиши ПИН ва супоридан',
    courierBtnBackToFeed: 'Бозгашт ба рӯйхат',
    trackPlaceholder: 'Рақами фармоиш (мас. TJ-8492)',
    trackBtn: 'Ҷустуҷӯ',
    trackEmpty: 'Ҳанӯз фармоиш сабт нашудааст. Дар бахши «Мизоҷ» фармоиш диҳед.',
    trackNotFound: 'Фармоиш ёфт нашуд. Яке аз фармоишҳои охиринро интихоб кунед.',
    trackRecent: 'Фармоишҳои охирин',
    trackSmsNote: 'Пайванди харитаи зинда ба қабулкунанда тавассути SMS, Telegram ё WhatsApp фиристода мешавад.',
    featuresKicker: 'Сохтори барнома · Мутобиқ ба Тоҷикистон',
    featuresTitle: 'Имкониятҳои асосии барномаи расонидани Пайк барои Тоҷикистон',
    tabClients: 'Барои мизоҷон',
    tabCouriers: 'Барои курйерҳо',
    tabBusiness: 'Барои бизнес',
    realitiesPrefix: 'Воқеияти Тоҷикистон:',
    tariffsKicker: 'Тарофаҳо · Душанбе ва минтақаҳо',
    tariffsTitle: 'Муқоисаи скутери барқӣ, мошини сабукрав ва боркаши Лабо',
    thTransport: 'Нақлиёт',
    thCapacity: 'Вазн ва қуттӣ',
    thBase: 'Поя (расидан)',
    thPerKm: 'Барои 1 км',
    thEta: 'Вақти миёна',
    thUseCase: 'Кай интихоб кунед',
    bizKicker: 'Барои мағозаҳо, ошхонаҳо ва дорухонаҳо',
    bizTitle: 'Иқтисоди парки омехта: скутери барқӣ + мошин',
    bizDesc: 'Интиқоли фармоишҳои то 15 кг аз мошинҳо ба скутерҳои барқӣ хароҷоти расониданро то 45% кам мекунад ва дар маркази Душанбеву Хуҷанд вақтро сарфа менамояд.',
    bizOrdersLabel: 'Фармоиш дар як рӯз',
    bizOrdersUnit: 'фармоиш',
    bizShareLabel: 'Ҳиссаи скутерҳои барқӣ',
    bizDailySplit: 'Тақсимоти рейсҳо дар як рӯз',
    bizAvgCheck: 'Нархи миёна дар шаҳр:',
    bizDailyBudget: 'Буҷаи рӯзонаи интиқол',
    bizAllCarNote: 'Ба ҷойи хароҷот танҳо бо мошин:',
    bizMonthlySavings: 'Сарфа дар 30 рӯз бо скутерҳои барқӣ',
    bizTestBtn: 'Санҷидани тарофа',
    footerNote: 'Прототипи миллии расонидани шаҳрӣ дар Тоҷикистон (Душанбе, Хуҷанд, Бохтар, Кӯлоб)',
  },
  ru: {
    brandName: 'Пайк',
    navOrder: 'Заказать',
    navTariffs: 'Тарифы',
    navFeatures: 'Функции',
    navBusiness: 'Для бизнеса',
    navAction: 'Вызвать курьера',
    heroKicker: 'Таджикистан · Электроскутеры, легковые авто и Лабо',
    heroTitle: 'Национальный сервис доставки по Таджикистану на электроскутерах и авто',
    heroSubtitle:
      'Рассчитайте маршрут в Душанбе, Худжанде, Бохтаре и Кулябе с указанием махалли и ориентира, выберите транспорт и оплачивайте через Alif Mobi, Dushanbe City или Корти Милли.',
    modeClient: 'Клиент',
    modeCourier: 'Курьер Pro',
    modeTrack: 'Отследить',
    categoryLabel: 'Что отправляете?',
    categories: {
      parcel: 'Посылка',
      food: 'Ош и еда',
      docs: 'Документы',
      cod_shop: 'Выкуп (Instagram)',
      pharmacy: 'Аптека',
      bulk: 'Крупный груз',
    },
    fromPlaceholder: 'Откуда забрать (адрес или ориентир)',
    toPlaceholder: 'Куда доставить (адрес или ориентир)',
    pickupLabel: 'Точка А · Откуда',
    dropoffLabel: 'Точка Б · Куда',
    landmarkPlaceholder: 'Ориентир, махалля, подъезд (напр. рядом с мечетью, 2 этаж)',
    recipientPhoneLabel: 'Телефон получателя',
    phoneErrorMsg: 'Введите корректный номер Таджикистана (+992...)',
    paymentLabel: 'Способ оплаты',
    optionsLabel: 'Опции доставки',
    optDoor: 'От двери до двери (+5 сом.)',
    optThermal: 'Термосумка для еды',
    optPhoto: 'Фотоотчёт при вручении',
    optCod: 'Наложенный платёж (выкуп)',
    codAmountLabel: 'Сумма выкупа у получателя:',
    dispatchCta: 'Вызвать курьера',
    currency: 'сом.',
    minShort: 'мин',
    kmShort: 'км',
    kgShort: 'кг',
    upTo: 'до',
    mapPinFromBtn: 'Точка А (Откуда)',
    mapPinToBtn: 'Точка Б (Куда)',
    mapHint: 'Нажмите на карту, чтобы поставить точку на маршруте',
    mapRouteLabel: 'Маршрут:',
    mapEtaLabel: 'Подача и путь:',
    mapTariffHints: {
      scooter: 'Электроскутер в объезд пробок',
      car: 'Кондиционер и закрытый багажник',
      cargo: 'Грузовой борт Лабо до 500 кг',
    },
    orderLabel: 'Заказ',
    stages: {
      idle: 'Черновик',
      searching: 'Поиск ближайшего курьера…',
      to_pickup: 'Курьер выехал к точке А',
      at_pickup: 'Курьер на месте · Фотофиксация посылки',
      in_transit: 'Посылка в пути к получателю',
      delivered: 'Доставлено по ПИН-коду',
    },
    pinTitle: 'ПИН-код вручения',
    pinHint: 'Получатель называет курьеру',
    photoTitle: 'Фотоотчёт',
    photoDone: 'Фото посылки загружено',
    photoWait: 'Ожидает забора в точке А',
    thermalActive: 'Термосумка активна',
    standardPack: 'Стандартная упаковка',
    chatBtn: 'Чат',
    chatHeader: 'Чат с курьером',
    chatPlaceholder: 'Написать ориентир курьеру...',
    chatSend: 'Отправить',
    chatClose: 'Закрыть',
    chatAutoReply: 'Хорошо, принял ориентир. Уже в пути!',
    chatGreeting: 'Салом! Выехал к вам, буду на месте через пару минут.',
    cancelOrder: 'Отменить заказ',
    newOrder: 'Оформить новую доставку',
    courierEarningsTitle: 'Заработок за смену',
    courierCompletedPrefix: 'Выполнено заказов:',
    courierOnlineBtn: 'На линии (принимаю)',
    courierOfflineBtn: 'Выйти на линию',
    courierVehicleLabel: 'Ваш транспорт:',
    courierScooter: 'Электроскутер',
    courierCar: 'Автомобиль',
    courierOfflineTitle: 'Вы офлайн',
    courierOfflineBody: 'Нажмите «Выйти на линию», чтобы принимать заказы рядом.',
    courierAvailableJobs: 'Доступные заказы рядом',
    courierAcceptBtn: 'Принять',
    courierStepToA: 'Еду к точке А',
    courierStepAtA: 'Забираю посылку',
    courierStepToB: 'Везу получателю',
    courierStepDone: 'Заказ завершён',
    courierPickLabel: 'Забрать:',
    courierDropLabel: 'Доставить:',
    courierBtnArrivedA: 'Приехал в точку А',
    courierBtnPhotoTake: 'Сделать фото и забрать',
    courierBtnPinFinish: 'Проверить ПИН и вручить',
    courierBtnBackToFeed: 'К списку заказов',
    trackPlaceholder: 'Номер заказа (напр. TJ-8492)',
    trackBtn: 'Найти',
    trackEmpty: 'Пока нет оформленных заказов. Создайте тестовую доставку во вкладке «Клиент».',
    trackNotFound: 'Заказ не найден. Выберите из недавних заказов ниже.',
    trackRecent: 'Недавние заказы',
    trackSmsNote: 'Ссылка на live-трекер отправляется получателю в SMS, Telegram или WhatsApp.',
    featuresKicker: 'Архитектура сервиса · Реалии Таджикистана',
    featuresTitle: 'Функции национального приложения доставки «Пайк»',
    tabClients: 'Для клиентов',
    tabCouriers: 'Для курьеров',
    tabBusiness: 'Для бизнеса',
    realitiesPrefix: 'Реалии Таджикистана:',
    tariffsKicker: 'Тарифная сетка · Душанбе и регионы',
    tariffsTitle: 'Сравнение электроскутера, легкового авто и грузового Лабо',
    thTransport: 'Транспорт',
    thCapacity: 'Макс. вес и короб',
    thBase: 'Подача',
    thPerKm: 'За 1 км',
    thEta: 'Среднее время',
    thUseCase: 'Когда выбирать',
    bizKicker: 'Для магазинов, ошхон и аптек',
    bizTitle: 'Экономика гибридного парка: электроскутер + авто',
    bizDesc: 'Перенос городских посылок до 15 кг с автомобилей на электроскутеры снижает стоимость доставки почти вдвое и экономит время в центре Душанбе и Худжанда.',
    bizOrdersLabel: 'Заказов в день от бизнеса',
    bizOrdersUnit: 'заказов',
    bizShareLabel: 'Доля доставок на электроскутерах',
    bizDailySplit: 'Распределение рейсов в день',
    bizAvgCheck: 'Средний чек по городу:',
    bizDailyBudget: 'Суточный бюджет логистики',
    bizAllCarNote: 'Вместо расходов только на авто:',
    bizMonthlySavings: 'Экономия за 30 дней с электроскутерами',
    bizTestBtn: 'Протестировать тариф',
    footerNote: 'Национальный сервис городской доставки в Таджикистане (Душанбе, Худжанд, Бохтар, Куляб)',
  },
  en: {
    brandName: 'Payk',
    navOrder: 'Order',
    navTariffs: 'Tariffs',
    navFeatures: 'Features',
    navBusiness: 'Business',
    navAction: 'Book Courier',
    heroKicker: 'Tajikistan · Electric Scooters, Cars & Labo Cargo',
    heroTitle: 'Tajikistan urban express delivery on electric scooters and cars',
    heroSubtitle:
      'Calculate routes across Dushanbe, Khujand, Bokhtar, and Kulob using street landmarks, choose your vehicle tier, and pay with Alif Mobi, Dushanbe City, or Corti Milli.',
    modeClient: 'Sender',
    modeCourier: 'Courier Pro',
    modeTrack: 'Track',
    categoryLabel: 'What are you sending?',
    categories: {
      parcel: 'Parcel',
      food: 'Hot Food',
      docs: 'Documents',
      cod_shop: 'Shop COD',
      pharmacy: 'Pharmacy',
      bulk: 'Heavy Cargo',
    },
    fromPlaceholder: 'Pickup address or landmark',
    toPlaceholder: 'Drop-off address or landmark',
    pickupLabel: 'Point A · Pickup',
    dropoffLabel: 'Point B · Drop-off',
    landmarkPlaceholder: 'Landmark, mahalla, entrance (e.g. near mosque, 2nd floor)',
    recipientPhoneLabel: 'Recipient phone',
    phoneErrorMsg: 'Enter a valid Tajikistan phone number (+992...)',
    paymentLabel: 'Payment method',
    optionsLabel: 'Delivery options',
    optDoor: 'Door-to-door (+5 TJS)',
    optThermal: 'Thermal food bag',
    optPhoto: 'Photo proof at handoff',
    optCod: 'Cash on delivery (COD)',
    codAmountLabel: 'Amount to collect:',
    dispatchCta: 'Dispatch Courier',
    currency: 'TJS',
    minShort: 'min',
    kmShort: 'km',
    kgShort: 'kg',
    upTo: 'up to',
    mapPinFromBtn: 'Point A (Pickup)',
    mapPinToBtn: 'Point B (Drop-off)',
    mapHint: 'Click anywhere on the map to set a route pin',
    mapRouteLabel: 'Route:',
    mapEtaLabel: 'ETA:',
    mapTariffHints: {
      scooter: 'E-scooter bypasses city traffic',
      car: 'Climate-controlled cabin & trunk',
      cargo: 'Labo mini-truck up to 500 kg',
    },
    orderLabel: 'Order',
    stages: {
      idle: 'Draft',
      searching: 'Finding nearest courier…',
      to_pickup: 'Courier heading to Point A',
      at_pickup: 'Courier arrived · Taking parcel photo',
      in_transit: 'Parcel in transit to recipient',
      delivered: 'Delivered with PIN verification',
    },
    pinTitle: 'Handoff PIN code',
    pinHint: 'Recipient shares with courier',
    photoTitle: 'Photo proof',
    photoDone: 'Pickup photo uploaded',
    photoWait: 'Waiting for pickup at A',
    thermalActive: 'Thermal bag active',
    standardPack: 'Standard packaging',
    chatBtn: 'Chat',
    chatHeader: 'Courier chat',
    chatPlaceholder: 'Send landmark note...',
    chatSend: 'Send',
    chatClose: 'Close',
    chatAutoReply: 'Got it, noted the landmark. On my way!',
    chatGreeting: 'Salom! On my way to pickup, arriving in a few minutes.',
    cancelOrder: 'Cancel order',
    newOrder: 'New delivery',
    courierEarningsTitle: 'Shift earnings',
    courierCompletedPrefix: 'Completed trips:',
    courierOnlineBtn: 'Online (receiving)',
    courierOfflineBtn: 'Go online',
    courierVehicleLabel: 'Your vehicle:',
    courierScooter: 'E-Scooter',
    courierCar: 'Car',
    courierOfflineTitle: 'You are offline',
    courierOfflineBody: 'Tap "Go online" to see nearby delivery requests.',
    courierAvailableJobs: 'Available jobs nearby',
    courierAcceptBtn: 'Accept',
    courierStepToA: 'Heading to Point A',
    courierStepAtA: 'Picking up parcel',
    courierStepToB: 'Delivering to recipient',
    courierStepDone: 'Order completed',
    courierPickLabel: 'Pickup:',
    courierDropLabel: 'Drop-off:',
    courierBtnArrivedA: 'Arrived at Point A',
    courierBtnPhotoTake: 'Take photo & pick up',
    courierBtnPinFinish: 'Verify PIN & complete',
    courierBtnBackToFeed: 'Back to job feed',
    trackPlaceholder: 'Order ID (e.g. TJ-8492)',
    trackBtn: 'Find',
    trackEmpty: 'No orders created yet. Place a test order in the Sender tab.',
    trackNotFound: 'Order not found. Pick one of your recent orders below.',
    trackRecent: 'Recent orders',
    trackSmsNote: 'Live map tracking link is sent to the recipient via SMS, Telegram, or WhatsApp.',
    featuresKicker: 'Platform Architecture · Built for Tajikistan',
    featuresTitle: 'Core capabilities of the Payk Tajikistan delivery app',
    tabClients: 'For Senders',
    tabCouriers: 'For Couriers',
    tabBusiness: 'For Business',
    realitiesPrefix: 'Local Tajikistan context:',
    tariffsKicker: 'Rate Card · Dushanbe & Regions',
    tariffsTitle: 'Comparing Electric Scooter, Sedan Car, and Labo Cargo',
    thTransport: 'Vehicle',
    thCapacity: 'Weight & box',
    thBase: 'Base fare',
    thPerKm: 'Per km',
    thEta: 'Avg ETA',
    thUseCase: 'Best used for',
    bizKicker: 'For Shops, Cafes & Pharmacies',
    bizTitle: 'Hybrid fleet economics: e-scooter + car',
    bizDesc: 'Shifting urban parcels under 15 kg from cars to electric scooters cuts per-order delivery cost nearly in half and beats center-city congestion.',
    bizOrdersLabel: 'Daily business orders',
    bizOrdersUnit: 'orders',
    bizShareLabel: 'Share dispatched by e-scooters',
    bizDailySplit: 'Daily dispatch split',
    bizAvgCheck: 'Avg city fee:',
    bizDailyBudget: 'Daily logistics spend',
    bizAllCarNote: 'Compared to car-only dispatch:',
    bizMonthlySavings: '30-day savings with e-scooters',
    bizTestBtn: 'Test tariff',
    footerNote: 'Tajikistan urban courier platform (Dushanbe, Khujand, Bokhtar, Kulob)',
  },
  uz: {
    brandName: 'Payk',
    navOrder: 'Buyurtma',
    navTariffs: 'Tariflar',
    navFeatures: 'Imkoniyatlar',
    navBusiness: 'Biznes uchun',
    navAction: 'Kuryer chaqirish',
    heroKicker: 'Tojikiston · Elektr skuter, yengil avto va Labo',
    heroTitle: 'Tojikiston boʻylab elektr skuter va avtomobilda tezkor yetkazib berish',
    heroSubtitle:
      'Dushanbe, Xoʻjand, Boxtar va Koʻlob boʻylab moʻljal asosida yoʻnalishni hisoblang, transport turini tanlang va Alif Mobi, Dushanbe City yoki Korti Milli orqali toʻlang.',
    modeClient: 'Mijoz',
    modeCourier: 'Kuryer Pro',
    modeTrack: 'Kuzatish',
    categoryLabel: 'Nima yuborasiz?',
    categories: {
      parcel: 'Joʻnatma',
      food: 'Osh va taom',
      docs: 'Hujjatlar',
      cod_shop: 'Xarid (Instagram)',
      pharmacy: 'Dorixona',
      bulk: 'Katta yuk',
    },
    fromPlaceholder: 'Qayerdan olish (manzil yoki moʻljal)',
    toPlaceholder: 'Qayerga yetkazish (manzil yoki moʻljal)',
    pickupLabel: 'A nuqta · Qayerdan',
    dropoffLabel: 'B nuqta · Qayerga',
    landmarkPlaceholder: 'Moʻljal, mahalla, podyezd (mas. masjid yonida, 2-qavat)',
    recipientPhoneLabel: 'Qabul qiluvchi telefoni',
    phoneErrorMsg: 'Toʻgʻri Tojikiston raqamini kiriting (+992...)',
    paymentLabel: 'Toʻlov usuli',
    optionsLabel: 'Qoʻshimcha xizmatlar',
    optDoor: 'Eshikdan eshikgacha (+5 som.)',
    optThermal: 'Issiq taom termoxaltasi',
    optPhoto: 'Topshirishda foto-hisobot',
    optCod: 'Olishda toʻlov (vikup)',
    codAmountLabel: 'Olinadigan summa:',
    dispatchCta: 'Kuryer chaqirish',
    currency: 'som.',
    minShort: 'daq',
    kmShort: 'km',
    kgShort: 'kg',
    upTo: 'gacha',
    mapPinFromBtn: 'A nuqta (Qayerdan)',
    mapPinToBtn: 'B nuqta (Qayerga)',
    mapHint: 'Yoʻnalish nuqtasini qoʻyish uchun xaritaga bosing',
    mapRouteLabel: 'Yoʻnalish:',
    mapEtaLabel: 'Yetib borish:',
    mapTariffHints: {
      scooter: 'Elektr skuter tirbandliksiz yuradi',
      car: 'Konditsioner va keng yukxona',
      cargo: 'Labo yuk mashinasi 500 kg gacha',
    },
    orderLabel: 'Buyurtma',
    stages: {
      idle: 'Qoralama',
      searching: 'Eng yaqin kuryer qidirilmoqda…',
      to_pickup: 'Kuryer A nuqtaga yoʻlga chiqdi',
      at_pickup: 'Kuryer yetib keldi · Joʻnatma suratga olinmoqda',
      in_transit: 'Joʻnatma qabul qiluvchi tomon yoʻlda',
      delivered: 'PIN-kod orqali topshirildi',
    },
    pinTitle: 'Topshirish PIN-kodi',
    pinHint: 'Qabul qiluvchi kuryerga aytadi',
    photoTitle: 'Foto-hisobot',
    photoDone: 'Joʻnatma surati yuklandi',
    photoWait: 'A nuqtada olish kutilmoqda',
    thermalActive: 'Termoxalta faol',
    standardPack: 'Oddiy qadoqlash',
    chatBtn: 'Chat',
    chatHeader: 'Kuryer bilan chat',
    chatPlaceholder: 'Moʻljalni yozing...',
    chatSend: 'Yuborish',
    chatClose: 'Yopish',
    chatAutoReply: 'Tushunarli, moʻljalni oldim. Yoʻldaman!',
    chatGreeting: 'Salom! Siz tomonga yoʻlga chiqdim, bir necha daqiqada yetib boraman.',
    cancelOrder: 'Buyurtmani bekor qilish',
    newOrder: 'Yangi buyurtma',
    courierEarningsTitle: 'Smena daromadi',
    courierCompletedPrefix: 'Bajarilgan buyurtmalar:',
    courierOnlineBtn: 'Liniyada (faol)',
    courierOfflineBtn: 'Liniyaga chiqish',
    courierVehicleLabel: 'Transportingiz:',
    courierScooter: 'Elektr skuter',
    courierCar: 'Avtomobil',
    courierOfflineTitle: 'Siz oflaynsiz',
    courierOfflineBody: 'Yaqin atrofdagi buyurtmalarni koʻrish uchun liniyaga chiqing.',
    courierAvailableJobs: 'Yaqindagi boʻsh buyurtmalar',
    courierAcceptBtn: 'Qabul qilish',
    courierStepToA: 'A nuqtaga ketyapman',
    courierStepAtA: 'Joʻnatmani olyapman',
    courierStepToB: 'Mijozga olib boryapman',
    courierStepDone: 'Buyurtma yakunlandi',
    courierPickLabel: 'Olish:',
    courierDropLabel: 'Yetkazish:',
    courierBtnArrivedA: 'A nuqtaga yetib keldim',
    courierBtnPhotoTake: 'Suratga olib joʻnatmani olish',
    courierBtnPinFinish: 'PIN tekshirish va topshirish',
    courierBtnBackToFeed: 'Roʻyxatga qaytish',
    trackPlaceholder: 'Buyurtma raqami (mas. TJ-8492)',
    trackBtn: 'Topish',
    trackEmpty: 'Hali buyurtma berilmagan. «Mijoz» boʻlimida sinov buyurtma yarating.',
    trackNotFound: 'Buyurtma topilmadi. Quyidagi oxirgi buyurtmalardan birini tanlang.',
    trackRecent: 'Oxirgi buyurtmalar',
    trackSmsNote: 'Jonli xarita havolasi qabul qiluvchiga SMS, Telegram yoki WhatsApp orqali yuboriladi.',
    featuresKicker: 'Ilova tuzilishi · Tojikiston sharoitiga mos',
    featuresTitle: 'Tojikiston uchun Payk yetkazib berish ilovasining asosiy funksiyalari',
    tabClients: 'Mijozlar uchun',
    tabCouriers: 'Kuryerlar uchun',
    tabBusiness: 'Biznes uchun',
    realitiesPrefix: 'Tojikiston sharoiti:',
    tariffsKicker: 'Tariflar · Dushanbe va hududlar',
    tariffsTitle: 'Elektr skuter, yengil avto va Labo yuk mashinasi taqqoslanishi',
    thTransport: 'Transport',
    thCapacity: 'Vazn va quti',
    thBase: 'Boshlangʻich',
    thPerKm: '1 km uchun',
    thEta: 'Oʻrtacha vaqt',
    thUseCase: 'Qachon tanlash kerak',
    bizKicker: 'Doʻkonlar, oshxona va dorixonalar uchun',
    bizTitle: 'Gibrid park iqtisodiyoti: elektr skuter + avto',
    bizDesc: '15 kg gacha boʻlgan shahar buyurtmalarini avtomobildan elektr skuterga oʻtkazish xarajatlarni deyarli ikki baravar kamaytiradi va markazda vaqtni tejaydi.',
    bizOrdersLabel: 'Kunlik biznes buyurtmalari',
    bizOrdersUnit: 'buyurtma',
    bizShareLabel: 'Elektr skuterdagi ulush',
    bizDailySplit: 'Kunlik reyslar taqsimoti',
    bizAvgCheck: 'Shahardagi oʻrtacha narx:',
    bizDailyBudget: 'Kunlik logistika byudjeti',
    bizAllCarNote: 'Faqat avtomobilda boʻlganda:',
    bizMonthlySavings: 'Elektr skuter bilan 30 kunlik tejash',
    bizTestBtn: 'Tarifni sinash',
    footerNote: 'Tojikiston shaharlarida tezkor yetkazib berish xizmati (Dushanbe, Xoʻjand, Boxtar, Koʻlob)',
  },
};
