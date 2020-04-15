/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

const Input = ({
  classNames,
  completions,
  onSubmit,
  onChange,
  useAutocomplete,
}) => {
  const inputRef = useRef();

  const { input: inputClasses = {} } = classNames;

  const handleLookup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(inputRef.current.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      return handleLookup(e);
    }
    if (useAutocomplete) {
      onChange(e.target.value);
    }
    return true;
  };

  const handleClick = (e) => handleLookup(e);

  return (
    <>
      <Field
        list="postcode-lookup-list"
        type="text"
        classNames={inputClasses}
        ref={inputRef}
        onKeyUp={handleKeyUp}
        label="Postcode Lookup"
        name="postcode-lookup"
      >
        <button
          className={inputClasses.button}
          type="submit"
          onClick={handleClick}
        >
          Lookup
        </button>
      </Field>
      <datalist id="postcode-lookup-list">
        {completions.map((completion) => (
          <option key={completion}>{completion}</option>
        ))}
      </datalist>
    </>
  );
};

Input.displayName = 'PostcodeLookup.Input';

Input.propTypes = {
  useAutocomplete: PropTypes.bool,
  completions: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classNames: PropTypes.object,
};

Input.defaultProps = {
  useAutocomplete: true,
  completions: [],
  classNames: {},
};

export default Input;
