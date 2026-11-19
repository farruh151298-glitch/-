import React, { useState } from 'react';
import { TARIFFS } from '../data/tajikistanData';
import { STRINGS } from '../data/i18n';
import { LanguageCode, TariffId } from '../types/delivery';
import { VehicleArtwork } from './VehicleArtwork';

type RoleTab = 'client' | 'courier' | 'business';

interface FeatureArchitectureProps {
  lang: LanguageCode;
}

interface FeatureItem {
  num: string;
  title: string;
  mechanism: string;
  tajikistanContext: string;
}

const FEATURE_BLOCKS: Record<LanguageCode, Record<RoleTab, FeatureItem[]>> = {
  tj: {
    client: [
      {
        num: '01.',
        title: 'Интихоби скутери барқӣ, мошин ва Лабо',
        mechanism:
          'Ҳисоби худкори нарх аз рӯи масофа, вазн ва обу ҳаво бо сомонӣ (TJS) пеш аз тасдиқи фармоиш.',
        tajikistanContext:
          'Скутери барқӣ дар маркази Душанбе (хиёб. Рӯдакӣ, кӯч. Айнӣ) танбашавиро дар 12–18 дақиқа убур мекунад, мошини кондитсионердор бошад торт, гул ва техникаро дар гармои +45 °C эмин медорад.',
      },
      {
        num: '02.',
        title: 'Ҷустуҷӯ бо нишонаи маҳалла ва харита',
        mechanism:
          'Майдони иловагии «Нишона» ва фиристодани пайванд ба қабулкунанда дар Telegram ё WhatsApp барои муайян кардани нуқтаи дақиқ.',
        tajikistanContext:
          'Мушкилоти маҳаллаҳо ва биноҳои навро ҳал мекунад, ки дар онҳо рақамгузории дақиқи хонаҳо ҳанӯз мавҷуд нест.',
      },
      {
        num: '03.',
        title: 'Ҳамёнҳои миллӣ ва пардохт ҳангоми гирифтан',
        mechanism:
          'Пардохти фаврӣ тавассути Alif Mobi, Dushanbe City, Корти Миллӣ ё нақд, инчунин хизмати «Харид ва расонидан».',
        tajikistanContext:
          'Барои мағозаҳои Instagram ва тоҷирони бозори Корвон хеле муҳим: курйер маблағи молро аз харидор гирифта ба фурӯшанда мегузаронад.',
      },
      {
        num: '04.',
        title: 'Рамзи ПИН ва акс-ҳисоботи бехатарӣ',
        mechanism:
          'Курйер борро дар нуқтаи А акс мегирад ва бе ворид кардани рамзи 4-рақамаи SMS фармоишро баста наметавонад.',
        tajikistanContext:
          'Варақаҳои коғазиро иваз карда, бехатарии телефонҳо, ҳуҷҷатҳо ва дорувориро кафолат медиҳад.',
      },
    ],
    courier: [
      {
        num: '01.',
        title: 'Харитаи гарми талабот ва коэффитсиентҳо',
        mechanism:
          'Дар «Курйер Pro» минтақаҳои серфармоиш бо коэффитсиенти баланд (×1.2 – ×1.5) дар вақти нисфирӯзӣ нишон дода мешаванд.',
        tajikistanContext:
          'Нуқтаҳои асосӣ — ЦУМ, Садбарг, Сиёма Молл, маҳаллаи 82 ва бозори Панҷшанбе дар Хуҷанд.',
      },
      {
        num: '02.',
        title: 'Нуқтаҳои ивази батареяи скутерҳо',
        mechanism:
          'Харитаи курйер захираи қувва ва наздиктарин истгоҳҳои ивази фаврии батареяро нишон медиҳад.',
        tajikistanContext:
          'Имкон медиҳад курйер бе таваққуфи 4-соата тамоми рӯз кор кунад.',
      },
      {
        num: '03.',
        title: 'Муттаҳидсозии 2–3 фармоиши ҳамроҳ',
        mechanism:
          'Низом бастаҳои як самтро ба як масири ягона (А1 → А2 → Б1 → Б2) пайваст мекунад.',
        tajikistanContext:
          'Даромади курйерро дар як соат 30–40% зиёд карда, нархро барои мизоҷ арзон нигоҳ медорад.',
      },
      {
        num: '04.',
        title: 'Баровардани фаврии маблағ ба корт',
        mechanism:
          'Тавозун дарҳол пас аз супоридани бор нав мешавад ва ба Alif Mobi ё Корти Миллӣ интиқол меёбад.',
        tajikistanContext:
          'Пардохти шаффоф бидуни интизории охири моҳ.',
      },
    ],
    business: [
      {
        num: '01.',
        title: 'API ва виджет барои ошхонаву дорухонаҳо',
        mechanism:
          'Даъвати худкори скутери наздиктарин дар лаҳзаи омода шудани фармоиш дар низоми POS ё сомона.',
        tajikistanContext:
          'Мувофиқ барои шабакаҳои ошхона, қаҳвахонаҳо, дорухонаҳо ва гулфурӯшиҳо.',
      },
      {
        num: '02.',
        title: 'Тақсимоти бисёрнуқтаӣ (то 10 суроға)',
        mechanism:
          'Боргузории рӯйхати мизоҷон аз Excel бо сохтани масири беҳтарин дар як рейс.',
        tajikistanContext:
          'Як мошин метавонад фармоишҳои пагоҳирӯзии об, нон ё интернет-мағозаҳоро якбора расонад.',
      },
      {
        num: '03.',
        title: 'Ҳисоби корпоративӣ ва ҳисоботи моҳона',
        mechanism:
          'Ҳисоби ягона барои ширкатҳо бо феҳристи муфассали ҳар як расонидан барои бахшҳо.',
        tajikistanContext:
          'Барои бонкҳо, ширкатҳои суғурта ва офисҳои Душанбеву Хуҷанд ҳангоми ирсоли аснод қулай аст.',
      },
      {
        num: '04.',
        title: 'Суғурта ва термоқуттиҳои брендишуда',
        mechanism:
          'Интихоби курйерҳои дорои халтаҳои гармнигоҳдор ва суғуртаи арзиши мол.',
        tajikistanContext:
          'Гармии ош, самбӯса ва хӯрокҳои миллиро то маҳаллаҳои дур нигоҳ медорад.',
      },
    ],
  },
  ru: {
    client: [
      {
        num: '01.',
        title: 'Выбор между электроскутером, авто и Лабо',
        mechanism:
          'Автоматический расчёт тарифа по расстоянию, весу и погоде в сомони (TJS) до подтверждения заказа.',
        tajikistanContext:
          'Электроскутер объезжает пробки на пр. Рудаки и ул. Айни за 12–18 мин, а авто с кондиционером бережёт торты, цветы и технику в летнюю жару +45 °C.',
      },
      {
        num: '02.',
        title: 'Поиск по ориентирам махалли и «точке на карте»',
        mechanism:
          'Поле «Ориентир» и отправка ссылки получателю в Telegram или WhatsApp, чтобы он сам поставил пин на карте.',
        tajikistanContext:
          'Решает главную проблему махаллей и новостроек в Таджикистане, где ещё нет точной нумерации домов.',
      },
      {
        num: '03.',
        title: 'Alif Mobi, Dushanbe City и выкуп товара',
        mechanism:
          'Мгновенная оплата кошельками, Корти Милли или наличными, плюс опция наложенного платежа.',
        tajikistanContext:
          'Критично для Instagram-магазинов и продавцов с Корвона: курьер забирает оплату у клиента и переводит продавцу.',
      },
      {
        num: '04.',
        title: 'ПИН-код вручения и фотоотчёт посылки',
        mechanism:
          'Курьер фотографирует груз в точке А и не может закрыть заказ без ввода 4-значного SMS ПИН-кода получателя.',
        tajikistanContext:
          'Заменяет бумажные накладные, защищает дорогие заказы (телефоны, документы, лекарства) и исключает споры.',
      },
    ],
    courier: [
      {
        num: '01.',
        title: 'Тепловая карта спроса и коэффициенты',
        mechanism:
          'В интерфейсе «Курьер Pro» подсвечиваются зоны с высоким спросом (×1.2 – ×1.5 в обед и час пик).',
        tajikistanContext:
          'Ключевые точки — ЦУМ, Садбарг, Сиёма Молл, 82-й мкр, рынок Панчшанбе в Худжанде.',
      },
      {
        num: '02.',
        title: 'Станции замены батарей для электроскутеров',
        mechanism:
          'Навигатор курьера показывает остаток пробега и ближайшие точки быстрой зарядки или свап-шкафы АКБ.',
        tajikistanContext:
          'Позволяет курьеру на электроскутере работать полную смену без 4-часового простоя у розетки.',
      },
      {
        num: '03.',
        title: 'Комбинирование 2–3 попутных заказов',
        mechanism:
          'Алгоритм объединяет посылки из одного района в одном направлении в единый маршрут А1 → А2 → Б1 → Б2.',
        tajikistanContext:
          'Увеличивает доход курьера в час на 30–40% при сохранении доступной цены для клиента от 10 сомони.',
      },
      {
        num: '04.',
        title: 'Моментальный вывод на Alif и Корти Милли',
        mechanism:
          'Баланс обновляется сразу после закрытия заказа; вывод средств на карту или кошелёк доступен ежедневно.',
        tajikistanContext:
          'Прозрачная мотивация без ожидания конца месяца.',
      },
    ],
    business: [
      {
        num: '01.',
        title: 'API и виджет для ошхон, кафе и аптек',
        mechanism:
          'Автоматический вызов ближайшего скутера в момент готовности заказа в POS-системе или на сайте.',
        tajikistanContext:
          'Подходит для сетей общепита (ошхона, фастфуд, кофейни), аптек «Дорухона» и цветочных студий.',
      },
      {
        num: '02.',
        title: 'Мультиточечный развоз (до 10 адресов)',
        mechanism:
          'Загрузка списка клиентов из Excel или 1С с автоматическим построением оптимального маршрута объезда.',
        tajikistanContext:
          'Один автомобиль развозит заказы воды, выпечки или интернет-магазинов за один рейс.',
      },
      {
        num: '03.',
        title: 'Закрывающие документы и корпоративный счёт',
        mechanism:
          'Единый постоплатный баланс для юрлиц с ежемесячным реестром поездок по каждому филиалу.',
        tajikistanContext:
          'Удобно для банков, страховых компаний и офисов в Душанбе и Худжанде.',
      },
      {
        num: '04.',
        title: 'Страхование и брендированные термокороба',
        mechanism:
          'Выделение приоритетных курьеров с жёсткими термосумками и гарантированным покрытием стоимости груза.',
        tajikistanContext:
          'Сохраняет температуру плова, самбусы и горячих напитков даже при доставке в отдалённые микрорайоны.',
      },
    ],
  },
  en: {
    client: [
      {
        num: '01.',
        title: 'E-Scooter, Sedan Car & Labo Mini-Truck Tiers',
        mechanism:
          'Transparent upfront pricing in Tajik Somoni (TJS) calculated by street distance, weight, and demand.',
        tajikistanContext:
          'Electric scooters cut through central Dushanbe traffic in 12–18 mins, while AC cars protect cakes, flowers, and electronics in +45 °C summer heat.',
      },
      {
        num: '02.',
        title: 'Landmark & Mahalla Pinpoint Addressing',
        mechanism:
          'Dedicated landmark notes plus instant Telegram/WhatsApp pin sharing so recipients confirm their exact gate.',
        tajikistanContext:
          'Solves missing street numbers in newly built residential complexes and traditional mahallas across Tajikistan.',
      },
      {
        num: '03.',
        title: 'Local Wallets & Instagram Shop COD',
        mechanism:
          'Native support for Alif Mobi, Dushanbe City, Corti Milli cards, cash, and Cash-on-Delivery buyouts.',
        tajikistanContext:
          'Essential for local Instagram boutiques and Korvon merchants: couriers collect payment at drop-off.',
      },
      {
        num: '04.',
        title: '4-Digit Handoff PIN & Photo Verification',
        mechanism:
          'Couriers photograph parcels at Point A and cannot complete delivery without the recipient’s SMS PIN.',
        tajikistanContext:
          'Replaces paper receipts and protects high-value electronics, pharmacy orders, and official documents.',
      },
    ],
    courier: [
      {
        num: '01.',
        title: 'Live Demand Heatmaps & Peak Multipliers',
        mechanism:
          'Courier Pro highlights busy commercial zones with ×1.2–×1.5 surge bonuses during lunch and rush hours.',
        tajikistanContext:
          'Peak hubs include TSUM, Sadbarg, Siyoma Mall, 82nd District, and Panjshanbe Bazaar in Khujand.',
      },
      {
        num: '02.',
        title: 'E-Scooter Battery-Swap Network Map',
        mechanism:
          'In-app routing guides scooter riders to nearby fast-swap battery cabinets before range drops.',
        tajikistanContext:
          'Eliminates 4-hour charging downtime so riders stay active across full daytime and evening shifts.',
      },
      {
        num: '03.',
        title: 'Smart Multi-Order Route Batching',
        mechanism:
          'Automatically pairs 2–3 nearby pickups heading along the same avenue into one continuous trip.',
        tajikistanContext:
          'Raises hourly rider income by 30–40% while keeping base delivery fees starting at 10 TJS.',
      },
      {
        num: '04.',
        title: 'Instant Payouts to Alif Mobi & Corti Milli',
        mechanism:
          'Shift earnings update immediately on completion with daily zero-delay withdrawals.',
        tajikistanContext:
          'Clear financial visibility for independent scooter riders and car drivers.',
      },
    ],
    business: [
      {
        num: '01.',
        title: 'POS & Storefront Auto-Dispatch API',
        mechanism:
          'Triggers the nearest e-scooter automatically the moment a kitchen or pharmacy marks an order ready.',
        tajikistanContext:
          'Built for Tajik oshkhona restaurants, coffee shops, pharmacies, and flower boutiques.',
      },
      {
        num: '02.',
        title: 'Multi-Stop Batch Routing (Up to 10 Stops)',
        mechanism:
          'Upload customer spreadsheets to optimize morning deliveries into a single efficient loop.',
        tajikistanContext:
          'Ideal for bottled water, bakery distribution, and e-commerce fulfillment.',
      },
      {
        num: '03.',
        title: 'Corporate Postpaid Billing & Statements',
        mechanism:
          'Centralized corporate wallet with monthly itemized trip logs per branch.',
        tajikistanContext:
          'Trusted by banks, insurance offices, and enterprises in Dushanbe and Khujand.',
      },
      {
        num: '04.',
        title: 'Cargo Insurance & Branded Thermal Boxes',
        mechanism:
          'Assigns verified couriers equipped with rigid thermal boxes and full parcel protection.',
        tajikistanContext:
          'Keeps traditional plov, sambusa, and hot beverages piping hot to outer districts.',
      },
    ],
  },
  uz: {
    client: [
      {
        num: '01.',
        title: 'Elektr skuter, avtomobil va Labo tanlovi',
        mechanism:
          'Masofa, vazn va ob-havoga qarab buyurtma berishdan oldin somoniyda (TJS) aniq narx hisoblanadi.',
        tajikistanContext:
          'Elektr skuter Dushanbe markazidagi tirbandlikni 12–18 daqiqada aylanib oʻtadi, konditsionerli avto esa +45 °C issiqda tort, gul va texnikani asraydi.',
      },
      {
        num: '02.',
        title: 'Moʻljal va xarita nuqtasi orqali qidiruv',
        mechanism:
          '«Moʻljal» maydoni va Telegram/WhatsApp orqali oluvchiga xarita havolasini yuborish imkoniyati.',
        tajikistanContext:
          'Tojikiston mahallalari va yangi uylarida aniq uy raqami boʻlmagan manzillarni oson topishga yordam beradi.',
      },
      {
        num: '03.',
        title: 'Alif Mobi, Dushanbe City va tovarni sotib olish',
        mechanism:
          'Mahalliy hamyonlar, Korti Milli yoki naqd pul bilan toʻlash hamda «Olishda toʻlov (vikup)» xizmati.',
        tajikistanContext:
          'Instagram doʻkonlari va Korvon bozori sotuvchilari uchun juda qulay: kuryer pulni xaridordan olib oʻtkazadi.',
      },
      {
        num: '04.',
        title: 'PIN-kod va majburiy foto-hisobot',
        mechanism:
          'Kuryer A nuqtada yukni suratga oladi va oluvchining 4 xonali SMS PIN-kodisiz buyurtmani yopa olmaydi.',
        tajikistanContext:
          'Qogʻoz hujjatlar oʻrnini bosadi va qimmatbaho buyumlar hamda hujjatlar xavfsizligini taʼminlaydi.',
      },
    ],
    courier: [
      {
        num: '01.',
        title: 'Talab xaritasi va yuqori koeffitsiyentlar',
        mechanism:
          '«Kuryer Pro» ilovasida tushlik va tigʻiz soatlarda ×1.2 – ×1.5 koeffitsiyentli hududlar koʻrsatiladi.',
        tajikistanContext:
          'Asosiy nuqtalar — TSUM, Sadbarg, Siyoma Moll, 82-mikrorayon va Xoʻjanddagi Panjshanbe bozori.',
      },
      {
        num: '02.',
        title: 'Elektr skuter batareya almashtirish shoxobchalari',
        mechanism:
          'Navigator qolgan zaryad va yaqin atrofdagi tezkor batareya almashtirish nuqtalarini koʻrsatadi.',
        tajikistanContext:
          'Kuryerning 4 soat quvvat kutmasdan toʻliq smenada ishlashini taʼminlaydi.',
      },
      {
        num: '03.',
        title: 'Yoʻl-yoʻlakay 2–3 buyurtmani birlashtirish',
        mechanism:
          'Algoritm bir yoʻnalishdagi joʻnatmalarni bitta marshrutga (A1 → A2 → B1 → B2) birlashtiradi.',
        tajikistanContext:
          'Kuryer daromadini soatiga 30–40% oshiradi va mijoz uchun narxni 10 somoniydan saqlab qoladi.',
      },
      {
        num: '04.',
        title: 'Alif Mobi va Korti Milliga tezkor yechib olish',
        mechanism:
          'Buyurtma yopilishi bilan balans yangilanadi va har kuni kartaga chiqarish mumkin.',
        tajikistanContext:
          'Oy oxirini kutmasdan shaffof daromad olish imkoniyati.',
      },
    ],
    business: [
      {
        num: '01.',
        title: 'Oshxona, kafe va dorixonalar uchun API',
        mechanism:
          'Buyurtma tayyor boʻlishi bilan POS tizimidan eng yaqin skuterni avtomatik chaqirish.',
        tajikistanContext:
          'Oshxonalar, qahvaxonalar, dorixonalar va gul doʻkonlari uchun juda mos.',
      },
      {
        num: '02.',
        title: 'Koʻp nuqtali yetkazib berish (10 tagacha manzil)',
        mechanism:
          'Excel roʻyxatini yuklash va bir reysda eng qisqa aylanma yoʻnalishni tuzish.',
        tajikistanContext:
          'Ichimlik suvi, nonvoyxona va internet-doʻkon buyurtmalarini bitta mashinada tarqatish uchun.',
      },
      {
        num: '03.',
        title: 'Korporativ hisob va oylik hisobotlar',
        mechanism:
          'Yuridik shaxslar uchun filiallar kesimida batafsil reestrli yagona balans.',
        tajikistanContext:
          'Dushanbe va Xoʻjanddagi banklar hamda ofislar oʻrtasida hujjat almashish uchun qulay.',
      },
      {
        num: '04.',
        title: 'Yuk sugʻurtasi va brendli termoqutilar',
        mechanism:
          'Qattiq termoxaltali ishonchli kuryerlar va yuk qiymatini sugʻurtalash.',
        tajikistanContext:
          'Palov, somsa va issiq taomlarni chekka mahallalarga ham issiq holda yetkazadi.',
      },
    ],
  },
};

