/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';

import { PostcodeLookup } from './lib';

const apiKey = process.env.REACT_APP_API_KEY;

const apiOverrides = {
  endpoint: process.env.REACT_APP_API_ENDPOINT,
};

const App = () => (
  <>
    <PostcodeLookup apiKey={apiKey} apiOverrides={apiOverrides}>
      <div>
        <fieldset>
          <legend>Find your address</legend>
          <div>
            <PostcodeLookup.Input />
          </div>
          <div>
            <PostcodeLookup.Select />
          </div>
        </fieldset>
        <PostcodeLookup.Address>
          <fieldset>
            <legend>Delivery address</legend>
            <label htmlFor="address-line-1">Address Line 1</label>
            <input
              id="address-line-1"
              name="address-line-1"
              type="text"
              data-address-line1
            />
            <label htmlFor="address-line-2">Address Line 2</label>
            <input
              id="address-line-2"
              name="address-line-2"
              type="text"
              data-address-line2
            />
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" data-address-locality />
            <label htmlFor="county">County</label>
            <input id="county" name="county" type="text" data-address-county />
            <label htmlFor="postcode">Postcode</label>
            <input
              id="postcode"
              name="postcode"
              type="text"
              data-address-postcode
            />
          </fieldset>
        </PostcodeLookup.Address>
      </div>
    </PostcodeLookup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
