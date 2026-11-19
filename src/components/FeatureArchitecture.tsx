import React, { useState } from 'react';
import { TARIFFS } from '../data/tajikistanData';
import { TariffId } from '../types/delivery';
import { VehicleArtwork } from './VehicleArtwork';

type RoleTab = 'client' | 'courier' | 'business';

const FEATURE_BLOCKS: Record<
  RoleTab,
  Array<{
    num: string;
    title: string;
    mechanism: string;
    tajikistanContext: string;
  }>
> = {
  client: [
    {
      num: '01.',
      title: 'Выбор между электроскутером, авто и Лабо',
      mechanism:
        'Автоматический расчёт тарифа по расстоянию, весу и погоде в сомони (TJS) до нажатия кнопки заказа.',
      tajikistanContext:
        'Электроскутер объезжает пробки на пр. Рудаки и ул. Айни за 12–18 мин, а авто с кондиционером бережёт торты, цветы и электронику в летнюю жару +45 °C.',
    },
    {
      num: '02.',
      title: 'Поиск по ориентирам и «точке на карте»',
      mechanism:
        'Поле ориентира и быстрая отправка ссылки-трекера получателю, чтобы он сам поставил пин в Telegram или WhatsApp.',
      tajikistanContext:
        'Решает главную проблему махаллей и новых жилых кварталов, где у новостроек или частного сектора ещё нет точных номеров домов.',
    },
    {
      num: '03.',
      title: 'Локальные кошельки и наложенный платёж',
      mechanism:
        'Мгновенная оплата через Alif Mobi, Dushanbe City, Корти Милли или наличными, плюс опция «Выкуп товара».',
      tajikistanContext:
        'Критично для Instagram-магазинов и продавцов на Корвоне: курьер забирает оплату у покупателя при вручении и переводит её продавцу.',
    },
    {
      num: '04.',
      title: 'ПИН-код вручения и фотоотчёт посылки',
      mechanism:
        'Курьер фотографирует груз в точке А и не может закрыть заказ в системе без ввода 4-значного SMS ПИН-кода получателя.',
      tajikistanContext:
        'Заменяет бумажные накладные, защищает дорогие заказы (телефоны, документы, лекарства) и исключает споры о сохранности.',
    },
  ],
  courier: [
    {
      num: '01.',
      title: 'Тепловая карта спроса и коэффициенты',
      mechanism:
        'В интерфейсе «Курьер Pro» подсвечиваются зоны с повышенным числом заказов (×1.2 – ×1.5 в обед и час пик).',
      tajikistanContext:
        'Основные горячие точки — ЦУМ, Садбарг, Сиёма Молл, 82-й мкр, рынок Панчшанбе в Худжанде.',
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
      title: 'Моментальный вывод на карту и кошелёк',
      mechanism:
        'Баланс обновляется сразу после закрытия заказа; вывод средств на Alif Mobi или Корти Милли доступен каждый день.',
      tajikistanContext:
        'Прозрачная мотивация без ожидания конца месяца, плюс удержание налога/комиссии в личном кабинете.',
    },
  ],
  business: [
    {
      num: '01.',
      title: 'API и виджет для кафе, аптек и магазинов',
      mechanism:
        'Автоматический вызов ближайшего скутера в момент готовности заказа в POS-системе или на сайте.',
      tajikistanContext:
        'Подходит для сетей общепита (ошхона, фастфуд, кофейни), аптек «Дорухона» и цветочных студий.',
    },
    {
      num: '02.',
      title: 'Мультиточечный развоз (до 10 адресов)',
      mechanism:
        'Загрузка списка клиентов из Excel или 1С с автоматическим построением оптимального порядка объезда.',
      tajikistanContext:
        'Один автомобиль развозит утренние заказы бутилированной воды, выпечки или посылок маркетплейса за один рейс.',
    },
    {
      num: '03.',
      title: 'Закрывающие документы и корпоративный счёт',
      mechanism:
        'Единый постоплатный баланс для юрлиц с ежемесячным реестром поездок и детализацией по каждому филиалу.',
      tajikistanContext:
        'Удобно для банков, страховых компаний и офисов в Душанбе и Худжанде при пересылке оригиналов договоров.',
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
};

export const FeatureArchitecture: React.FC = () => {
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DEDCD4] pb-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#5C5C58] mb-2">
              Архитектура сервиса · Адаптация под Таджикистан
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141413] text-balance">
              Какие функции нужны в приложении доставки формата Яндекс Доставки
            </h2>
          </div>

          <div className="inline-flex p-1 bg-[#EAE8E1] rounded-xl self-start">
            <button
              type="button"
              onClick={() => setActiveTab('client')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'client'
                  ? 'bg-white text-[#141413]'
                  : 'text-[#5C5C58] hover:text-[#141413]'
              }`}
            >
              Для клиентов
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('courier')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'courier'
                  ? 'bg-white text-[#141413]'
                  : 'text-[#5C5C58] hover:text-[#141413]'
              }`}
            >
              Для курьеров
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('business')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'business'
                  ? 'bg-white text-[#141413]'
                  : 'text-[#5C5C58] hover:text-[#141413]'
              }`}
            >
              Для бизнеса
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {FEATURE_BLOCKS[activeTab].map((item) => (
            <article
              key={item.num + item.title}
              className="bg-white border border-[#DEDCD4] rounded-2xl p-6 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="text-xs font-mono font-semibold text-[#5C5C58] mb-2">
                  {item.num}
                </div>
                <h3 className="text-lg font-bold text-[#141413] leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-[#42423F] leading-relaxed mt-2">
                  {item.mechanism}
                </p>
              </div>
              <div className="pt-4 border-t border-[#ECEAE3] text-xs text-[#5C5C58] leading-relaxed">
                <span className="font-semibold text-[#141413]">Реалии Таджикистана: </span>
                {item.tajikistanContext}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 2: Fleet & Tariff Comparison Matrix */}
      <section id="tariffs" className="scroll-mt-24">
        <div className="max-w-2xl mb-6">
          <p className="text-xs font-semibold text-[#5C5C58] mb-2">
            Тарифная сетка · Душанбе и регионы
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141413] text-balance">
            Сравнение электроскутера, легкового авто и грузового Лабо
          </h2>
        </div>

        <div className="bg-white border border-[#DEDCD4] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DEDCD4] bg-[#FAF9F6] text-xs font-semibold text-[#5C5C58]">
                  <th className="py-3.5 px-5">Транспорт</th>
                  <th className="py-3.5 px-5">Макс. вес и короб</th>
                  <th className="py-3.5 px-5 text-right">База (подача)</th>
                  <th className="py-3.5 px-5 text-right">За 1 км</th>
                  <th className="py-3.5 px-5 text-right">Среднее время</th>
                  <th className="py-3.5 px-5">Когда выбирать</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECEAE3] text-sm">
                {(['scooter', 'car', 'cargo'] as TariffId[]).map((id) => {
                  const t = TARIFFS[id];
                  return (
                    <tr key={id} className="hover:bg-[#FAF9F6] transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <VehicleArtwork type={id} className="w-14 h-9 shrink-0" />
                          <div>
                            <div className="font-bold text-[#141413]">{t.nameRu}</div>
                            <div className="text-xs text-[#5C5C58]">{t.subtitleRu}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-xs text-[#141413] font-mono tabular-nums whitespace-nowrap">
                        до {t.maxWeightKg} кг · {t.dimensionsCm}
                      </td>
                      <td className="py-4 px-5 text-right font-mono font-bold text-[#141413] tabular-nums whitespace-nowrap">
                        {t.basePriceTjs} сом.
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-[#141413] tabular-nums whitespace-nowrap">
                        +{t.perKmTjs.toFixed(1)} сом.
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-[#5C5C58] tabular-nums whitespace-nowrap">
                        ~{t.avgEtaMin} мин
                      </td>
                      <td className="py-4 px-5 text-xs text-[#5C5C58] max-w-xs">
                        {t.fleetNoteRu}
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
        className="scroll-mt-24 bg-[#141413] text-white rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div className="lg:col-span-6 space-y-4">
          <p className="text-xs font-semibold text-[#FFCC00]">
            Для магазинов, кафе и ресторанов
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
            Экономика гибридного парка: электроскутер + авто
          </h2>
          <p className="text-sm text-[#C7C5BD] leading-relaxed">
            Перенос городских посылок до 15 кг с обычных автомобилей на электроскутеры
            снижает стоимость каждой доставки почти вдвое и сокращает время ожидания клиента
            в центре Душанбе и Худжанда.
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#C7C5BD]">Заказов в день от вашего бизнеса</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {dailyOrders} заказов
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={dailyOrders}
                onChange={(e) => setDailyOrders(Number(e.target.value))}
                className="w-full accent-[#FFCC00] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#C7C5BD]">Доля доставок на электроскутерах</span>
                <span className="font-mono font-bold text-[#FFCC00] tabular-nums">
                  {scooterShare}% скутер / {100 - scooterShare}% авто
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={scooterShare}
                onChange={(e) => setScooterShare(Number(e.target.value))}
                className="w-full accent-[#FFCC00] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#1F1F1D] border border-[#32322F]">
            <div className="text-xs text-[#B5B3AB]">Распределение рейсов в день</div>
            <div className="text-xl font-extrabold font-mono tabular-nums text-white mt-2">
              {scooterOrders} скутер · {carOrders} авто
            </div>
            <div className="text-xs text-[#B5B3AB] mt-1">
              Средний чек по городу: {Math.round(dailyBudget / dailyOrders)} сом.
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#1F1F1D] border border-[#32322F]">
            <div className="text-xs text-[#B5B3AB]">Суточный бюджет логистики</div>
            <div className="text-xl font-extrabold font-mono tabular-nums text-white mt-2">
              {dailyBudget.toLocaleString('ru-RU')} сом./день
            </div>
            <div className="text-xs text-[#B5B3AB] mt-1">
              Вместо {allCarBudget.toLocaleString('ru-RU')} сом. только на авто
            </div>
          </div>

          <div className="sm:col-span-2 p-5 rounded-xl bg-[#FFCC00] text-[#141413] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold">Экономия за 30 дней с электроскутерами</div>
              <div className="text-3xl font-extrabold font-mono tabular-nums mt-1">
                {monthlySavings.toLocaleString('ru-RU')} сом.
              </div>
            </div>
            <a
              href="#dispatch"
              className="px-4 py-2.5 bg-[#141413] text-white text-xs font-bold rounded-xl whitespace-nowrap shrink-0 self-start sm:self-center"
            >
              Протестировать тариф
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
