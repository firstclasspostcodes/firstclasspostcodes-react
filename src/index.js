/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';

import { PostcodeLookup } from './lib';

const apiKey = process.env.REACT_APP_API_KEY;

const apiOverrides = {
  endpoint: process.env.REACT_APP_API_ENDPOINT,
};

const classNames = {
  addressForm: {
    addressLine1: 'test-address',
  },
};

const App = () => (
  <>
    <form>
      <PostcodeLookup
        classNames={classNames}
        apiKey={apiKey}
        apiOverrides={apiOverrides}
      >
        <fieldset>
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
