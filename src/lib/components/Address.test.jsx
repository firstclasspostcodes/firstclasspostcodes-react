import React from 'react';
import { render } from '@testing-library/react';

import Address from './Address';

const setup = (props) => {
  return render(<Address {...props} />);
};

describe('<Address/>', () => {
  let addressProps;

  beforeEach(() => {
    addressProps = {};
  });

  describe('when children is an array', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('throws an error', () => {
      expect(() =>
        setup({
          ...addressProps,
          children: [<option>a</option>, <option>b</option>],
        })
      ).toThrow();
    });
  });

  describe('address property assignment', () => {
    let addressSelectors;

    let address;

    beforeEach(() => {
      addressSelectors = {
        testProperty: '#test-element-id',
      };
      address = {
        testProperty: 'valley lane',
      };
    });

    beforeEach(() => {
      addressProps = {
        addressSelectors,
        address,
      };
    });

    describe('when an input element does not exist', () => {
      it('does not throw', () => {
        expect(() =>
          setup({
            ...addressProps,
            children: <fieldset />,
          })
        ).not.toThrow();
      });
    });

    describe('when a property does not exist', () => {
      beforeEach(() => {
        delete address.testProperty;
      });

      it('does not throw', () => {
        expect(() =>
          setup({
            ...addressProps,
            children: <fieldset />,
          })
        ).not.toThrow();
      });
    });

    describe('when a selector does not exist', () => {
      beforeEach(() => {
        delete addressSelectors.testProperty;
      });

      it('does not throw', () => {
        expect(() =>
          setup({
            ...addressProps,
            children: <fieldset />,
          })
        ).not.toThrow();
      });
    });

    describe('when an input element matches', () => {
      it('assigns the correct value', () => {
        const { container } = setup({
          ...addressProps,
          children: (
            <fieldset>
              <input type="text" id="test-element-id" />
            </fieldset>
          ),
        });

        const input = container.querySelector('#test-element-id');

        expect(input).toHaveValue('valley lane');
      });
    });
  });
});
