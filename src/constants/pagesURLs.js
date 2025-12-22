import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.animeList]: `${config.UI_URL_PREFIX}/${pages.animeList}`,
  [pages.animeNew]: `${config.UI_URL_PREFIX}/${pages.animeNew}`,
  [pages.animeDetails]: `${config.UI_URL_PREFIX}/${pages.animeDetails}`,
};

export default result;
