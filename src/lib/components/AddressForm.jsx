import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

const AddressForm = React.forwardRef(({ legend, classNames }, ref) => {
  const { addressForm = {} } = classNames;

  return (
    <fieldset ref={ref}>
      <legend>{legend}</legend>
      <div>
        <Field
          classNames={addressForm.addressLine1}
          name="address-line-1"
          label="Address Line 1"
          data-address-line1
        />
      </div>
      <div>
        <Field
          classNames={addressForm.addressLine2}
          name="address-line-2"
          label="Address Line 2"
          data-address-line2
        />
      </div>
      <div>
        <Field
          classNames={addressForm.locality}
          name="locality"
          label="City/Town"
          data-address-locality
        />
      </div>
      <div>
        <Field
          classNames={addressForm.county}
          name="county"
          label="County"
          data-address-county
        />
      </div>
      <div>
        <Field
          classNames={addressForm.postcode}
          name="postcode"
          label="Postcode"
          data-address-postcode
        />
      </div>
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
