import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import TextComponent from './components/TextComponent';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  const textElement = getByText(/OFF/i);
  expect(textElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});
