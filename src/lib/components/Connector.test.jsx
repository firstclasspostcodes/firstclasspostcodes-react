/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
import { render, act } from '@testing-library/react';

import {
  connectToPostcodeLookupContext,
  connectToInput,
  connectToAddressSelector,
  connectToAddress,
  connectToClassNames,
  Context,
  Connector,
} from './Connector';

const setup = (Component, props = {}, wrapperProps = {}) => {
  return render(<Component {...props} />, {
    wrapper: ({ children }) => (
      <Connector {...wrapperProps}>{children}</Connector>
    ),
  });
};

describe('<Connector/>', () => {
  it('renders children', () => {
    const { container } = setup(() => <span id="test" />);
    const span = container.querySelector('#test');
    expect(span).toBeInTheDocument();
  });

  it('sets the correct Context', () => {
    const TestComponent = () => {
      const [context, updateContext] = useContext(Context);
      expect(context).toEqual(
        expect.objectContaining({
          testProp: 'testing',
        })
      );
      expect(updateContext).toEqual(expect.any(Function));
      return null;
    };

    setup(
      TestComponent,
      {},
      {
        testProp: 'testing',
      }
    );
  });
});

describe('#connectToInput', () => {
  let client;

  let getPostcode;

  let getAutocomplete;

  beforeEach(() => {
    getPostcode = jest.fn();
    getAutocomplete = jest.fn();
    client = { getPostcode, getAutocomplete };
  });

  it('passes through the correct props', () => {
    const TestComponent = ({ onChange, onSubmit }) => {
      expect(onChange).toEqual(expect.any(Function));
      expect(onSubmit).toEqual(expect.any(Function));
      return null;
    };

    const ConnectedTestComponent = connectToInput(TestComponent);

    setup(ConnectedTestComponent, {}, { client });
  });

  describe('when #onSubmit prop is called', () => {
    it('#getPostcode receives the correct value', async () => {
      const TestComponent = ({ onSubmit }) => {
        useEffect(() => {
          onSubmit('testing');
        });
        return null;
      };

      const ConnectedTestComponent = connectToInput(TestComponent);

      await act(async () => setup(ConnectedTestComponent, {}, { client }));

      expect(getPostcode).toHaveBeenCalledWith('testing');
    });
  });

  describe('when #onChange prop is called', () => {
    describe('when the response is completed', () => {
      const response = [['TESTING']];
      response.isCompleted = true;

      beforeEach(() => {
        getAutocomplete = jest.fn(async () => response);
        client.getAutocomplete = getAutocomplete;
      });

      it('calls #getPostcode to fetching matching data', async () => {
        const TestComponent = ({ onChange }) => {
          useEffect(() => {
            onChange('autocomplete');
          });
          return null;
        };

        const ConnectedTestComponent = connectToInput(TestComponent);

        await act(async () => setup(ConnectedTestComponent, {}, { client }));

        expect(getAutocomplete).toHaveBeenCalledWith('autocomplete');
        expect(getPostcode).toHaveBeenCalledWith('TESTING');
      });
    });

    describe('when the response is not completed', () => {
      const response = [['TESTING A'], ['TESTING B']];
      response.listCompletions = jest.fn(() => ['list of completions']);

      beforeEach(() => {
        getAutocomplete = jest.fn(async () => response);
        client.getAutocomplete = getAutocomplete;
      });

      it('calls #listCompletions to pass through the completions prop', async () => {
        const TestComponent = ({ onChange, completions }) => {
          useEffect(() => {
            if (!completions) {
              onChange('autocomplete');
            } else {
              expect(completions).toEqual(['list of completions']);
            }
          }, [completions]);
          return null;
        };

        const ConnectedTestComponent = connectToInput(TestComponent);

        await act(async () => setup(ConnectedTestComponent, {}, { client }));

        expect(getAutocomplete).toHaveBeenCalledWith('autocomplete');
        expect(response.listCompletions).toHaveBeenCalled();
        expect(getPostcode).not.toHaveBeenCalled();
      });
    });
  });
});

describe('#connectToPostcodeLookupContext', () => {
  it('sets the correct prop', () => {
    const TestComponent = ({ testProp, updateContext }) => {
      expect(testProp).toEqual('testing');
      expect(updateContext).toEqual(expect.any(Function));
      return null;
    };

    const ConnectedTestComponent = connectToPostcodeLookupContext(
      TestComponent,
      ({ testProp }) => ({
        testProp,
      })
    );

    setup(
      ConnectedTestComponent,
      {},
      {
        testProp: 'testing',
      }
    );
  });
});

describe('#connectToAddressSelector', () => {
  describe('when lookup is not set', () => {
    it('contains no addresses', () => {
      const TestComponent = ({ addresses }) => {
        expect(addresses.length).toBe(0);
        return null;
      };

      const ConnectedTestComponent = connectToAddressSelector(TestComponent);

      setup(ConnectedTestComponent);
    });
  });

  describe('when lookup is set', () => {
    let lookup;

    let listAddresses;

    let formatAddress;

    const testAddresses = [1, 2, 3, 4, 5];

    beforeEach(() => {
      listAddresses = jest.fn().mockImplementationOnce(() => testAddresses);
      formatAddress = jest.fn(() => 'testing');
      lookup = { formatAddress, listAddresses };
    });

    it('contains the correct addresses', () => {
      const TestComponent = ({ addresses, onSelected }) => {
        expect(addresses).toEqual(expect.arrayContaining(testAddresses));
        expect(onSelected).toEqual(expect.any(Function));
        useEffect(() => {
          onSelected(addresses[0]);
        });
        return null;
      };

      const ConnectedTestComponent = connectToAddressSelector(TestComponent);

      setup(ConnectedTestComponent, {}, { lookup });

      expect(listAddresses).toHaveBeenCalled();
      expect(formatAddress).toHaveBeenCalledWith(testAddresses[0]);
    });
  });
});

describe('#connectToAddress', () => {
  let testAddress;

  describe('when address is not set', () => {
    it('continues to render with no address set', () => {
      const TestComponent = ({ address }) => {
        expect(!!address).toBe(false);
        return null;
      };

      const ConnectedTestComponent = connectToAddress(TestComponent);

      setup(ConnectedTestComponent, {}, { address: testAddress });
    });
  });

  describe('when the address is set', () => {
    beforeEach(() => {
      testAddress = {
        postcode: 'TESTING',
      };
    });

    it('passes through the address', () => {
      const TestComponent = ({ address }) => {
        expect(address).toEqual(expect.objectContaining(address));
        return null;
      };

      const ConnectedTestComponent = connectToAddress(TestComponent);

      setup(ConnectedTestComponent, {}, { address: testAddress });
    });
  });
});

describe('#connectToClassNames', () => {
  let testClassNames;

  describe('when address is not set', () => {
    it('continues to render with no address set', () => {
      const TestComponent = ({ classNames }) => {
        expect(!!classNames).toBe(false);
        return null;
      };

      const ConnectedTestComponent = connectToClassNames(TestComponent);

      setup(ConnectedTestComponent, {}, { classNames: testClassNames });
    });
  });

  describe('when classNames is set', () => {
    beforeEach(() => {
      testClassNames = {
        test: 'test-class',
      };
    });

    it('passes through the classNames prop', () => {
      const TestComponent = ({ classNames }) => {
        expect(classNames).toEqual(expect.objectContaining(classNames));
        return null;
      };

      const ConnectedTestComponent = connectToClassNames(TestComponent);

      setup(ConnectedTestComponent, {}, { classNames: testClassNames });
    });
  });
});
