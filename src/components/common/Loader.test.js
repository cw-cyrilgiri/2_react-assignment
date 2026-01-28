import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import '@testing-library/jest-dom';

describe('Loader Component', () => {
  it('should render the skeleton card', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.skeleton-card')).toBeInTheDocument();
  });

  it('should render skeleton image element', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.skeleton-image')).toBeInTheDocument();
  });

  it('should render skeleton text container', () => {
    const { container } = render(<Loader />);
    expect(
      container.querySelector('.skeleton-text-container'),
    ).toBeInTheDocument();
  });

  it('should render skeleton title', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.skeleton-title')).toBeInTheDocument();
  });

  it('should render skeleton info', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.skeleton-info')).toBeInTheDocument();
  });

  it('should render skeleton price', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.skeleton-price')).toBeInTheDocument();
  });

  it('should render skeleton button', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.skeleton-button')).toBeInTheDocument();
  });

  it('should apply pulse class to skeleton elements', () => {
    const { container } = render(<Loader />);
    const pulseElements = container.querySelectorAll('.pulse');
    expect(pulseElements.length).toBeGreaterThan(0);
  });

  it('should render all required skeleton elements', () => {
    const { container } = render(<Loader />);
    const card = container.querySelector('.skeleton-card');
    const children = card.querySelectorAll('[class*="skeleton-"]');
    expect(children.length).toBe(6);
  });
});
