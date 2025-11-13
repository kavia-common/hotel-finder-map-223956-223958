import { http, HttpResponse } from 'msw';

// generate deterministic mock hotels around a center
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function createHotel(id, center) {
  const rnd = (n) => seededRandom(id * (n + 1));
  const stars = 3 + Math.floor(rnd(2) * 3);
  const price = 60 + Math.floor(rnd(3) * 240);
  const amenitiesPool = ['wifi', 'parking', 'gym', 'spa', 'breakfast', 'pet-friendly'];
  const selectedAmenities = amenitiesPool.filter((_, idx) => rnd(idx + 10) > 0.5);
  const lat = center.lat + (rnd(5) - 0.5) * 0.2;
  const lng = center.lng + (rnd(6) - 0.5) * 0.2;
  const distanceKm = Math.round(Math.hypot(lat - center.lat, lng - center.lng) * 111 * 10) / 10;
  return {
    id: String(id),
    name: `Ocean View Hotel ${id}`,
    rating: stars,
    price,
    amenities: selectedAmenities,
    distanceKm,
    imageUrl: `https://picsum.photos/seed/hotel-${id}/240/160`,
    location: { lat, lng },
  };
}

function filterAndSort(list, query) {
  const {
    q,
    stars,
    amenities,
    priceMin,
    priceMax,
    sort = 'recommended',
    radiusKm,
  } = query;

  let out = list.slice();

  if (q) {
    const ql = String(q).toLowerCase();
    out = out.filter(h => h.name.toLowerCase().includes(ql));
  }
  if (stars) {
    const sSet = new Set(String(stars).split(',').map(s => Number(s)));
    out = out.filter(h => sSet.has(Number(h.rating)));
  }
  if (amenities) {
    const aSet = new Set(String(amenities).split(','));
    out = out.filter(h => Array.from(aSet).every(a => h.amenities.includes(a)));
  }
  if (priceMin != null || priceMax != null) {
    const min = Number(priceMin ?? 0);
    const max = Number(priceMax ?? Infinity);
    out = out.filter(h => h.price >= min && h.price <= max);
  }
  if (radiusKm != null) {
    const r = Number(radiusKm);
    out = out.filter(h => h.distanceKm <= r);
  }

  if (sort === 'price_asc') out.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') out.sort((a, b) => b.price - a.price);
  else if (sort === 'rating_desc') out.sort((a, b) => b.rating - a.rating);
  else out.sort((a, b) => a.distanceKm - b.distanceKm);

  return out;
}

export const handlers = [
  http.get('/hotels', ({ request }) => {
    const url = new URL(request.url);
    const q = Object.fromEntries(url.searchParams.entries());

    // Bounds center
    const north = Number(q.north ?? 0);
    const south = Number(q.south ?? 0);
    const east = Number(q.east ?? 0);
    const west = Number(q.west ?? 0);

    const center = {
      lat: (isNaN(north) || isNaN(south)) ? 37.7749 : (north + south) / 2 || 37.7749,
      lng: (isNaN(east) || isNaN(west)) ? -122.4194 : (east + west) / 2 || -122.4194,
    };

    // Create a pool of 60 hotels around center
    const all = Array.from({ length: 60 }, (_, i) => createHotel(i + 1, center));
    const filtered = filterAndSort(all, q);

    const page = Number(q.page ?? 1);
    const pageSize = Number(q.pageSize ?? 10);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageItems = filtered.slice(start, end);

    return HttpResponse.json({
      data: pageItems,
      total: filtered.length,
      page,
      pageSize,
    });
  }),
];