export const FeatureArchitecture: React.FC<FeatureArchitectureProps> = ({ lang }) => {
  const s = STRINGS[lang];
  const [activeTab, setActiveTab] = useState<RoleTab>('client');
  const [dailyOrders, setDailyOrders] = useState<number>(35);
  const [scooterShare, setScooterShare] = useState<number>(75);

  const avgScooterCost = 15;
  const avgCarCost = 28;
  const scooterOrders = Math.round((dailyOrders * scooterShare) / 100);
  const carOrders = dailyOrders - scooterOrders;
  const dailyBudget = scooterOrders * avgScooterCost + carOrders * avgCarCost;
  const allCarBudget = dailyOrders * avgCarCost;
  const monthlySavings = (allCarBudget - dailyBudget) * 30;

  return (
    <div className="flex flex-col gap-16">
      {/* Section 1: Complete Feature Breakdown */}
      <section id="features" className="scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9D6CB] pb-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#0B6E4F] mb-2">{s.featuresKicker}</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#15201B] text-balance">
              {s.featuresTitle}
            </h2>
          </div>

          <div className="inline-flex p-1 bg-[#EAE6DA] rounded-xl self-start">
            <button
              type="button"
              onClick={() => setActiveTab('client')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'client'
                  ? 'bg-white text-[#15201B]'
                  : 'text-[#5A655F] hover:text-[#15201B]'
              }`}
            >
              {s.tabClients}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('courier')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'courier'
                  ? 'bg-white text-[#15201B]'
                  : 'text-[#5A655F] hover:text-[#15201B]'
              }`}
            >
              {s.tabCouriers}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('business')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'business'
                  ? 'bg-white text-[#15201B]'
                  : 'text-[#5A655F] hover:text-[#15201B]'
              }`}
            >
              {s.tabBusiness}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {FEATURE_BLOCKS[lang][activeTab].map((item) => (
            <article
              key={item.num + item.title}
              className="bg-white border border-[#D9D6CB] rounded-2xl p-6 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="text-xs font-mono font-semibold text-[#0B6E4F] mb-2">
                  {item.num}
                </div>
                <h3 className="text-lg font-bold text-[#15201B] leading-snug">{item.title}</h3>
                <p className="text-sm text-[#3E4843] leading-relaxed mt-2">{item.mechanism}</p>
              </div>
              <div className="pt-4 border-t border-[#E6E4DA] text-xs text-[#5A655F] leading-relaxed">
                <span className="font-semibold text-[#15201B]">{s.realitiesPrefix} </span>
                {item.tajikistanContext}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 2: Fleet & Tariff Comparison Matrix */}
      <section id="tariffs" className="scroll-mt-24">
        <div className="max-w-2xl mb-6">
          <p className="text-xs font-semibold text-[#0B6E4F] mb-2">{s.tariffsKicker}</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#15201B] text-balance">
            {s.tariffsTitle}
          </h2>
        </div>

        <div className="bg-white border border-[#D9D6CB] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D9D6CB] bg-[#FAF9F5] text-xs font-semibold text-[#5A655F]">
                  <th className="py-3.5 px-5">{s.thTransport}</th>
                  <th className="py-3.5 px-5">{s.thCapacity}</th>
                  <th className="py-3.5 px-5 text-right">{s.thBase}</th>
                  <th className="py-3.5 px-5 text-right">{s.thPerKm}</th>
                  <th className="py-3.5 px-5 text-right">{s.thEta}</th>
                  <th className="py-3.5 px-5">{s.thUseCase}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E4DA] text-sm">
                {(['scooter', 'car', 'cargo'] as TariffId[]).map((id) => {
                  const t = TARIFFS[id];
                  return (
                    <tr key={id} className="hover:bg-[#FAF9F5] transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <VehicleArtwork type={id} className="w-14 h-9 shrink-0" />
                          <div>
                            <div className="font-bold text-[#15201B]">{t.names[lang]}</div>
                            <div className="text-xs text-[#5A655F]">{t.subtitles[lang]}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-xs text-[#15201B] font-mono tabular-nums whitespace-nowrap">
                        {s.upTo} {t.maxWeightKg} {s.kgShort} · {t.dimensionsCm}
                      </td>
                      <td className="py-4 px-5 text-right font-mono font-bold text-[#15201B] tabular-nums whitespace-nowrap">
                        {t.basePriceTjs} {s.currency}
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-[#15201B] tabular-nums whitespace-nowrap">
                        +{t.perKmTjs.toFixed(1)} {s.currency}
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-[#5A655F] tabular-nums whitespace-nowrap">
                        ~{t.avgEtaMin} {s.minShort}
                      </td>
                      <td className="py-4 px-5 text-xs text-[#5A655F] max-w-xs">
                        {t.fleetNotes[lang]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Business Fleet Savings Calculator */}
      <section
        id="business"
        className="scroll-mt-24 bg-[#0F241C] text-white rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div className="lg:col-span-6 space-y-4">
          <p className="text-xs font-semibold text-[#F0A830]">{s.bizKicker}</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
            {s.bizTitle}
          </h2>
          <p className="text-sm text-[#B8CEC4] leading-relaxed">{s.bizDesc}</p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#B8CEC4]">{s.bizOrdersLabel}</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {dailyOrders} {s.bizOrdersUnit}
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={dailyOrders}
                onChange={(e) => setDailyOrders(Number(e.target.value))}
                className="w-full accent-[#F0A830] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#B8CEC4]">{s.bizShareLabel}</span>
                <span className="font-mono font-bold text-[#F0A830] tabular-nums">
                  {scooterShare}% / {100 - scooterShare}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={scooterShare}
                onChange={(e) => setScooterShare(Number(e.target.value))}
                className="w-full accent-[#F0A830] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#17352A] border border-[#2B5243]">
            <div className="text-xs text-[#B8CEC4]">{s.bizDailySplit}</div>
            <div className="text-xl font-extrabold font-mono tabular-nums text-white mt-2">
              {scooterOrders} / {carOrders}
            </div>
            <div className="text-xs text-[#B8CEC4] mt-1">
              {s.bizAvgCheck} {Math.round(dailyBudget / dailyOrders)} {s.currency}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#17352A] border border-[#2B5243]">
            <div className="text-xs text-[#B8CEC4]">{s.bizDailyBudget}</div>
            <div className="text-xl font-extrabold font-mono tabular-nums text-white mt-2">
              {dailyBudget.toLocaleString('ru-RU')} {s.currency}
            </div>
            <div className="text-xs text-[#B8CEC4] mt-1">
              {s.bizAllCarNote} {allCarBudget.toLocaleString('ru-RU')} {s.currency}
            </div>
          </div>

          <div className="sm:col-span-2 p-5 rounded-xl bg-[#F0A830] text-[#15201B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold">{s.bizMonthlySavings}</div>
              <div className="text-3xl font-extrabold font-mono tabular-nums mt-1">
                {monthlySavings.toLocaleString('ru-RU')} {s.currency}
              </div>
            </div>
            <a
              href="#dispatch"
              className="px-4 py-2.5 bg-[#0F241C] text-white text-xs font-bold rounded-xl whitespace-nowrap shrink-0 self-start sm:self-center"
            >
              {s.bizTestBtn}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
