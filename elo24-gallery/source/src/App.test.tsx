import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import WebApp from './screens/HomeScreen';

test('renders learn react link', () => {
  render(<WebApp />);
  //console.log(screen.debug)
  const linkElement = screen.getByText(/Today's Featured Work/i);
  expect(linkElement).toBeInTheDocument();
});
