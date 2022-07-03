import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../app/home';

test('renders learn react link', () => {
  render(<App />);
  expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
  expect(screen.getByText("MOVIES")).toBeInTheDocument();
  expect(screen.getByText("SERIES")).toBeInTheDocument();
  expect(screen.getByText("KIDS")).toBeInTheDocument();

  expect(screen.getByText("Play")).toBeInTheDocument();

  const ray = screen.getByText("Ray");
  const dragons = screen.getByText("Dragons");
  const john = screen.getByText("John Wick");
  const deadpool = screen.getByText("Deadpool");

  expect(ray).toBeInTheDocument();
  expect(dragons).toBeInTheDocument();
  expect(john).toBeInTheDocument();
  expect(deadpool).toBeInTheDocument();

  ray.click();
  expect("RAY AND THE DRAGON").toBeInTheDocument();

  dragons.click();
  expect("HOW TO TRAIN YOUR DRAGONS").toBeInTheDocument();

  john.click();
  expect("JOHN WICK").toBeInTheDocument();

  deadpool.click();
  expect("DEADPOOL").toBeInTheDocument();

});