const getImgUrl = (name: string) => {
  return new URL(`../assets/book/${name}`, import.meta.url);
};

export { getImgUrl };
