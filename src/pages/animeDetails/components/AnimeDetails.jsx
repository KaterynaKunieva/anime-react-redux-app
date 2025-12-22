import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import UpdateAnimeForm from "./UpdateAnimeForm";
import ViewAnimeDetails from "./ViewAnimeDetails";
import { ANIME_DETAILS_MODES } from "../../../misc/constants/animeDetailsModes";
import actionsAnime from "../../../app/actions/anime";
import Loader from "../../../components/Loader";

const AnimeDetails = ({ mode, animeId, classes, setMode, showNotification }) => {
  const {
    data,
    isFetching,
  } = useSelector(({ anime }) => anime.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionsAnime.fetchAnimeDetails(animeId));
  }, [dispatch, animeId]);

  return (
    isFetching || data === null
      ? <Loader />
      : mode === ANIME_DETAILS_MODES.VIEW
        ? <ViewAnimeDetails anime={data} classes={classes} />
        : <UpdateAnimeForm anime={{ ...data, id: animeId }} classes={classes} setMode={setMode} showNotification={showNotification} />
  );
}

export default AnimeDetails;