import * as React from 'react';
import { cleanup, render } from "@testing-library/react-native";

import App from './App';

afterEach(cleanup);

test('renders correctly', () => {
  const { getByTestId } = render(<App />);
  // @ts-ignore
  expect(getByTestId('heading')).toHaveTextContent('Welcome');
});
