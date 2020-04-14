/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { connectToInput } from './Connector';

const Input = ({ completions, onLookup, onChange, useAutocomplete }) => {
  const inputRef = useRef();

  const handleLookup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onLookup(inputRef.current.value);
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
      <label htmlFor="postcode-lookup">Postcode Lookup</label>
      <input
        id="postcode-lookup"
        list="postcode-lookup-list"
        type="text"
        onKeyUp={handleKeyUp}
        ref={inputRef}
      />
      <datalist id="postcode-lookup-list">
        {completions.map((completion) => (
          <option key={completion}>{completion}</option>
        ))}
      </datalist>
      <button type="submit" onClick={handleClick}>
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
  onLookup: PropTypes.func.isRequired,
};

Input.defaultProps = {
  useAutocomplete: true,
  completions: [],
};

export default connectToInput(Input);
