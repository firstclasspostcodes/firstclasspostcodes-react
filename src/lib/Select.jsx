import React from 'react';
import PropTypes from 'prop-types';

import { connectToAddressSelector } from './Connector';

const Select = React.forwardRef(({ addresses, onSelected }, ref) => {
  const handleChange = (e) => onSelected(e.target.value);

  if (!addresses || addresses.length === 0) {
    return null;
  }

  return (
    <select ref={ref} onChange={handleChange}>
      {addresses.map(([id, text]) => (
        <option key={id} value={id}>
          {text}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'PostcodeLookup.Select';

Select.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  onSelected: PropTypes.func.isRequired,
};

Select.defaultProps = {
  addresses: [],
};

export default connectToAddressSelector(Select);
