import React from 'react';
import PropTypes from 'prop-types';
import Firstclasspostcodes from '@firstclasspostcodes/js';

import Input from './components/Input';
import Address from './components/Address';
import AddressForm from './components/AddressForm';
import Select from './components/Select';
import {
  Connector,
  connectToInput,
  connectToAddress,
  connectToClassNames,
  connectToAddressSelector,
} from './components/Connector';

const PostcodeLookup = ({ apiKey, apiOverrides, children, classNames }) => {
  const client = Firstclasspostcodes(apiKey, apiOverrides);

  const initialContext = {
    client,
    classNames,
  };

  return <Connector {...initialContext}>{children}</Connector>;
};

PostcodeLookup.displayName = 'PostcodeLookup';

PostcodeLookup.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiOverrides: PropTypes.object,
  classNames: PropTypes.object,
  children: PropTypes.any.isRequired,
};

PostcodeLookup.defaultProps = {
  apiOverrides: {},
  classNames: {},
};

PostcodeLookup.Input = connectToInput(Input);
PostcodeLookup.Select = connectToAddressSelector(Select);
PostcodeLookup.Address = connectToAddress(Address);
PostcodeLookup.AddressForm = connectToClassNames(AddressForm);

export default PostcodeLookup;
