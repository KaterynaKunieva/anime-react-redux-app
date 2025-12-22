import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Typography from "../../../components/Typography";
import Loader from "../../../components/Loader";

const ViewAnimeDetails = ({ anime, classes }) => {
  const {
    error,
    isFetching,
  } = useSelector(({ anime }) => anime.detail);
  const dispatch = useDispatch();

  return (
    isFetching
      ? <Loader />
      : <>
        <p className={classes.title}>{anime.title}</p>
        <div className={classes.table}>
          <div className={classes.tableRow}>
            <p className={classes.key}>Рік: </p>
            <p className={classes.value}>{anime.year}</p>
          </div>
          <div className={classes.tableRow}>
            <p className={classes.key}>Автор: </p>
            <p className={classes.value}>{anime.author}</p>
          </div>
          <div className={classes.tableRow}>
            <p className={classes.key}>Рейтинг: </p>
            <p className={classes.value}>{anime.score}</p>
          </div>
        </div>
      </>
  )
}

export default ViewAnimeDetails;