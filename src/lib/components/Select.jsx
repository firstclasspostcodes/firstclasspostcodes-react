/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Select = React.forwardRef(
  ({ classNames, addresses, onSelected }, ref) => {
    const handleChange = (e) => onSelected(e.target.value);

    if (!addresses || addresses.length === 0) {
      return null;
    }

    const selectId = 'postcode-lookup-address-select';

    const { select: selectClasses = {} } = classNames;

    return (
      <div className={selectClasses.container}>
        <label className={selectClasses.label} htmlFor={selectId}>
          Select your address
        </label>
        <select
          id={selectId}
          name={selectId}
          className={selectClasses.select}
          defaultValue="select"
          ref={ref}
          onChange={handleChange}
        >
          <option value="select" disabled>
            Choose an address...
          </option>
          {addresses.map(([id, text]) => (
            <option key={id} value={id}>
              {text}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'PostcodeLookup.Select';

Select.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  onSelected: PropTypes.func.isRequired,
  classNames: PropTypes.object,
};

Select.defaultProps = {
  addresses: [],
  classNames: {},
};

export default Select;
