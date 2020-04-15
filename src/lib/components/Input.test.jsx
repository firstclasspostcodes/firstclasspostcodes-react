import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const setup = (props) => {
  return render(<Input {...props} />);
};

describe('<Input />', () => {
  let inputProps;

  let onChange;

  let onSubmit;

  beforeEach(() => {
    inputProps = {};
    onChange = jest.fn();
    onSubmit = jest.fn();
  });

  beforeEach(() => {
    inputProps.onChange = onChange;
    inputProps.onSubmit = onSubmit;
  });

  describe('when the button is clicked', () => {
    it('calls #onSubmit', () => {
      const { container } = setup(inputProps);
      const button = container.querySelector('button');
      const input = container.querySelector('input[type=text]');
      input.value = 'test';
      fireEvent.click(button);
      expect(onSubmit).toHaveBeenCalledWith('test');
    });
  });

  describe('when [Enter] is pressed', () => {
    it('calls #onSubmit', () => {
      const { container } = setup(inputProps);
      const input = container.querySelector('input[type=text]');
      input.value = 'test';
      fireEvent.keyUp(input, { key: 'Enter' });
      expect(onSubmit).toHaveBeenCalledWith('test');
    });
  });

  describe('when useAutocomplete={true}', () => {
    it('calls #onChange when the value changes', () => {
      const { container } = setup(inputProps);
      const input = container.querySelector('input[type=text]');
      fireEvent.keyUp(input, { target: { value: 'A' } });
      fireEvent.keyUp(input, { target: { value: 'AB' } });
      expect(onChange).toHaveBeenNthCalledWith(1, 'A');
      expect(onChange).toHaveBeenNthCalledWith(2, 'AB');
    });
  });

  describe('when useAutocomplete={true}', () => {
    beforeEach(() => {
      inputProps.useAutocomplete = false;
    });

    it('does not call #onChange when the value changes', () => {
      const { container } = setup(inputProps);
      const input = container.querySelector('input[type=text]');
      fireEvent.keyUp(input, { target: { value: 'A' } });
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
