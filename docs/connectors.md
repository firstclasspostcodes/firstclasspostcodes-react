---
path: /frameworks/react/connectors
title: React Connectors
published: true
further-reading:
  Components: /frameworks/react/components
  Customising a component: /frameworks/react/customising-a-widget
---

# Connectors.

Using the provided connector functions, you can create your own components and extend the functionality of the framework. Connectors abstract away the complexity of integrating with the Firstclasspostcodes API, allowing custom components to focus on displaying the data.

All components are memoized and only updated when the underlying API responses change.

### connectToPostcodeLookupContext

All other connectors use this function to map specific properties within the context as props for the provided components.

```jsx
const Component = (props) => {
  return (
    <pre>
      <code>
        {JSON.stringify(props, null, '  ')}
      </code>
    </pre>
  );
};

const mapContextToProps = (Object) => Object;

connectToPostcodeLookupContext(Component, mapContextToProps);
```

* `Component` 
  * `props = {}`
* `mapContextToProps`

### connectToInput

A connector that provides integration with autocomplete and postcode lookup functionality. Functions are passed as props that allow you to update the input value and perform a lookup.

```jsx
const Component = ({ onChange, onSubmit, completions = [] }) => {
  const ref = useRef();

  const handleKeyUp = (e) => onChange(e.target.value);

  const handleClick = () => onSubmit(ref.current.value);

  return (
    <>
      <input ref={ref} list="completions-list" type="text" onChange={handleKeyUp} />
      <button type="submit" onClick={handleClick}>submit</button>
      <datalist id="completions-list">
        {completions.map((completion) => (
          <option key={completion}>{completion}</option>
        ))}
      </datalist>
    </>
  );
};

connectToInput(Component);
```

* `Component`
  * `onChange` - A function that accepts a string of the current value entered into the postcode lookup field. If you are not using autocomplete on your form, you don't need to call this function when the value changes.
  * `onSubmit` - A function that accepts a string of the value to use for the postcode lookup request. When this function is called, a postcode lookup request will be sent.
  * `completions` - A list of strings that provide autocomplete values to be presented to the user.

### connectToAddressSelector

```jsx
const Component = ({ addresses, onSelected }) => {
  return (
    <select onChange={(e) => onSelected(e.target.value)}>
      {addresses.map(([id, text]) => (
        <option key={id} value={id}>
          {text}
        </option>
      ))}
    </select>
  );
};

connectToAddressSelector(Component);
```

* `Component`
  * `onSelected` - A function that accepts the ID of an address that the user has chosen. 
  * `addresses` - An array of arrays containing a tuple of ID and value, for each matching address returnd from the postcode lookup request.

### connectToAddress

```jsx
const Component = ({ address }) => {
  return (
    <pre>
      <code>
        {JSON.stringify(address, null, '  ')}
      </code>
    </pre>
  );
};

connectToAddress(Component);
```

* `Component`
  * `address` - An object that represents the address that has been selected by the user. it contains all the properties necessary to add the values to an address form.

### connectToClassNames

```jsx
const Component = ({ classNames }) => {
  return (
    <pre>
      <code>
        {JSON.stringify(classNames, null, '  ')}
      </code>
    </pre>
  );
};

connectToClassNames(Component);
```

* `Component`
  * `classNames` - A map of all the class names to be applied to the elements being rendered as part of the postcode lookup form.
