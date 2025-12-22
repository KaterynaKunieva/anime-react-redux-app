import React from "react";
import { useSelector } from 'react-redux';
import { useIntl } from "react-intl";
import Loader from "../../../components/Loader";

const ViewAnimeDetails = ({ anime, classes }) => {
  const {
    isFetching,
  } = useSelector(({ anime }) => anime.detail);
  const { formatMessage } = useIntl();

  return (
    isFetching
      ? <Loader />
      : <>
        <p className={classes.title}>{anime.title}</p>
        <div className={classes.table}>
          <div className={classes.tableRow}>
            <p className={classes.key}>
              {formatMessage({ id: 'inputYear' })}:
            </p>
            <p className={classes.value}>{anime.year}</p>
          </div>
          <div className={classes.tableRow}>
            <p className={classes.key}>
              {formatMessage({ id: 'inputAuthor' })}:
            </p>
            <p className={classes.value}>{anime.author}</p>
          </div>
          <div className={classes.tableRow}>
            <p className={classes.key}>
              {formatMessage({ id: 'inputScore' })}:
            </p>
            <p className={classes.value}>{anime.score}</p>
          </div>
        </div>
      </>
  )
}

export default ViewAnimeDetails;