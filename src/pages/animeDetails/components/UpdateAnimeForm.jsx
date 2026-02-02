import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from "react-intl";
import Button from "components/Button";
import Typography from "components/Typography";
import AnimeForm from "./AnimeForm";
import { useAnimeValidation } from "misc/hooks/useAnimeValidation";
import { ANIME_DETAILS_MODES } from "misc/constants/animeDetailsModes";
import actionsAnime from "app/actions/anime";

const UpdateAnimeForm = ({ anime, classes, setMode, showNotification }) => {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const { isSaving, saveError } = useSelector(({ anime }) => anime.detail);
    const { validationErrors, validate } = useAnimeValidation();

    const [inputValues, setInputValues] = useState({
        title: anime.title || "",
        year: anime.year || "",
        author: anime.author || "",
        score: anime.score || "",
    });

    const handleFieldChange = (field, value) => {
        setInputValues(prev => ({ ...prev, [field]: value }));
    };

    const onSubmit = () => {
        if (validate(inputValues)) {
            dispatch(actionsAnime.fetchAnimeUpdate(anime.id, inputValues))
                .then(result => {
                    if (result?.success) {
                        showNotification(formatMessage({ id: 'updateNotificationSuccess' }));
                        setMode(ANIME_DETAILS_MODES.VIEW);
                    }
                })
        }
    };

    return (
        <>
            <AnimeForm
                values={inputValues}
                onChange={handleFieldChange}
                errors={validationErrors}
                classes={classes}
            />
            {saveError && <Typography color="error">{String(saveError)}</Typography>}
            <Button
                onClick={onSubmit}
                disabled={isSaving}
                sx={{ display: "block", marginLeft: "auto", marginTop: "20px", minWidth: "150px" }}
                isLoading={isSaving}
            >
                {
                    formatMessage({ id: 'submitBtnUpdate' })
                }
            </Button>
        </>
    );
};

export default UpdateAnimeForm;