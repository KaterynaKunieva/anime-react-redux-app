import React, { useState } from 'react';
import useTheme from "../../../misc/hooks/useTheme";
import { useIntl } from "react-intl";
import { createUseStyles } from "react-jss";
import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import Typography from "../../../components/Typography";

const getClasses = createUseStyles(theme => ({
    filterBar: {
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        gap: "30px",
        alignItems: "stretch",
        padding: "10px 15px",
        borderRadius: "10px",
        '@media (max-width: 768px)': {
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
        },
    },
    filterInputs: {
        display: "flex",
        gap: "10px",
        flexShrink: "0",
        width: "auto",
        flexGrow: 1,
        '@media (max-width: 768px)': {
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "center",
        },
    },
}));

const AnimeFilterBar = ({ applyFilters, filters }) => {
    const { theme } = useTheme();
    const classes = getClasses({ theme });
    const { formatMessage } = useIntl();
    const [state, setState] = useState({
        year: filters.year || "",
        author: filters.author || "",
    });

    const setFilters = ({ year = null, author = null }) => {
        setState(prevState => ({
            ...prevState,
            year: year == null ? prevState.year : year,
            author: author == null ? prevState.author : author,
        }))
    }

    return (
        <div className={classes.filterBar}>
            <div className={classes.filterInputs}>
                <TextField
                    value={state.year}
                    inputType="number"
                    label={formatMessage({ id: 'filterParam1' })}
                    onChange={(e) => setFilters({ year: e.target.value ? parseInt(e.target.value) : "" })}
                    sx={{ width: "100%" }}
                />

                <TextField
                    sx={{ width: "100%" }}
                    type="text"
                    label={formatMessage({ id: 'filterParam2' })}
                    value={state.author}
                    onChange={(e) => setFilters({ author: e.target.value })}
                />
            </div>
            <Button
                sx={{ width: "150px", }}
                onClick={() => applyFilters({ year: state.year, author: state.author })}
            >
                <Typography color='#fff'>
                    {
                        formatMessage({ id: 'filterButtonText' })
                    }
                </Typography>
            </Button>
        </div>
    );
}

export default AnimeFilterBar;