---
path: /frameworks/react
title: React
published: true
further-reading:
  Components: /frameworks/react/components
  Connectors: /frameworks/react/connectors
  Customising a component: /frameworks/react/customising-a-component
  Integrating an address form: /frameworks/react/integrating-an-address-form
---

# React framework.

Our React library lets you integrate postcode lookup into a new, or existing address form.

```jsx
import { PostcodeLookup } from '@firstclasspostcodes/react';
import CustomAddressForm from './customAddressForm';

const apiKey = process.env.REACT_APP_POSTCODE_LOOKUP_KEY;

const addressSelectors: {
  address: '[name="address-line1"]',
  locality: '[name="address-locality"]',
  region: '[name="address-county"]',
  postcode: '[name="address-postcode"]',
};

export default () => (
  <PostcodeLookup addressSelectors={addressSelectors} apiKey={apiKey}>
    <fieldset>
      <PostcodeLookup.Input />
      <PostcodeLookup.Select />
    </fieldset>
    <PostcodeLookup.Address>
      <CustomAddressForm />
    </PostcodeLookup.Address>
  </PostcodeLookup>
)
```

In the example above, we used a custom address form that has the following implementation:

```jsx
// customAddressForm.jsx
export default () => {
  return (
    <fieldset>
      <legend>Address form</legend>
      <input type="text" name="address-line-1" />
      <input type="text" name="address-line-2" />
      <input type="text" name="locality" />
      <input type="text" name="county" />
      <input type="text" name="address-line-1" />
    </fieldset>
  );
};
```

When a user enters a postcode and selects an address, the address detail will now be correctly added to the form.

> **Note:** This example is using uncontrolled inputs. View a [controlled input example here](/frameworks/react/integration).

The library exports the following top-level component and the connector functions used to provide your own custom components:

```js
import {
  PostcodeLookup,
  connectToInput,
  connectToAddress,
  connectToAddressSelector,
} from '@firstclasspostcodes/react';
```

## Installation

Install the package with:

```bash
npm install --save @firstclasspostcodes/react
```

Once installed, you can import the components inside your app file using:

```jsx
import { PostcodeLookup } from '@firstclasspostcodes/react';
```

## Configuration

All configuration is passed as props to the `<PostcodeLookup/>` component.

```jsx
<PostcodeLookup 
  apiKey="...." 
  apiOverrides={{}} 
  addressSelectors={{}}
  classNames={{}} 
/>
```

* `apiKey`: Sets the API Key that will be used to authenticate requests. 
* `apiOverrides`: Allows you to override certain properties used to communicate with the API.
  * `endpoint`: Alter the endpoint the client will use to contact the API. This is useful for testing purposes.
  * `content`: Defaults to `json`, but can be set as `geo+json` to receive responses in [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) format.
* `classNames`: A map of class names that will be used on the elements that are rendered. This allows you to style the elements. If you provide your own components, these class names won't be applied.
  * `select`: A map of classes that applies styles to the element that contains the list of matching addresses.
    * `container `: Class names applied to the surrounding `<div>` element.
    * `select`: Class names applied to the `<select>` element.
    * `label`: Class names applied ot the `<label>` element.
  * `input`: Map of classes that apply styles to the input element which the user enters their postcode into.
    * `container`: Class names applied to the surrounding `<div>` element.
    * `input`: Class names applied to the `<input>` element.
    * `label`: Class names applied ot the `<label>` element.
    * `button`: Class names applied to the `<button>` element.
  * `addressForm`: Provide a map of styles that are applied to the form elements rendered using the `<PostcodeLookup.AddressForm/>` component. If you use your own address form, this property is not used.
    * `addressLine1`: A map of styles applied to the first line of the address form.
      * `container`: Class names applied to the surrounding `<div>` element.
      * `input` : Class names applied to the `<input>` element.
      * `label`: Class names applied ot the `<label>` element.
    * `addressLine2`: A map of styles applied to the second line of the address form.
      * `container`: Class names applied to the surrounding `<div>` element.
      * `input `: Class names applied to the `<input>` element.
      * `label`: Class names applied ot the `<label>` element.
    * `locality`: Map of styles that are applied to the city/locality input of the address form.
      * `container`: Class names applied to the surrounding `<div>` element.
      * `input `: Class names applied to the `<input>` element.
      * `label`: Class names applied ot the `<label>` element.
    * `county`: Map of styles that are applied to the county/region input of the address form.
      * `container`: Class names applied to the surrounding `<div>` element.
      * `input `: Class names applied to the `<input>` element.
      * `label`: Class names applied ot the `<label>` element.
    * `postcode`: Map of styles that are applied to the postcode input of the address form.
      * `container`: Class names applied to the surrounding `<div>` element.
      * `input `: Class names applied to the `<input>` element.
      * `label`: Class names applied ot the `<label>` element.

## Testing

A [Mock API]() Docker container is provided for use with your integration test suite. To configure the library for testing, provide the following:

```jsx
import React from 'react';

const API_KEY = process.env.REACT_APP_FIRSTCLASSPOSTCODES_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_FIRSTCLASSPOSTCODES_API_ENDPOINT;

export default ({ children }) => {
  <PostcodeLookup apiKey={API_KEY} apiOverrides={{ endpoint: API_ENDPOINT }}>
    {children}
  </PostcodeLookup>
}
```

The expected test API key should always be `111111111111` (12x1) and if the Mock API container is running on port `3456` locally. Then the API endpoint should be `http://localhost:3456`.

<Grid>
  <Related>
    #### JavaScript Library
    The React client framework uses the JS library under-the-hood to send requests and receieve responses.
    

    **[View documentation](/libraries/javascript)**
  </Related>
  <Related>
    #### Mock API
    Our Mock API Docker container enables you to easily test your postcode lookup integration without incurring charges.
    

    **[View documentation](/tools/mock)**
  </Related>
</Grid>