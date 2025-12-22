import React from 'react';
import { useIntl } from "react-intl";
import TextField from "components/TextField";
import { animeErrorTypes } from 'misc/utils/animeValidation';

const AnimeForm = ({ values, onChange, errors, classes }) => {
  const { formatMessage } = useIntl();

  const handleChange = (field) => ({ target }) => onChange(field, target.value);

  const getYearHelperText = () => {
    if (errors.includes(animeErrorTypes.EMPTY_YEAR)) return formatMessage({ id: 'inputErrorYearEmpty' });
    if (errors.includes(animeErrorTypes.INVALID_YEAR)) return formatMessage({ id: 'inputErrorYearInvalid' });
    return null;
  };

  return (
    <form className={classes.table}>
      <div className={classes.tableRow}>
        <p className={classes.key}>
          {formatMessage({ id: 'inputTitle' })}:
        </p>
        <TextField
          value={values.title}
          isError={errors.includes(animeErrorTypes.EMPTY_TITLE)}
          helperText={errors.includes(animeErrorTypes.EMPTY_TITLE) && formatMessage({ id: 'inputErrorTitleEmpty' })}
          onChange={handleChange('title')}
          sx={{ width: "100%" }}
        />
      </div>

      <div className={classes.tableRow}>
        <p className={classes.key}>
          {formatMessage({ id: 'inputYear' })}:
        </p>
        <TextField
          value={values.year}
          inputType="number"
          isError={errors.includes(animeErrorTypes.EMPTY_YEAR) || errors.includes(animeErrorTypes.INVALID_YEAR)}
          helperText={getYearHelperText()}
          onChange={handleChange('year')}
          sx={{ width: "100%" }}
          rootsx={{ marginTop: "0 !important" }}
        />
      </div>

      <div className={classes.tableRow}>
        <p className={classes.key}>
          {formatMessage({ id: 'inputAuthor' })}:
        </p>
        <TextField
          value={values.author}
          isError={errors.includes(animeErrorTypes.EMPTY_AUTHOR)}
          helperText={errors.includes(animeErrorTypes.EMPTY_AUTHOR) && formatMessage({ id: 'inputErrorAuthorEmpty' })}
          onChange={handleChange('author')}
          sx={{ width: "100%" }}
        />
      </div>

      <div className={classes.tableRow}>
        <p className={classes.key}>
          {formatMessage({ id: 'inputScore' })}:
        </p>
        <TextField
          value={values.score}
          isError={errors.includes(animeErrorTypes.INVALID_SCORE)}
          helperText={errors.includes(animeErrorTypes.INVALID_SCORE) && formatMessage({ id: 'inputErrorScoreInvalid' })}
          onChange={handleChange('score')}
          sx={{ width: "100%" }}
        />
      </div>
    </form>
  );
};

export default AnimeForm;