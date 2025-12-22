import React from 'react';
import { useIntl } from "react-intl";
import useTheme from "../../../misc/hooks/useTheme";
import { createUseStyles } from "react-jss";
import Bucket from "../../../components/icons/Bucket";
import useChangePage from "../../../misc/hooks/useChangePage";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import Typography from "../../../components/Typography";

const getClasses = createUseStyles(theme => ({
    animeListItem: {
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        alignItems: "center",
        padding: "15px",
        borderRadius: "10px",
        cursor: "pointer",
        border: "2px solid transparent",
        transition: "border 0.3s",
        "&:hover": {
            border: `2px solid ${theme.animeAccentColor}`,
            "& $deleteBtn": {
                opacity: 1,
            }
        }
    },
    animeTitle: {
        fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
        fontSize: "16px",
        margin: "0 0 5px 0",
        fontWeight: 700,
        color: theme.animeAccentColor,
    },
    deleteBtn: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0",
        width: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.3s",
        '@media (max-width: 768px)': {
            opacity: 1,
        },
    }
}));

const AnimeListItem = ({ id, title, score, onDelete, }) => {
    const { theme } = useTheme();
    const classes = getClasses({ theme });
    const { formatMessage } = useIntl();
    const changePage = useChangePage();

    return (
        <div
            className={classes.animeListItem}
            onClick={() => changePage({
                pathname: pagesURLs[pages.animeList] + "/" + id,
            })}
        >
            <div>
                <h4 className={classes.animeTitle}>{title}</h4>
                <Typography color="#000">
                    {formatMessage({ id: 'score' })}: {score}
                </Typography>
            </div>
            <button onClick={(e) => onDelete(e, id)} className={classes.deleteBtn}>
                <Bucket></Bucket>
            </button>
        </div>
    );
}

export default AnimeListItem;