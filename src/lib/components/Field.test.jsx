import React from 'react';
import { render } from '@testing-library/react';

import Field from './Field';

describe('<Field/>', () => {
  it('renders', () => {
    const inputRef = React.createRef();

    const { container } = render(
      <Field
        name="test"
        label="Testing"
        type="email"
        ref={inputRef}
        classNames={{
          container: 'test-container',
          input: 'test-input',
          label: 'test-label',
        }}
      >
        <button type="submit" id="test-button">
          Button
        </button>
      </Field>
    );

    const div = container.querySelector('div');
    const label = container.querySelector('label');
    const input = container.querySelector('input');
    const button = container.querySelector('#test-button');

    expect(div).toHaveClass('test-container');
    expect(label).toHaveClass('test-label');
    expect(input).toHaveClass('test-input');

    expect(div).toContainElement(label);
    expect(div).toContainElement(button);
    expect(div).toContainElement(input);

    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('id', 'test');
    expect(input).toHaveAttribute('name', 'test');
    expect(label).toHaveAttribute('for', 'test');
    expect(label).toHaveTextContent(/^testing$/i);

    expect(input).toBe(inputRef.current);
  });
});
