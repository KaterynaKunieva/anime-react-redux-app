import axios from 'misc/requests';
import config from "../../config";
import {
    REQUEST_ANIME_LIST,
    SUCCESS_ANIME_LIST,
    ERROR_ANIME_LIST,
    REQUEST_DELETE_ANIME,
    SUCCESS_DELETE_ANIME,
    ERROR_DELETE_ANIME,
    CLEAR_DELETE_ERROR,
    REQUEST_ANIME_DETAILS,
    SUCCESS_ANIME_DETAILS,
    ERROR_ANIME_DETAILS,
    REQUEST_SAVE_ANIME,
    SUCCESS_SAVE_ANIME,
    ERROR_SAVE_ANIME,
    CLEAR_SAVE_ERROR,
} from '../constants/actionTypes';
import animeAPI from '../mocks/animeAPI';

const requestAnimeList = () => ({
    type: REQUEST_ANIME_LIST,
});

const receiveAnimeList = ({ list, totalPages }) => ({
    type: SUCCESS_ANIME_LIST,
    payload: {
        list,
        totalPages,
    },
});

const errorAnimeList = (error) => ({
    type: ERROR_ANIME_LIST,
    payload: error,
});

const requestDeleteAnime = () => ({
    type: REQUEST_DELETE_ANIME,
});

const successDeleteAnime = (id) => ({
    type: SUCCESS_DELETE_ANIME,
    payload: id,
});

const errorDeleteAnime = (error) => ({
    type: ERROR_DELETE_ANIME,
    payload: error,
});

const clearDeleteError = () => ({
    type: CLEAR_DELETE_ERROR,
})

const requestAnimeDetails = () => ({
    type: REQUEST_ANIME_DETAILS,
});

const receiveAnimeDetails = (data) => ({
    type: SUCCESS_ANIME_DETAILS,
    payload: data,
});

const errorAnimeDetails = (error) => ({
    type: ERROR_ANIME_DETAILS,
    payload: error,
});

const requestSaveAnime = () => ({
    type: REQUEST_SAVE_ANIME,
});

const successSaveAnime = (data) => ({
    type: SUCCESS_SAVE_ANIME,
    payload: data,
});

const errorSaveAnime = (error) => ({
    type: ERROR_SAVE_ANIME,
    payload: error,
});

const clearSaveError = () => ({
    type: CLEAR_SAVE_ERROR,
})

const getAnimeList = (filters = {}, pagination = {}) => {
    const {
        ANIME_SERVICE,
    } = config;

    return axios.post(
        `${ANIME_SERVICE}/_list`, {
        filters,
        ...pagination,
    }, {
        timeout: 10000,
    }
    );
};

const deleteAnime = (id) => {
    const {
        ANIME_SERVICE,
    } = config;

    return axios.delete(
        `${ANIME_SERVICE}/${id}`,
        {
            timeout: 10000,
        }
    );
};

const getAnimeDetails = (id) => {
    const {
        ANIME_SERVICE,
    } = config;

    return axios.get(
        `${ANIME_SERVICE}/${id}`,
        {
            timeout: 10000,
        }
    );
};

const createAnime = (data) => {
    const {
        ANIME_SERVICE,
    } = config;

    return axios.post(
        `${ANIME_SERVICE}`,
        data,
        {
            timeout: 10000,
        }
    );
};

const updateAnime = (id, data) => {
    const {
        ANIME_SERVICE,
    } = config;

    return axios.put(
        `${ANIME_SERVICE}/${id}`,
        data,
        {
            timeout: 10000,
        }
    );
};

const fetchAnimeList = ({ filters, pagination } = {}) => (dispatch) => {
    dispatch(requestAnimeList());
    return getAnimeList(filters, pagination)
        .catch(() => {
            try {
                return animeAPI.getPaginatedAnime({ filters, pagination });
            } catch (err) {
                return Promise.reject(err);
            }
        }).then((paginatedAnime) => {
            dispatch(receiveAnimeList(paginatedAnime));
        }).catch((err) => {
            dispatch(errorAnimeList(err));
        });
};

const fetchDeleteAnime = (id) => (dispatch) => {
    dispatch(requestDeleteAnime(id));
    return deleteAnime(id)
        .catch(() => {
            try {
                animeAPI.deleteAnime(id);
            } catch (err) {
                return Promise.reject(err);
            }
        })
        .then(() => {
            dispatch(successDeleteAnime(id));
        })
        .catch((err) => {
            dispatch(errorDeleteAnime(err));
        });
};

const fetchAnimeDetails = (id) => (dispatch) => {
    dispatch(requestAnimeDetails());
    return getAnimeDetails(id)
        .catch(() => {
            try {
                return animeAPI.getAnime(id);
            } catch (err) {
                return Promise.reject(err);
            }
        }).then((data) => {
            dispatch(receiveAnimeDetails(data));
        }).catch((err) => {
            dispatch(errorAnimeDetails(err));
        });
};

const fetchAnimeUpdate = (id, data) => (dispatch) => {
    dispatch(requestSaveAnime());
    return updateAnime(id, data)
        .catch(() => {
            try {
                let updated = animeAPI.updateAnime(id, data);
                return updated;
            } catch (err) {
                return Promise.reject(err);
            }
        }).then((updated) => {
            dispatch(successSaveAnime(updated));
            return { success: true };
        }).catch((err) => {
            dispatch(errorSaveAnime(err));
            return { success: false, error: err };
        });
};

const fetchAnimeCreate = (data) => (dispatch) => {
    dispatch(requestSaveAnime());
    return createAnime(data)
        .catch(() => {
            try {
                return animeAPI.createAnime(data);
            } catch (err) {
                return Promise.reject(err);
            }
        }).then((id) => {
            dispatch(successSaveAnime({ ...data, id }));
            return { success: true };
        }).catch((err) => {
            dispatch(errorSaveAnime(err));
            return { success: false, error: err };
        });
};

const exportFunctions = {
    fetchAnimeList,
    fetchDeleteAnime,
    fetchAnimeDetails,
    fetchAnimeUpdate,
    fetchAnimeCreate,
    clearDeleteError,
    clearSaveError,
};

export default exportFunctions;