export const animeErrorTypes = {
  EMPTY_TITLE: 'EMPTY_TITLE',
  EMPTY_YEAR: 'EMPTY_YEAR',
  INVALID_YEAR: 'INVALID_YEAR',
  EMPTY_AUTHOR: 'EMPTY_AUTHOR',
  INVALID_SCORE: 'INVALID_SCORE',
};

export const getAnimeValidationErrors = (values) => {
  const errors = [];
  const currentYear = new Date().getFullYear();

  if (!values.title?.trim()) errors.push(animeErrorTypes.EMPTY_TITLE);

  const year = parseInt(values.year);
  if (!values.year) {
    errors.push(animeErrorTypes.EMPTY_YEAR);
  } else if (isNaN(year) || year < 1900 || year > currentYear + 10) {
    errors.push(animeErrorTypes.INVALID_YEAR);
  }

  if (!values.author?.trim()) errors.push(animeErrorTypes.EMPTY_AUTHOR);

  const score = parseFloat(values.score);
  if (isNaN(score) || score < 0 || score > 10) {
    errors.push(animeErrorTypes.INVALID_SCORE);
  }

  return errors;
};