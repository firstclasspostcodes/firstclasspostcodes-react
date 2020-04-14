import React from 'react';
import PropTypes from 'prop-types';
import Firstclasspostcodes from '@firstclasspostcodes/js/dist/module';

import { Connector } from './Connector';

const PostcodeLookup = ({ apiKey, apiOverrides, children }) => {
  const client = Firstclasspostcodes(apiKey, apiOverrides);

  return <Connector client={client}>{children}</Connector>;
};

PostcodeLookup.displayName = 'PostcodeLookup';

PostcodeLookup.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiOverrides: PropTypes.object,
  children: PropTypes.any.isRequired,
};

PostcodeLookup.defaultProps = {
  apiOverrides: {},
};

export default PostcodeLookup;
