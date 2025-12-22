import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import CreateAnimeForm from "../components/CreateAnimeForm";
import AnimeDetails from "../components/AnimeDetails";
import DetailsHeader from "../components/DetailsHeader";
import { ANIME_DETAILS_MODES } from "../../../misc/constants/animeDetailsModes";
import useTheme from "../../../misc/hooks/useTheme";
import { createUseStyles } from "react-jss";
import actionsAnime from "../../../app/actions/anime";

const getClasses = createUseStyles((theme) => ({
    animeDetailsRoot: {
        width: "600px",
        margin: "0 auto",
        maxWidth: "100%",
    },
    title: {
        fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
        fontWeight: "800",
        fontSize: "28px",
        color: theme.animeAccentColor,
    },
    table: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    tableRow: {
        display: "flex",
        margin: "20px 0",
        alignItems: "center",
        height: "45px",
    },
    key: {
        width: "100px",
        margin: "0",
        fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
        fontSize: "17px",
        color: "grey",
        flexShrink: "0"
    },
    value: {
        margin: "0",
        fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
        fontSize: "17px",
        color: theme.animeAccentColor,
    },
    error: {
        color: "red",
        width: "100%",
        margin: "10px auto",
    },
}));

const AnimeDetailsContainer = (props) => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const classes = getClasses({ theme });

    const [state, setState] = useState({
        mode: null,
    });

    const setMode = useCallback((mode) => {
        setState(statePrev => ({
            ...statePrev,
            mode: mode,
        }));
    }, []);

    useEffect(() => {
        setMode(props.id ? ANIME_DETAILS_MODES.VIEW : ANIME_DETAILS_MODES.CREATE)
    }, [props.id, setMode]);

    useEffect(() => {
        dispatch(actionsAnime.clearSaveError());
    },
        [dispatch, state.mode]
    )

    return (
        <div className={classes.animeDetailsRoot}>
            <DetailsHeader mode={state.mode} setMode={setMode} />
            {
                state.mode === ANIME_DETAILS_MODES.CREATE
                    ? <CreateAnimeForm
                        classes={classes}
                        setMode={setMode}
                        showNotification={props.showNotification}
                    />
                    : <AnimeDetails
                        mode={state.mode}
                        classes={classes}
                        animeId={props.id}
                        setMode={setMode}
                        showNotification={props.showNotification}
                    />
            }
        </div>
    );
}

export default AnimeDetailsContainer;