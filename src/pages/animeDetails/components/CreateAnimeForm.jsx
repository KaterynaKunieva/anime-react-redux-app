import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from "react-intl";
import Button from "components/Button";
import Typography from "components/Typography";
import AnimeForm from "./AnimeForm";
import { useAnimeValidation } from "misc/hooks/useAnimeValidation";
import actionsAnime from "app/actions/anime";
import useChangePage from "misc/hooks/useChangePage";
import pagesURLs from "constants/pagesURLs";
import * as pages from "constants/pages";

const CreateAnimeForm = ({ classes, showNotification }) => {
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const changePage = useChangePage();
    const { isSaving, saveError } = useSelector(({ anime }) => anime.detail);
    const { validationErrors, validate } = useAnimeValidation();

    const [inputValues, setInputValues] = useState({
        title: "", year: "", author: "", score: ""
    });

    const handleFieldChange = (field, value) => {
        setInputValues(prev => ({ ...prev, [field]: value }));
    };

    const onSubmit = () => {
        if (validate(inputValues)) {
            dispatch(actionsAnime.fetchAnimeCreate(inputValues))
                .then(result => {
                    if (result?.success) {
                        showNotification(formatMessage({ id: 'createNotificationSuccess' }));
                        changePage({ pathname: pagesURLs[pages.animeList] });
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
                sx={{ display: "block", marginLeft: "auto", marginTop: "20px" }}
            >
                {formatMessage({ id: 'submitBtnCreate' })}
            </Button>
        </>
    );
};

export default CreateAnimeForm;