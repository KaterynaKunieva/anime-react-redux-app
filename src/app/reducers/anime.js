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
} from '../constants/actionTypes'

const initialState = {
    list: {
        items: [],
        isFetching: false,
        error: null,
        totalPages: 0,
    },
    isDeleting: false,
    deleteError: null,
    detail: {
        data: null,
        isFetching: false,
        error: null,
        isSaving: false,
        saveError: null,
    },
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_ANIME_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    isFetching: true,
                    error: initialState.list.error,
                },
            };
        case SUCCESS_ANIME_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    items: action.payload.list,
                    isFetching: false,
                    error: initialState.list.error,
                    totalPages: action.payload.totalPages,
                },
            };
        case ERROR_ANIME_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    isFetching: false,
                    error: action.payload,
                },
            };
        case REQUEST_DELETE_ANIME:
            return {
                ...state,
                isDeleting: true,
                deleteError: initialState.deleteError,
            }
        case SUCCESS_DELETE_ANIME:
            return {
                ...state,
                isDeleting: false,
                deleteError: initialState.deleteError,
                list: {
                    ...state.list,
                    items: state.list.items.filter(item => item.id !== action.payload),
                },
            }
        case ERROR_DELETE_ANIME:
            return {
                ...state,
                isDeleting: false,
                deleteError: action.payload,
            }
        case REQUEST_ANIME_DETAILS:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    isFetching: true,
                    error: initialState.detail.error,
                },
            }
        case SUCCESS_ANIME_DETAILS:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    data: action.payload,
                    isFetching: false,
                    error: initialState.detail.error,
                },
            }
        case ERROR_ANIME_DETAILS:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    isFetching: false,
                    error: action.payload,
                },
            }
        case REQUEST_SAVE_ANIME:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    isSaving: true,
                    saveError: initialState.detail.saveError,
                },
            }
        case SUCCESS_SAVE_ANIME:
            const savedAnime = action.payload;
            const isNew = !state.list.items.some(item => item.id === savedAnime.id);
            return {
                ...state,
                detail: {
                    ...state.detail,
                    data: savedAnime,
                    isSaving: false,
                    saveError: initialState.detail.saveError,
                },
                list: {
                    ...state.list,
                    items: isNew
                        ? [savedAnime, ...state.list.items]
                        : state.list.items.map(item => item.id === savedAnime.id ? savedAnime : item),
                    totalPages: isNew
                        ? state.list.totalPages + 1
                        : state.list.totalPages,
                },
            }
        case ERROR_SAVE_ANIME:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    isSaving: false,
                    saveError: action.payload,
                },
            }
        case CLEAR_DELETE_ERROR:
            return {
                ...state,
                deleteError: null,
                isDeleting: false
            };
        case CLEAR_SAVE_ERROR:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    saveError: initialState.detail.saveError,
                }
            };
        default:
            return state;
    }
}