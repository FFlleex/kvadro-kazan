import { apartments, formatPrice, imagePath } from './apartments.js';

const filters = document.querySelector('#filters');
const fields = ['district', 'rooms', 'price'].map((name) => filters.elements.namedItem(name));
const listings = document.querySelector('#listings');
const initial = new URLSearchParams(location.search);

for (const field of fields) {
  const value = initial.get(field.name);
  if (Array.from(field.options).some((option) => option.value === value)) field.value = value;
}

function createCard(apartment, search) {
  const card = document.createElement('article');
  card.className = 'listing';
  const link = document.createElement('a');
  const query = new URLSearchParams(search);
  query.set('id', apartment.id);
  link.href = `apartment.html?${query}`;

  const photo = document.createElement('img');
  photo.src = imagePath(apartment.photos[0]);
  photo.alt = apartment.photos[0].alt;
  photo.width = 768;
  photo.height = 512;
  photo.loading = 'lazy';

  const meta = document.createElement('p');
  meta.className = 'eyebrow';
  meta.textContent = `${apartment.district} район · ${apartment.area} м²`;

  const title = document.createElement('h3');
  title.textContent = apartment.title;

  const rent = document.createElement('p');
  rent.className = 'rent';
  rent.textContent = `${formatPrice(apartment.price)} / мес.`;
  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  rent.append(arrow);

  link.append(photo, meta, title, rent);
  card.append(link);
  return card;
}

function render() {
  const search = new URLSearchParams();
  for (const field of fields) {
    if (field.value) search.set(field.name, field.value);
  }
  const [district, rooms, price] = fields.map((field) => field.value);
  const matches = apartments.filter((apartment) =>
    (!district || apartment.district === district) &&
    (!rooms || apartment.rooms === Number(rooms)) &&
    (!price || apartment.price <= Number(price))
  );
  const url = new URL(location.href);
  url.search = search.toString();
  history.replaceState(null, '', url);
  listings.replaceChildren(...matches.map((apartment) => createCard(apartment, search)));
  document.querySelector('#result-count').textContent = `Вариантов: ${matches.length}`;
  document.querySelector('#empty').hidden = matches.length > 0;
}

filters.addEventListener('change', render);
filters.addEventListener('submit', (event) => {
  event.preventDefault();
  render();
});
filters.addEventListener('reset', () => requestAnimationFrame(render));
render();
