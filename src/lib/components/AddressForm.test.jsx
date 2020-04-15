import React from 'react';
import { render } from '@testing-library/react';

import AddressForm from './AddressForm';

const setup = (props) => {
  return render(<AddressForm {...props} />);
};

describe('<AddressForm/>', () => {
  it('renders with the correct layout', () => {
    const addressFormProps = {
      legend: 'test legend',
      classNames: {
        addressForm: {
          addressLine1: {
            input: 'test--addressLine1',
          },
          addressLine2: {
            input: 'test--addressLine2',
          },
          locality: {
            input: 'test--locality',
          },
          county: {
            input: 'test--county',
          },
          postcode: {
            input: 'test--postcode',
          },
        },
      },
    };

    const { container } = setup(addressFormProps);
    const legend = container.querySelector('legend');
    expect(legend).toHaveTextContent('test legend');

    const line1 = container.querySelector('[data-address-line1]');
    const line2 = container.querySelector('[data-address-line2]');
    const locality = container.querySelector('[data-address-locality]');
    const county = container.querySelector('[data-address-county]');
    const postcode = container.querySelector('[data-address-postcode]');

    expect(line1).not.toBe(null);
    expect(line2).not.toBe(null);
    expect(locality).not.toBe(null);
    expect(county).not.toBe(null);
    expect(postcode).not.toBe(null);

    expect(line1).toHaveClass('test--addressLine1');
    expect(line2).toHaveClass('test--addressLine2');
    expect(locality).toHaveClass('test--locality');
    expect(county).toHaveClass('test--county');
    expect(postcode).toHaveClass('test--postcode');
  });
});
