import React from 'react';
import PropTypes from 'prop-types';

const Field = React.forwardRef(
  ({ name, label, classNames, children, ...props }, ref) => {
    const fieldId = name;

    const inputProps = {
      ...props,
      ref,
      className: classNames.input,
      id: fieldId,
      name,
    };

    return (
      <div className={classNames.container}>
        <label className={classNames.label} htmlFor={fieldId}>
          {label}
        </label>
        <input {...inputProps} />
        {children}
      </div>
    );
  }
);

Field.displayName = 'PostcodeLookup.Field';

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.any,
  classNames: PropTypes.object,
};

Field.defaultProps = {
  classNames: {},
  children: null,
};

export default Field;
