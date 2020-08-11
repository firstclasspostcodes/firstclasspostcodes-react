import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Select from './Select';

const setup = (props) => {
  return render(<Select {...props} />);
};

describe('<Select/>', () => {
  let selectProps;

  let selectInputProps;

  let onSelected;

  beforeEach(() => {
    selectInputProps = {
      'data-test': 'foobar',
    };
    onSelected = jest.fn();
    selectProps = {
      selectProps: selectInputProps,
      onSelected,
    };
  });

  describe('when there are no addresses', () => {
    it('renders nothing', () => {
      const { container } = setup(selectProps);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('when there are addresses', () => {
    const addresses = [
      ['a', 'test a'],
      ['b', 'test b'],
    ];

    beforeEach(() => {
      selectProps.addresses = addresses;
    });

    it('renders select props passed through to the field', () => {
      const { container } = setup(selectProps);
      const select = container.querySelector('select');
      expect(select.getAttribute('data-test')).toEqual(
        selectInputProps['data-test']
      );
    });

    it('renders a select element with the correct options', () => {
      const { container } = setup(selectProps);
      const select = container.querySelector('select');
      expect(select.children).toHaveLength(addresses.length + 1);
    });

    describe('when an address is selected', () => {
      it('calls the #onSelected function', () => {
        const { container } = setup(selectProps);
        const select = container.querySelector('select');
        fireEvent.change(select, { target: { value: addresses[0][0] } });
        expect(onSelected).toHaveBeenCalledWith(addresses[0][0]);
      });
    });
  });
});
