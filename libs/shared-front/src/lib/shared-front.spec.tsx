import { render } from '@testing-library/react';

import SharedFront from './shared-front';

describe('SharedFront', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedFront />);
    expect(baseElement).toBeTruthy();
  });
});
