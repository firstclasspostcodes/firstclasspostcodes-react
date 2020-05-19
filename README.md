# Firstclasspostcodes
![Build Package](https://github.com/firstclasspostcodes/firstclasspostcodes-react/workflows/Build%20Package/badge.svg) [![Cypress Dashboard](https://img.shields.io/badge/cypress-dashboard-brightgreen.svg)](https://dashboard.cypress.io/projects/5tftdm/runs)

We've designed our [React](https://reactjs.org) component library to be as flexible as possible enabling you to quickly configure build or enhance any form with postcode lookup.

## Documentation
See [@firstclasspostcodes/react](https://docs.firstclasspostcodes.com/frameworks/react) for detailed usage, guides and examples.

## Installation
Install the package with:

```
npm install @firstclasspostcodes/react -s
```

once installed, import the components inside your app file:

```js
import React from 'react';
import { PostcodeLookup } from '@firstclasspostcodes/react';

const apiKey = process.env.REACT_APP_POSTCODE_LOOKUP_KEY;

const AddressForm = () => (
  <PostcodeLookup apiKey={apiKey}>
    <fieldset>
      <PostcodeLookup.Input />
      <PostcodeLookup.Select />
    </fieldset>
    <PostcodeLookup.Address>
      <PostcodeLookup.AddressForm legend="Delivery Address" />
    </PostcodeLookup.Address>
  </PostcodeLookup>
);

export default AddressForm;
```

For more guides and information on how to configure and use the components, [read our documentation](https://docs.firstclasspostcodes.com/js/react).

## Development
The library is built off the back of `react-scripts` and we stick to the paved road.

### Getting started
Run the mock API container, this will provide some data you can develop & test with locally:

```
docker run --rm -d -p 2345:80 firstclasspostcodes/mock:latest
```

Add necessary configuration to a `.env` file:

```sh
# .env
REACT_APP_API_KEY=111111111111
REACT_APP_API_ENDPOINT=http://localhost:2345
```

For development, we run a "test app" locally, which is configured and set up in `src/index.js`. The intention of this app is to provide some visual feedback for the library and allows for experimental usage. Most importantly, it is the page used by Cypress for integration testing.

Start the development app:

```
npm start
```

### Testing
All changes to modules should be accompanied with matching tests and functional changes should have accompanying integration tests, written using Cypress.

Run the tests:

```
npm test && npm run lint
```

### Cypress
Provide necessary Cypress variables to run the testing suite:

**Headless:**

```
CYPRESS_API_URL=http://localhost:2345 CYPRESS_API_KEY=111111111111 npm run cypress
```

**Interactively:**

```
CYPRESS_API_URL=http://localhost:2345 CYPRESS_API_KEY=111111111111 npx cypress open
```