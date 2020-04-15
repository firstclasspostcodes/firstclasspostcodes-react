/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';

import { PostcodeLookup } from './lib';

const apiKey = process.env.REACT_APP_API_KEY;

const apiOverrides = {
  endpoint: process.env.REACT_APP_API_ENDPOINT,
};

const classNames = {
  select: {
    container: 'test-select-container',
    select: 'test-select-select',
    label: 'test-select-label',
  },
  input: {
    container: 'test-input-container',
    input: 'test-input-input',
    label: 'test-input-label',
    button: 'test-input-button',
  },
  addressForm: {
    addressLine1: {
      container: 'test-addressLine1-container',
      input: 'test-addressLine1-input',
      label: 'test-addressLine1-label',
    },
    addressLine2: {
      container: 'test-addressLine2-container',
      input: 'test-addressLine2-input',
      label: 'test-addressLine2-label',
    },
    locality: {
      container: 'test-locality-container',
      input: 'test-locality-input',
      label: 'test-locality-label',
    },
    county: {
      container: 'test-county-container',
      input: 'test-county-input',
      label: 'test-county-label',
    },
    postcode: {
      container: 'test-postcode-container',
      input: 'test-postcode-input',
      label: 'test-postcode-label',
    },
  },
};

const postcodeLookupProps = {
  classNames,
  apiKey,
  apiOverrides,
};

const App = () => (
  <>
    <form>
      <PostcodeLookup {...postcodeLookupProps}>
        <fieldset>
          <legend>Find your address</legend>
          <PostcodeLookup.Input />
          <PostcodeLookup.Select />
        </fieldset>
        <PostcodeLookup.Address>
          <PostcodeLookup.AddressForm legend="Delivery Address" />
        </PostcodeLookup.Address>
      </PostcodeLookup>
    </form>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
