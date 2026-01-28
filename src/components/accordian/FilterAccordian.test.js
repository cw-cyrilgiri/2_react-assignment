import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterAccordian from './FilterAccordian';

describe('FilterAccordian', () => {
  const mockContent = 'Filter Content';

  it('renders accordion with title and content', () => {
    const { container } = render(
      <FilterAccordian title="Test Filter">{mockContent}</FilterAccordian>,
    );
    expect(container.querySelector('.FilterAccordion')).toBeInTheDocument();
    expect(screen.getByText('Test Filter')).toBeInTheDocument();
    expect(screen.getByText('Filter Content')).toBeInTheDocument();
  });

  it('renders header button with arrow icon', () => {
    const { container } = render(
      <FilterAccordian title="Test Filter">{mockContent}</FilterAccordian>,
    );
    expect(
      container.querySelector('.FilterAccordion-header'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.FilterAccordion-arrow svg'),
    ).toBeInTheDocument();
  });

  it('starts closed by default', () => {
    const { container } = render(
      <FilterAccordian title="Test Filter">{mockContent}</FilterAccordian>,
    );
    const collapse = container.querySelector('.FilterAccordion-collapse');
    expect(collapse).not.toHaveClass('show');
  });

  it('toggles open and closed on header click', () => {
    const { container } = render(
      <FilterAccordian title="Test Filter">{mockContent}</FilterAccordian>,
    );
    const header = container.querySelector('.FilterAccordion-header');
    const collapse = container.querySelector('.FilterAccordion-collapse');

    fireEvent.click(header);
    expect(collapse).toHaveClass('show');
    expect(header).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(header);
    expect(collapse).not.toHaveClass('show');
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports defaultOpen prop', () => {
    const { container } = render(
      <FilterAccordian title="Test Filter" defaultOpen={true}>
        {mockContent}
      </FilterAccordian>,
    );
    expect(container.querySelector('.FilterAccordion-collapse')).toHaveClass(
      'show',
    );
  });
});
