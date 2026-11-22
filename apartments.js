const livingRooms = {
  center: { file: 'center', alt: 'Гостиная с панорамными окнами и светлым диваном' },
  riverside: { file: 'riverside', alt: 'Гостиная с оливковыми акцентами и кухней' },
  soviet: { file: 'soviet', alt: 'Спальня со светлым текстилем и прикроватным светильником' },
  studio: { file: 'studio', alt: 'Студия с тёмно-синим диваном и выходом на балкон' }
};

export const apartments = [
  {
    id: 'center', title: 'Двухкомнатная в центре', district: 'Вахитовский',
    rooms: 2, area: 58, floor: '6 из 9', price: 58000,
    description: 'Кухня-гостиная, отдельная спальня и панорамные окна. В прихожей предусмотрено место для сезонных вещей.',
    photos: [livingRooms.center, { file: 'center-detail', alt: 'Деталь гостиной у окна' }]
  },
  {
    id: 'riverside', title: 'Трёхкомнатная у Казанки', district: 'Ново-Савиновский',
    rooms: 3, area: 87, floor: '9 из 16', price: 78000,
    description: 'Просторная кухня-гостиная и две отдельные комнаты. Одна подойдёт под кабинет или детскую.',
    photos: [livingRooms.riverside, { file: 'riverside-detail', alt: 'Деталь кухни-гостиной' }]
  },
  {
    id: 'soviet', title: 'Однокомнатная с отдельной кухней', district: 'Советский',
    rooms: 1, area: 39, floor: '4 из 10', price: 43000,
    description: 'Квартира с отдельной кухней и светлой спальней. Подойдёт тому, кто работает из дома и ценит тишину.',
    photos: [livingRooms.soviet, { file: 'soviet-detail', alt: 'Деталь спальни' }]
  },
  {
    id: 'studio', title: 'Студия с балконом', district: 'Приволжский',
    rooms: 0, area: 29, floor: '7 из 14', price: 36000,
    description: 'Компактная студия с рабочим столом, обеденной зоной и выходом на балкон.',
    photos: [livingRooms.studio, { file: 'studio-detail', alt: 'Деталь жилой зоны студии' }]
  }
];

const currency = new Intl.NumberFormat('ru-RU', {
  style: 'currency', currency: 'RUB', maximumFractionDigits: 0
});

export const formatPrice = (price) => currency.format(price);
export const imagePath = (photo) => `assets/${photo.file}.webp`;
