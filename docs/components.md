---
path: /frameworks/react/components
title: React Components
published: true
further-reading:
  Connectors: /frameworks/react/connectors
---

# Components.

A number of components are provided that help you integrate Postcode Lookup into any form. You can also [provide your own components](/frameworks/react/connectors). The only required component is `<PostcodeLookup/>`, which provides a context for the other components.

### PostcodeLookup

**This component is required.** It provides context for all the other components and allows you to build your own components using [connectors](/frameworks/react/connectors).

```jsx
<PostcodeLookup
  apiKey={String}
  apiOverrides={Object}
  addressSelectors={Object}
  classNames={Object}
/>
```

For more information on configuring this component, [see here](/frameworks/react#configuration).

### PostcodeLookup.Input

Provides a simple input element, that allows users to enter their postcode and submit a postcode lookup. It provides autocompletion using an attached [datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) element.

**Note:** No styling is applied to the elements so be sure to provide some of your own.

```jsx
<PostcodeLookup.Input
  classNames={Object}
  completions={Array}
  onChange={Function}
  onSubmit={Function}
  useAutocomplete={Boolean}
/>
```

* `classNames`: A map of class names that will be used on the elements that are rendered.
  * `input`: Map of classes that apply styles to the input element which the user enters their postcode into.
    * `container`: Class names applied to the surrounding `<div>` element.
    * `input`: Class names applied to the `<input>` element.
    * `label`: Class names applied ot the `<label>` element.
    * `button`: Class names applied to the `<button>` element.
* `completions`: A list of address completions for the current value being entered into the postcode lookup field.
* `onChange`: A function that accepts a string of the current value entered into the postcode lookup field.
* `onSubmit`: A function that accepts a string of the value to use for the postcode lookup request.
* `useAutocomplete`: True if completions should be provided, false if they are disabled.

### PostcodeLookup.Select

When a valid postcode has been entered and a lookup has been requested, this component renders a simple select element allowing the user to select a matching address.

```jsx
<PostcodeLookup.Select
  classNames={Object}
  addresses={Array}
  onSelected={Function}
/>
```

* `classNames`: A map of class names that will be used on the elements that are rendered.
  * `select`: A map of classes that applies styles to the element that contains the list of matching addresses.
    * `container `: Class names applied to the surrounding `<div>` element.
    * `select`: Class names applied to the `<select>` element.
    * `label`: Class names applied ot the `<label>` element.
* `addresses`: An array of arrays that provide an ID and value for each matching address returnd from the postcode lookup request.
* `onSelected`: A function that accepts the ID of an address that the user has chosen.

### PostcodeLookup.Address

Once a matching address has been selected by the user, this component will render any children passed to it. It uses the configured `addressSelectors` _(if any)_ to update the value of uncontrolled child input elements. 

Otherwise, it will pass an `address` prop to a single child component allowing a custom element to update the value of any controlled inputs.

This component allows you to configure and use a [custom address form component](/frameworks/react/integration).

```jsx
<PostcodeLookup.Address
  address={Object}
  addressSelectors={Object}
>
  {children}
</PostcodeLookup.Address>
```

* `address`: An object that represents the address that has been selected by the user. This prop is provided by the connector function but can be provided manually for testing.
* `addressSelectors`: A map of selectors that will be used to add values to the inputs inside an address form.
  * `address`: Selector used to target the input element, defaults to `[data-address-line1]`.
  * `locality`: Selector used to target the input element, defaults to `[data-address-locality]`.
  * `region`: Selector used to target the input element, defaults to `[data-address-county]`.
  * `postcode`: Selector used to target the input element, defaults to `[data-address-postcode]`.

### PostcodeLookup.AddressForm

A component that provides an address form that renders the following input elements:

* Address Line 1
* Address Line 2
* City/Locality
* County/Region
* Postcode

**Note:** No styling is applied to any of the elements, so be sure to provide some of your own.

```jsx
<PostcodeLookup.AddressForm
  classNames={Object}
  legend={String}
/>
```

* `classNames`: A map of class names that will be used on the elements that are rendered.
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
* `legend`: A string that will be rendered as part of the [legend element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend).