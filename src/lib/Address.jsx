import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connectToAddress } from './Connector';

const Address = ({ address, addressSelectors, children }) => {
  const containerRef = useRef();

  useEffect(() => {
    const cleanUp = () => false;

    if (
      typeof window === 'undefined' ||
      !containerRef.current ||
      !address ||
      Object.keys(address).length === 0
    ) {
      return cleanUp;
    }

    Object.keys(addressSelectors).forEach((property) => {
      const value = address[property];
      if (value) {
        const $input = containerRef.current.querySelector(
          addressSelectors[property]
        );
        $input.value = value;
      }
      return true;
    });

    return cleanUp;
  }, [address]);

  const element = React.Children.only(children);

  return React.cloneElement(element, { ...element.props, ref: containerRef });
};

Address.displayName = 'PostcodeLookup.Address';

Address.propTypes = {
  children: PropTypes.any.isRequired,
  addressSelectors: PropTypes.object,
  address: PropTypes.object,
};

Address.defaultProps = {
  address: {},
  addressSelectors: {
    address: '[data-address-line1]',
    postcode: '[data-address-postcode]',
  },
};

export default connectToAddress(Address);
