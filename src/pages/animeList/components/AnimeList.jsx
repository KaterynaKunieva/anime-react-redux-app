import React from 'react';
import { useIntl } from "react-intl";
import AnimeListItem from "../components/AnimeListItem";
import useTheme from "../../../misc/hooks/useTheme";
import { createUseStyles } from "react-jss";

const getClasses = createUseStyles((theme) => ({
    animeList: {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        width: "100%",
        margin: "30px auto",
    }
}));

const AnimeList = ({ items, onDelete }) => {
    const { theme } = useTheme();
    const classes = getClasses({ theme });
    const { formatMessage } = useIntl();

    return (
        <div className={classes.animeList}>
            {
                items.length > 0
                    ? items.map((item) => (
                        <AnimeListItem
                            id={item.id}
                            key={item.id}
                            title={item.title}
                            score={item.score}
                            onDelete={onDelete}
                        >
                        </AnimeListItem>
                    ))
                    : formatMessage({ id: 'noDataMessage' })
            }
        </div>
    )
}

export default AnimeList;