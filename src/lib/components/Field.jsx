import React from 'react';
import PropTypes from 'prop-types';

const Field = React.forwardRef(({ name, label, classNames, ...props }, ref) => {
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
    </div>
  );
});

Field.displayName = 'PostcodeLookup.Field';

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classNames: PropTypes.object,
};

Field.defaultProps = {
  classNames: {},
};

export default Field;
