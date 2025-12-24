import type { Service } from '../../entities/service/model/types';

export const services: Service[] = [
  {
    id: '1',
    title: 'Дополнительный багаж (23 кг)',
    price: 2500,
  },
  {
    id: '2',
    title: 'Страховка от невылета',
    price: 1200,
  },
  {
    id: '3',
    title: 'Выбор места (у окна)',
    price: 800,
  },
  {
    id: '4',
    title: 'Питание на борту (Standard)',
    price: 500,
  },
  {
    id: '5',
    title: 'Fast Track (быстрый досмотр)',
    price: 3500,
  },
  {
    id: '6',
    title: 'Бизнес-зал (3 часа)',
    price: 4500,
  },
  {
    id: '7',
    title: 'Приоритетная посадка',
    price: 1500,
  },
  {
    id: '8',
    title: 'Расширенная страховка (Premium)',
    price: 2800,
  },
  {
    id: '9',
    title: 'Wi-Fi на борту (весь полет)',
    price: 600,
  },
  {
    id: '10',
    title: 'Трансфер из аэропорта',
    price: 5500,
  },
];

export const servicesMap = new Map(services.map((s) => [s.id, s]));
