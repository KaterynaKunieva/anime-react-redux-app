const config = {
  // Services
  USERS_SERVICE: process.env.REACT_APP_API_URL || '',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
  ANIME_SERVICE: `${process.env.REACT_APP_API_URL || ''}/api/anime`,
};

export default config;
