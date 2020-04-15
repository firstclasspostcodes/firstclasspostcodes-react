import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

const AddressForm = React.forwardRef(({ legend, classNames }, ref) => {
  const { addressForm = {} } = classNames;

  return (
    <fieldset ref={ref}>
      <legend>{legend}</legend>
      <Field
        classNames={addressForm.addressLine1}
        name="address-line-1"
        label="Address Line 1"
        data-address-line1
      />
      <Field
        classNames={addressForm.addressLine2}
        name="address-line-2"
        label="Address Line 2"
        data-address-line2
      />
      <Field
        classNames={addressForm.locality}
        name="locality"
        label="City/Town"
        data-address-locality
      />
      <Field
        classNames={addressForm.county}
        name="county"
        label="County"
        data-address-county
      />
      <Field
        classNames={addressForm.postcode}
        name="postcode"
        label="Postcode"
        data-address-postcode
      />
    </fieldset>
  );
});

AddressForm.displayName = 'PostcodeLookup.AddressForm';

AddressForm.propTypes = {
  legend: PropTypes.string.isRequired,
  classNames: PropTypes.object,
};

AddressForm.defaultProps = {
  classNames: {},
};

export default AddressForm;
