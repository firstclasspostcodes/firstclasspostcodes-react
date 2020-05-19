---
path: /frameworks/react/integrating-an-address-form
title: React - Integrating an Address Form
published: true
---

# Integrating an address form.

You can integrate any address form that you like, using either controlled or uncontrolled components. To easily use your own address form, you'll need to wrap your component using the [`PostcodeLookup.Address`](/frameworks/react/components#postcodelookupaddress) component.

```jsx
<PostcodeLookup.Address>
  <MyCustomAddressComponent>
</PostcodeLookup.Address>
```

You can find more information on controlled and uncontrolled on the [official React docs](https://reactjs.org/docs/forms.html#controlled-components).

## Controlled

Providing your own address form using controlled inputs is the recommended approach. The chosen address is provided to your custom component with the `address` prop.

**Note:** For simplicity, we've skipped over the usual elements you'd find in a form.

```jsx
// MyCustomAddressComponent.jsx

export default ({ address = {} }) => {
  return (
    <form>
      <input type="text" name="address-line-1" value={address.address} />
      <input type="text" name="address-line-2" />
      <input type="text" name="locality" value={address.locality} />
      <input type="text" name="region" value={address.region} />
      <input type="text" name="postcode" value={address.postcode} />
    </form>
  )
};
```

## Uncontrolled

You can also provide a custom form that integrates using uncontrolled inputs. You must provide a map of address properties to matching CSS selectors. For example the below address selector will assign the postcode for the matching address to the input element with a matching selector.

```js
const selectors = { postcode: '[name="shipping-address-postcode"]' };
```

```jsx
const addressSelectors = {
  address: '[name="shipping-address-line-1"]',
  locality: '[name="shipping-address-locality"]',
  region: '[name="shipping-address-county"]',
  postcode: '[name="shipping-address-postcode"]',
}

export default () => {
  return (
    <PostcodeLookup.Address addressSelectors={addressSelectors}>
      <form>
        <input type="text" name="shipping-address-line-1" />
        <input type="text" name="shipping-address-line-2" />
        <input type="text" name="shipping-address-locality" />
        <input type="text" name="shipping-address-county" />
        <input type="text" name="shipping-address-postcode" />
      </form>
    </PostcodeLookup.Address>
  )
}
```

When an address has been selected by a user, the above input element's values will be updated using the `addressSelectors` that were passed as a prop to the `<PostcodeLookup.Address>` component.

