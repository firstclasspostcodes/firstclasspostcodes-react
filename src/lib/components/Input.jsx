/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { connectToInput } from './Connector';

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
      <label className={inputClasses.label} htmlFor="postcode-lookup">
        Postcode Lookup
      </label>
      <input
        id="postcode-lookup"
        list="postcode-lookup-list"
        className={inputClasses.input}
        type="text"
        onKeyUp={handleKeyUp}
        ref={inputRef}
      />
      <datalist id="postcode-lookup-list">
        {completions.map((completion) => (
          <option key={completion}>{completion}</option>
        ))}
      </datalist>
      <button
        className={inputClasses.button}
        type="submit"
        onClick={handleClick}
      >
        Lookup
      </button>
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

export default connectToInput(Input);
