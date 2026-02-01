const getItem = (key) => {
  return localStorage.getItem(key);
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const keys = {
  ANIME_FILTERS: 'ANIME_FILTERS',
  ANIME_PAGINATION: 'ANIME_PAGINATION',
  ANIME_DELETED: 'ANIME_DELETED',
  ANIME_CREATED: 'ANIME_CREATED',
  ANIME_UPDATED: 'ANIME_UPDATED',
};

const forExport = {
  getItem,
  removeItem,
  setItem,
};

export default forExport;
