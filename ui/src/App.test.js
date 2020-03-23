import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import TextComponent from './TextComponent';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
