function getImageUrl(name) {
  return new URL(`../imagenes/${name}`, import.meta.url).href;
}

export { getImageUrl };
