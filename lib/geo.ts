// Auto-location: browser geolocation + reverse geocoding.
// Uses the Google Maps Geocoding API when NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set,
// with an OpenStreetMap (Nominatim) fallback so the feature works keyless.

export interface GeoPlace {
  lat: number;
  lng: number;
  /** Short locality name (e.g. "Seattle") — matches provider location filtering. */
  city: string;
  /** Full reverse-geocoded address for display / Google Maps. */
  label: string;
}

const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, (err) => reject(new Error(err.message)), {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 600_000,
    });
  });
}

async function fromGoogle(lat: number, lng: number): Promise<GeoPlace | null> {
  if (!GOOGLE_KEY) return null;
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_KEY}`
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      results?: {
        formatted_address?: string;
        address_components?: { long_name: string; types: string[] }[];
      }[];
    };
    const r = data.results?.[0];
    if (!r) return null;
    const pick = (...types: string[]) =>
      r.address_components?.find((c) => c.types.some((t) => types.includes(t)))?.long_name;
    const city =
      pick("locality", "postal_town", "administrative_area_level_3", "administrative_area_level_2") ??
      r.formatted_address ??
      `${lat.toFixed(3)}, ${lng.toFixed(3)}`;
    return { lat, lng, city, label: r.formatted_address ?? city };
  } catch {
    return null;
  }
}

async function fromOpenStreetMap(lat: number, lng: number): Promise<GeoPlace | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&lat=${lat}&lon=${lng}`,
      { headers: { Accept: "application/json" } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      display_name?: string;
      address?: Record<string, string | undefined>;
    };
    const a = data.address ?? {};
    const city =
      a.city ||
      a.town ||
      a.village ||
      a.municipality ||
      a.county ||
      a.state ||
      data.display_name?.split(",")[0]?.trim() ||
      `${lat.toFixed(3)}, ${lng.toFixed(3)}`;
    return { lat, lng, city, label: data.display_name ?? city };
  } catch {
    return null;
  }
}

/** Detect the user's location: geolocation → reverse geocode (Google, then OSM). */
export async function detectLocation(): Promise<GeoPlace> {
  const pos = await getPosition();
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const place = (await fromGoogle(lat, lng)) ?? (await fromOpenStreetMap(lat, lng));
  return (
    place ?? {
      lat,
      lng,
      city: `${lat.toFixed(3)}, ${lng.toFixed(3)}`,
      label: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    }
  );
}
