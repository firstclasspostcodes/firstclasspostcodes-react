---
path: /frameworks/react/customising-a-component
title: React - Customising a component
published: true
---

# Customising a component.

The React library uses [connectors](/frameworks/react/connectors) that abstract away the integration with the Firstclasspostcodes API. This enables you to easily build custom components that work with the API in the exact same way.

## Custom input component

Using the `connectToInput` connector, we can quickly build a custom postcode lookup input element. The connector provides as props, the necessary functions for you to build your own component, for entering a postcode to lookup.

```jsx
import React, { useRef } from 'react';
import { connectToInput } from '@firstclasspostcodes/react';

const InputComponent = ({ onSubmit, onChange, completions = [] }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => onSubmit(inputRef.current.value);

  const handleKeyUp = (e) => onChange(e.target.value);

  return (
    <>
      <input list="completions" type="text" ref={inputRef} onKeyUp={handleKeyUp}>
      <button onClick={handleSubmit}>lookup</button>
      <datalist id="completions">
        {completions.map((completion) => <option key={completion}>{completion}</option>)}
      </datalist>
    </>
  );
};

export default connectToInput(InputComponent);
```

### Third-Party form library

You can also integrate with the popular React form library [Formik](https://jaredpalmer.com/formik/docs/overview). For this example, we won't be using the autocomplete functionality.

It is simple to integrate with any other form library, as the connector only requires you to call the `onSubmit` function, with the postcode to lookup addresses for.

```jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connectToInput } from '@firstclasspostcodes/react';

const InputComponent = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ postcode: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(value.postcode);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="postcode" />
          <button type="submit" disabled={isSubmitting}>Lookup</button>
        </Form>
      )}
    </Formik>
  )
};

export default connectToInput(InputComponent);
```