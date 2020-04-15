import React from 'react';
import { render } from '@testing-library/react';

import PostcodeLookup from './PostcodeLookup';

const setup = (props) => {
  return render(<PostcodeLookup {...props} />);
};

describe('<PostcodeLookup />', () => {
  const testProps = {
    apiKey: '111111111111',
  };

  it('has the correct components', () => {
    expect(PostcodeLookup.Input).not.toBe(null);
    expect(PostcodeLookup.Select).not.toBe(null);
    expect(PostcodeLookup.Address).not.toBe(null);
    expect(PostcodeLookup.AddressForm).not.toBe(null);
  });

  it('renders correctly', () => {
    const { container } = setup({
      ...testProps,
      children: <span id="test-span" />,
    });
    const span = container.querySelector('#test-span');
    expect(span).not.toBe(null);
  });
});
