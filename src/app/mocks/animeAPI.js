import { generateUUID } from '../../misc/uuid'
import storage, { keys } from '../../misc/storage';
import { MOCK_ANIME_LIST } from "./animeList";
import { API_ERRORS } from "./errors";

export const getAnime = (id) =>
    getActualAnimeList().find(a => a.id === id);

export const getPaginatedAnime = (params = {}) => {
    const { pagination, filters = {} } = params;
    const { page, size } = pagination;
    const filtered = filterAnime(filters);

    const start = page * size;
    const end = start + size;
    const list = filtered.slice(start, end);

    return {
        list,
        totalPages: Math.ceil(filtered.length / size)
    };
}

export const deleteAnime = (id) => {
    let created = parseArrayFromStorage(keys.ANIME_CREATED);
    let updated = parseArrayFromStorage(keys.ANIME_UPDATED);

    const exists = getActualAnimeList().some(a => a.id === id);
    if (!exists) {
        throw new Error(API_ERRORS.NOT_FOUND_ERROR);
    }

    let deleted = parseArrayFromStorage(keys.ANIME_DELETED);
    created = created.filter(a => a.id !== id);
    updated = updated.filter(a => a.id !== id);

    if (!deleted.includes(id)) {
        deleted.push(id);
    }

    storage.setItem(keys.ANIME_CREATED, JSON.stringify(created));
    storage.setItem(keys.ANIME_UPDATED, JSON.stringify(updated));
    storage.setItem(keys.ANIME_DELETED, JSON.stringify(deleted));
};


const isSuchAnimeExists = (anime, excludeId = null) => {
    return getActualAnimeList().some(a => {
        if (excludeId && a.id === excludeId) {
            return false;
        }
        return a.title.trim().toLowerCase() === anime.title.trim().toLowerCase() &&
            parseFloat(a.year) === anime.year &&
            a.author.trim().toLowerCase() === anime.author.trim().toLowerCase()
    });
}

export const createAnime = (data) => {
    const normalized = {
        ...data,
        year: parseInt(data.year),
        score: parseFloat(data.score)
    };

    if (isSuchAnimeExists(normalized)) {
        throw new Error(API_ERRORS.DUPLICATE_ERROR);
    }

    const newAnime = { ...normalized, id: generateUUID() };

    const created = parseArrayFromStorage(keys.ANIME_CREATED);
    created.unshift(newAnime);

    storage.setItem(keys.ANIME_CREATED, JSON.stringify(created));
    return newAnime.id;
};

export const updateAnime = (id, data) => {
    const newAnime = {
        ...data,
        id,
        year: parseInt(data.year),
        score: parseFloat(data.score)
    };

    if (isSuchAnimeExists(newAnime, id)) {
        throw new Error(API_ERRORS.DUPLICATE_ERROR);
    }

    let updated = parseArrayFromStorage(keys.ANIME_UPDATED);
    let created = parseArrayFromStorage(keys.ANIME_CREATED);
    const indexInUpdated = updated.findIndex(a => a.id === id);
    const indexInCreated = created.findIndex(a => a.id === id);
    if (indexInUpdated !== -1) {
        updated[indexInUpdated] = newAnime;
    } else if (indexInCreated !== -1) {
        created = created.filter((_, i) => i !== indexInCreated);
        updated.push(newAnime);
    } else if (MOCK_ANIME_LIST.find(anime => anime.id === id)) {
        updated.push(newAnime);
    } else {
        throw new Error(API_ERRORS.NOT_FOUND_ERROR);
    }
    storage.setItem(keys.ANIME_UPDATED, JSON.stringify(updated));
    storage.setItem(keys.ANIME_CREATED, JSON.stringify(created));
    return newAnime;
};

const parseArrayFromStorage = (key) => {
    return JSON.parse(storage.getItem(key)) || [];
};

const getActualAnimeList = () => {
    const deleted = parseArrayFromStorage(keys.ANIME_DELETED);
    const created = parseArrayFromStorage(keys.ANIME_CREATED);
    const updated = parseArrayFromStorage(keys.ANIME_UPDATED);

    const applyUpdates = (anime) =>
        updated.find(u => u.id === anime.id) || anime;

    const base = MOCK_ANIME_LIST
        .filter(a => !deleted.includes(a.id))
        .map(applyUpdates);

    const createdWithUpdates = created
        .filter(a => !deleted.includes(a.id))
        .map(applyUpdates);

    return [...createdWithUpdates, ...base];
};

const filterAnime = (filters = {}) => {
    return getActualAnimeList().filter(a =>
        (!filters.year || a.year === filters.year) &&
        (!filters.author || a.author.trim().toLowerCase() === filters.author.trim().toLowerCase())
    );
};

const animeAPI = {
    createAnime,
    updateAnime,
    deleteAnime,
    getAnime,
    getPaginatedAnime,
    filterAnime,
};

export default animeAPI;