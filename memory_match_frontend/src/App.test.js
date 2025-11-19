import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Memory Match header and controls', () => {
  render(<App />);
  expect(screen.getByText(/Memory Match/i)).toBeInTheDocument();
  expect(screen.getByText(/Moves/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Restart/i })).toBeInTheDocument();
});
