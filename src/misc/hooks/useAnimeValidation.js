import { useState, useCallback } from 'react';
import { getAnimeValidationErrors } from '../utils/animeValidation';

export const useAnimeValidation = () => {
  const [validationErrors, setValidationErrors] = useState([]);

  const validate = useCallback((values) => {
    const errors = getAnimeValidationErrors(values);
    setValidationErrors(errors);
    return errors.length === 0;
  }, []);

  return { validationErrors, validate };
};