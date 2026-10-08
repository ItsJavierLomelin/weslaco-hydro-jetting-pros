export const pageImages = [
  {
    "src": "/images/library/power-spray-1.jpg",
    "alt": "Water jet nozzle spraying inside a drain pipe"
  },
  {
    "src": "/images/library/pipe-blueprint-4.jpg",
    "alt": "Rotating water jets cleaning the inside wall of a pipe"
  },
  {
    "src": "/images/library/sonic-blast-8.jpg",
    "alt": "Illustration of a jet nozzle clearing buildup from a drain line"
  },
  {
    "src": "/images/library/root-macro-action-37.jpg",
    "alt": "Water jets working through tree roots inside a sewer pipe"
  },
  {
    "src": "/images/library/recurring-clogs-clean-sweep-41.jpg",
    "alt": "Jetting hose and nozzle inside a clean drain pipe"
  }
];
export function pageImage(key: string) {
  let hash = 0;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return pageImages[hash % pageImages.length];
}

