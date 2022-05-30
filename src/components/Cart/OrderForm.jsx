import { useInputs } from '../../hooks/use-inputs';

import styles from './OrderForm.module.scss';

const namePattern = /^(([a-zA-Z]{2,50})\s([a-zA-Z]{2,50}))$/;
const streetPattern = /^([a-zA-Z]+\s)+([0-9]+)$/;
const postalCodePattern = /^([0-9]{2,10})$/;
const cityPattern = /^([a-zA-Z].?\s?-?)+$/;

export const OrderForm = ({ onOrderCanceled, onSubmitOrder }) => {
  const {
    inputValue: nameValue,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    inputIsValid: nameIsValid,
    hasError: nameHasError,
    reset: resetName,
  } = useInputs((value) => namePattern.test(value));

  const {
    inputValue: streetValue,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    inputIsValid: streetIsValid,
    hasError: streetHasError,
    reset: resetStreet,
  } = useInputs((value) => streetPattern.test(value));

  const {
    inputValue: postalCodeValue,
    inputChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    inputIsValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    reset: resetPostalCode,
  } = useInputs((value) => postalCodePattern.test(value));

  const {
    inputValue: cityValue,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    inputIsValid: cityIsValid,
    hasError: cityHasError,
    reset: resetCity,
  } = useInputs((value) => cityPattern.test(value));

  const resetInputs = () => {
    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  let formIsValid =
    cityIsValid && postalCodeIsValid && streetIsValid && nameIsValid;

  const submitOrderHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      resetInputs();
      onSubmitOrder({
        name: nameValue,
        street: streetValue,
        postalCode: postalCodeValue,
        city: cityValue,
      });
    } else {
      return;
    }
  };

  const cancelOrderHandler = () => {
    onOrderCanceled();
  };

  return (
    <form className={styles.form}>
      <div>
        <label>Your Name</label>
        <input
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          type="text"
          name=""
        />
        {nameHasError && (
          <p style={{ color: 'red' }}>Please provide your FULL name</p>
        )}
      </div>
      <div>
        <label>Street</label>
        <input
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          type="text"
          name=""
        />
        {streetHasError && (
          <p style={{ color: 'red' }}>Please provide a valid street!</p>
        )}
      </div>
      <div>
        <label>Postal Code</label>
        <input
          value={postalCodeValue}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          type="text"
          name=""
        />
        {postalCodeHasError && (
          <p style={{ color: 'red' }}>
            Postal code must be between 2 and 10 digits without any symbols!
          </p>
        )}
      </div>
      <div>
        <label>City</label>
        <input
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          type="text"
          name=""
        />
        {cityHasError && (
          <p style={{ color: 'red' }}>Please provide a valid city name!</p>
        )}
      </div>
      <div>
        <button
          onClick={cancelOrderHandler}
          className={styles['cancel-btn']}
          type="button"
        >
          Cancel
        </button>
        <button
          className={styles['confirm-btn']}
          disabled={!formIsValid}
          onClick={submitOrderHandler}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};
