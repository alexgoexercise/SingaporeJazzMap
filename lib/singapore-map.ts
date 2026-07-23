import type { LatLngBoundsExpression, LatLngTuple } from "leaflet";

/** Pan/zoom limits — keeps the viewport on Singapore. */
export const SINGAPORE_MAX_BOUNDS: LatLngBoundsExpression = [
  [1.12, 103.58],
  [1.48, 104.08],
];

export const SINGAPORE_MIN_ZOOM = 11;
export const SINGAPORE_MAX_ZOOM = 18;
export const SINGAPORE_DEFAULT_ZOOM = 12;

/** Simplified Singapore island outline (lat, lng), clockwise. */
export const SINGAPORE_BOUNDARY: LatLngTuple[] = [
  [1.445, 103.709],
  [1.442, 103.679],
  [1.428, 103.651],
  [1.408, 103.634],
  [1.382, 103.622],
  [1.352, 103.618],
  [1.318, 103.622],
  [1.286, 103.634],
  [1.258, 103.652],
  [1.232, 103.678],
  [1.208, 103.712],
  [1.192, 103.748],
  [1.186, 103.786],
  [1.192, 103.824],
  [1.208, 103.862],
  [1.232, 103.896],
  [1.262, 103.922],
  [1.296, 103.942],
  [1.332, 103.958],
  [1.368, 103.968],
  [1.402, 103.978],
  [1.432, 103.988],
  [1.456, 103.992],
  [1.468, 103.978],
  [1.472, 103.952],
  [1.468, 103.922],
  [1.458, 103.892],
  [1.448, 103.862],
  [1.448, 103.828],
  [1.452, 103.792],
  [1.452, 103.756],
  [1.448, 103.728],
];

/** Outer ring covering the world; Singapore boundary is punched out as a hole. */
export const WORLD_MASK_OUTER: LatLngTuple[] = [
  [-90, -180],
  [-90, 180],
  [90, 180],
  [90, -180],
];

export const SINGAPORE_MASK_OPTIONS = {
  fillColor: "#0c1524",
  fillOpacity: 0.93,
  stroke: false,
  interactive: false,
} as const;

export const SINGAPORE_OUTLINE_OPTIONS = {
  fillColor: "transparent",
  color: "#b8954a",
  weight: 1.5,
  opacity: 0.55,
  interactive: false,
} as const;
