import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Address = ({ address, addressSelectors, children }) => {
  const containerRef = useRef();

  useEffect(() => {
    const cleanUp = () => null;

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
      const $input = containerRef.current.querySelector(
        addressSelectors[property]
      );
      if ($input && value) {
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
  classNames: PropTypes.object,
};

Address.defaultProps = {
  address: {},
  addressSelectors: {
    address: '[data-address-line1]',
    locality: '[data-address-locality]',
    region: '[data-address-county]',
    postcode: '[data-address-postcode]',
  },
  classNames: {},
};

export default Address;
