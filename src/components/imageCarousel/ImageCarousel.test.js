import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageCarousel from './ImageCarousel';

describe('ImageCarousel', () => {
  const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];

  it('renders first image by default', () => {
    render(<ImageCarousel images={mockImages} />);
    const img = screen.getByAltText('car-0');
    expect(img).toHaveAttribute('src', mockImages[0]);
    expect(img).toHaveClass('carousel-image');
  });

  it('renders carousel with navigation buttons', () => {
    const { container } = render(<ImageCarousel images={mockImages} />);
    expect(container.querySelector('.carousel')).toBeInTheDocument();
    expect(container.querySelector('.carousel-btn.right')).toBeInTheDocument();
  });

  it('does not show left button on first image', () => {
    const { container } = render(<ImageCarousel images={mockImages} />);
    expect(
      container.querySelector('.carousel-btn.left'),
    ).not.toBeInTheDocument();
  });

  it('hides navigation for single image', () => {
    const { container } = render(<ImageCarousel images={['only-image.jpg']} />);
    expect(container.querySelector('.carousel-btn')).not.toBeInTheDocument();
  });

  it('uses lazy loading for images', () => {
    render(<ImageCarousel images={mockImages} />);
    const img = screen.getByAltText('car-0');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('handles empty images array', () => {
    render(<ImageCarousel images={[]} />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });
});
