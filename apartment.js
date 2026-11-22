import { apartments, formatPrice, imagePath } from './apartments.js';

const query = new URLSearchParams(location.search);
const apartment = apartments.find(({ id }) => id === query.get('id'));
query.delete('id');
document.querySelector('#return-link').href = query.size ? `./?${query}#catalog` : './#catalog';

if (apartment) {
  document.title = `${apartment.title} — КВАДРО`;
  const details = {
    district: `Казань · ${apartment.district} район`,
    title: apartment.title,
    rent: `${formatPrice(apartment.price)} / мес.`,
    area: `${apartment.area} м²`,
    floor: apartment.floor,
    deposit: formatPrice(apartment.price),
    description: apartment.description
  };
  for (const [id, value] of Object.entries(details)) {
    document.getElementById(id).textContent = value;
  }

  const mainImage = document.querySelector('#photo');
  const caption = document.querySelector('#caption');
  const controls = apartment.photos.map((photo, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = String(index + 1);
    button.setAttribute('aria-label', `Фото ${index + 1}: ${photo.alt}`);
    button.addEventListener('click', () => selectPhoto(index));
    return button;
  });

  function selectPhoto(index) {
    const photo = apartment.photos[index];
    mainImage.src = imagePath(photo);
    mainImage.alt = photo.alt;
    caption.textContent = `${index + 1} / ${apartment.photos.length} · ${photo.alt}`;
    controls.forEach((button, buttonIndex) => {
      button.setAttribute('aria-pressed', String(buttonIndex === index));
    });
  }

  document.querySelector('#gallery-controls').append(...controls);
  selectPhoto(0);
  document.querySelector('#apartment').hidden = false;
} else {
  document.querySelector('#missing').hidden = false;
}
