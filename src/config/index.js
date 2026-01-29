const config = {
  // Services
  USERS_SERVICE: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
  ANIME_SERVICE: `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/anime`,
};

export default config;
