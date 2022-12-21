import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders heading', () => {
  render(<App />);
  const heading = screen.getByText('Todo Application');
  expect(heading).toBeInTheDocument();
});
