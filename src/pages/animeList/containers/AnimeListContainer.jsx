import { useIntl } from "react-intl";
import React, { useCallback, useEffect, useState } from "react";
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import actionsAnime from "../../../app/actions/anime";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import Button from "../../../components/Button";
import AnimeList from "../components/AnimeList";
import AnimeFilterBar from "../components/AnimeFilterBar";
import AnimeConfirmationModal from "../components/AnimeConfirmationModal";
import useTheme from "../../../misc/hooks/useTheme";
import { createUseStyles } from "react-jss";
import useChangePage from "../../../misc/hooks/useChangePage";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import storage, { keys } from "../../../misc/storage";

const getClasses = createUseStyles((theme) => ({
    animeRoot: {
        boxSizing: "border-box",
        width: "600px",
        maxWidth: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    pagination: {
        marginTop: "auto",
    }
}));

const parseJSON = (item, defaultValue) => {
    try {
        return item ? JSON.parse(item) : defaultValue;
    } catch {
        return defaultValue;
    }
};

const AnimeListContainer = ({ showNotification, ...props }) => {
    const { formatMessage } = useIntl();
    const changePage = useChangePage();
    const { theme } = useTheme();
    const classes = getClasses({ theme });

    const dispatch = useDispatch();
    const {
        items,
        isFetching,
        error,
        totalPages,
    } = useSelector(({ anime }) => anime.list);

    const {
        isDeleting,
        deleteError
    } = useSelector(({ anime }) => anime);

    const [state, setState] = useState(() => {
        const savedFilters = parseJSON(storage.getItem(keys.ANIME_FILTERS), { author: "", year: "" });
        const savedPagination = parseJSON(storage.getItem(keys.ANIME_PAGINATION), { page: 0, size: 5 });

        return {
            animeIdToDelete: null,
            pagination: savedPagination,
            filters: savedFilters,
            fetchTrigger: 0
        }
    });

    useEffect(() => {
        storage.setItem(keys.ANIME_FILTERS, JSON.stringify(state.filters));
    }, [state.filters]);

    useEffect(() => {
        storage.setItem(keys.ANIME_PAGINATION, JSON.stringify(state.pagination));
    }, [state.pagination]);

    const handleConfirmDelete = () => {
        dispatch(actionsAnime.fetchDeleteAnime(state.animeIdToDelete))
    };

    const usePrevious = (value) => {
        const ref = React.useRef();
        React.useEffect(() => {
            ref.current = value;
        }, [value]);
        return ref.current;
    };

    const prevIsDeleting = usePrevious(isDeleting);

    useEffect(() => {
        if (prevIsDeleting && !isDeleting) { // deletion actually finished 
            if (!deleteError) {
                showNotification(formatMessage({ id: 'deleteNotification' }));
                // Move to prev page if the last element was deleted
                if (items.length === 0 && state.pagination.page > 0) {
                    setState(prevState => ({
                        ...prevState,
                        animeIdToDelete: null,
                        animeDeleteStarted: false,
                        pagination: {
                            ...state.pagination,
                            page: state.pagination.page - 1,
                        }
                    }));
                } else {
                    setState(prevState => ({
                        ...prevState,
                        animeIdToDelete: null, // close modal 
                        fetchTrigger: prevState.fetchTrigger + 1 // refetch current page
                    }));
                    return;
                }
            }
        }

    }, [showNotification, formatMessage, isDeleting, deleteError, prevIsDeleting, items.length, state.pagination]);

    const handleCancelDelete = () => {
        setState(prevState => ({
            ...prevState,
            animeIdToDelete: null,
        }));
    };

    const handleOpenDeleteDialog = (e, animeId) => {
        e.stopPropagation();
        setState(prevState => ({
            ...prevState,
            animeIdToDelete: animeId, // open modal 
        }));
    };

    const handlePageChange = useCallback((newPage) => {
        setState(prevState => ({
            ...prevState,
            pagination: {
                ...prevState.pagination,
                page: newPage,
            }
        }));
    }, []);

    useEffect(() => {
        dispatch(actionsAnime.fetchAnimeList({
            filters: state.filters,
            pagination: state.pagination,
        }));
    }, [dispatch, state.filters, state.pagination, state.fetchTrigger]);

    const handleApplyFilters = ({ year, author }) => {
        setState(prev => ({
            ...prev,
            filters: {
                year: year ?? prev.filters.year,
                author: author ?? prev.filters.author,
            },
            pagination: { ...prev.pagination, page: 0 },
        }));
    };

    return (
        <div className={classes.animeRoot}>
            <AnimeFilterBar
                filters={state.filters}
                applyFilters={handleApplyFilters}
            />
            {
                isFetching
                    ? <Loader />
                    : error
                    || <>
                        <AnimeList
                            items={items}
                            onDelete={handleOpenDeleteDialog}
                        />
                        <Button
                            sx={{
                                width: "150px",
                                margin: "0 0 0px auto"
                            }}
                            onClick={() => changePage({
                                pathname: pagesURLs[pages.animeNew],
                            })}
                        >
                            {formatMessage({ id: 'addButtonText' })}
                        </Button>
                    </>
            }
            <Pagination
                page={state.pagination.page}
                size={state.pagination.size}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className={classes.pagination}
            />
            {
                state.animeIdToDelete &&
                <AnimeConfirmationModal
                    title={formatMessage({ id: 'deleteConfirmationTitle' })}
                    text={formatMessage({ id: 'deleteConfirmationText' })}
                    error={deleteError ? String(deleteError) : ""}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    isLoading={isDeleting}
                />
            }
        </div>
    );
}

export default AnimeListContainer;