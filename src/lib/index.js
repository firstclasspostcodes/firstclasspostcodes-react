import PostcodeLookup from './PostcodeLookup';
import Input from './Input';
import Address from './Address';
import Select from './Select';
import {
  connectToPostcodeLookupContext,
  connectToInput,
  connectToAddressSelector,
  connectToAddress,
} from './Connector';

PostcodeLookup.Input = Input;
PostcodeLookup.Select = Select;
PostcodeLookup.Address = Address;

export {
  PostcodeLookup,
  connectToPostcodeLookupContext,
  connectToInput,
  connectToAddressSelector,
  connectToAddress,
};
