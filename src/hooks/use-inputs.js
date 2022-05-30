import { useState } from 'react';

export const useInputs = (validateInput) => {
  const [inputValue, setInputValue] = useState('');
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };

  const inputIsValid = validateInput(inputValue);
  const hasError = !inputIsValid && inputIsTouched;

  const reset = () => {
    setInputValue('');
    setInputIsTouched(false);
  };

  return {
    inputValue,
    inputChangeHandler,
    setInputIsTouched,
    inputBlurHandler,
    inputIsValid,
    hasError,
    reset,
  };
};
