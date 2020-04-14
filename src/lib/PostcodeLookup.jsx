import React from 'react';
import PropTypes from 'prop-types';
import Firstclasspostcodes from '@firstclasspostcodes/js/dist/module';

import Input from './components/Input';
import Address from './components/Address';
import Select from './components/Select';
import { Connector } from './components/Connector';

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

PostcodeLookup.Input = Input;
PostcodeLookup.Select = Select;
PostcodeLookup.Address = Address;

export default PostcodeLookup;
