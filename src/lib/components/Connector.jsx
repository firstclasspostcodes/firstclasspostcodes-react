/* eslint-disable react/prop-types */
import React, { useRef, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';

export const Context = React.createContext(null);

export const connectToPostcodeLookupContext = (
  Component,
  mapContextToProps
) => (props) => {
  const stateRef = useRef([]);

  const [context, updateContext] = useContext(Context);

  const [previousValue] = stateRef.current;

  const nextValue = mapContextToProps(context);

  if (!isEqual(nextValue, previousValue)) {
    stateRef.current = [nextValue, +new Date()];
  }

  const mergedProps = {
    classNames: context.classNames,
    ...nextValue,
    ...props,
  };

  const [, lastUpdatedTimestamp] = stateRef.current;

  const ConnectedComponent = () => (
    <Component updateContext={updateContext} {...mergedProps} />
  );

  ConnectedComponent.displayName = `connectToPostcodeLookupContext(${Component.displayName})`;

  return useMemo(ConnectedComponent, [lastUpdatedTimestamp]);
};

export const connectToInput = (Component) => {
  const ConnectedComponent = ({ client, updateContext, ...props }) => {
    const [autocomplete, setAutocomplete] = useState([]);

    const onSubmit = async (value) => {
      updateContext({
        lookup: await client.getPostcode(value),
      });
    };

    const onChange = async (value) => {
      const autocompleteResponse = await client.getAutocomplete(value);

      setAutocomplete(autocompleteResponse);

      if (autocompleteResponse.isCompleted) {
        const [[postcode]] = autocompleteResponse;
        await onSubmit(postcode);
      }

      return true;
    };

    const connectedComponentProps = {
      ...props,
      onChange,
      onSubmit,
    };

    if (autocomplete.length > 0 && !autocomplete.isCompleted) {
      connectedComponentProps.completions = autocomplete.listCompletions();
    }

    return <Component {...connectedComponentProps} />;
  };

  ConnectedComponent.displayName = `connectToInput(${Component.displayName})`;

  return connectToPostcodeLookupContext(
    ConnectedComponent,
    ({ client, completions }) => ({
      client,
      completions,
    })
  );
};

export const connectToAddressSelector = (Component) => {
  const ConnectedComponent = ({ lookup, updateContext, ...props }) => {
    let addresses = [];

    if (lookup) {
      addresses = lookup.listAddresses();
    }

    const onSelected = (value) => {
      const address = lookup.formatAddress(value);
      return updateContext({ address });
    };

    return (
      <Component addresses={addresses} onSelected={onSelected} {...props} />
    );
  };

  ConnectedComponent.displayName = `connectToAddressSelector(${Component.displayName})`;

  return connectToPostcodeLookupContext(ConnectedComponent, ({ lookup }) => ({
    lookup,
  }));
};

export const connectToAddress = (Component) => {
  const ConnectedComponent = Component;

  ConnectedComponent.displayName = `connectToAddress(${Component.displayName})`;

  return connectToPostcodeLookupContext(ConnectedComponent, ({ address }) => ({
    address,
  }));
};

export const Connector = ({ children, ...initialContext }) => {
  const [context, setContext] = useState(initialContext);

  const updateContext = (obj = {}) => setContext({ ...context, ...obj });

  const contextValue = [context, updateContext];

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

Connector.displayName = 'PostcodeLookup.Connector';

Connector.propTypes = {
  children: PropTypes.any.isRequired,
};
