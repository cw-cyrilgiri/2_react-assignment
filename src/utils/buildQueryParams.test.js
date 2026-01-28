import { buildQueryParams } from './buildQueryParams';

describe('buildQueryParams', () => {
  it('should return empty string when no parameters are provided', () => {
    const searchParams = new URLSearchParams();
    const result = buildQueryParams(searchParams);
    expect(result).toBe('');
  });

  it('should build query params with fuel filter', () => {
    const searchParams = new URLSearchParams('fuel=1%206%205');
    const result = buildQueryParams(searchParams);
    expect(result).toContain('fuel=');
  });

  it('should build query params with city filter', () => {
    const searchParams = new URLSearchParams('city=bangalore');
    const result = buildQueryParams(searchParams);
    expect(result).toBe('city=bangalore');
  });

  it('should build query params with car filter', () => {
    const searchParams = new URLSearchParams('car=toyota');
    const result = buildQueryParams(searchParams);
    expect(result).toBe('car=toyota');
  });

  it('should build query params with budget filter', () => {
    const searchParams = new URLSearchParams('budget=100000-500000');
    const result = buildQueryParams(searchParams);
    expect(result).toBe('budget=100000-500000');
  });

  it('should build query params with multiple filters', () => {
    const searchParams = new URLSearchParams(
      'fuel=1+6&city=bangalore&car=toyota&budget=100000-500000',
    );
    const result = buildQueryParams(searchParams);
    expect(result).toContain('fuel=1 6');
    expect(result).toContain('city=bangalore');
    expect(result).toContain('car=toyota');
    expect(result).toContain('budget=100000-500000');
  });

  it('should handle special characters in parameters', () => {
    const searchParams = new URLSearchParams('car=BMW%20X5');
    const result = buildQueryParams(searchParams);
    expect(result).toContain('car=BMW');
  });

  it('should not include undefined parameters', () => {
    const searchParams = new URLSearchParams('fuel=1&city=bangalore');
    const result = buildQueryParams(searchParams);
    expect(result).not.toContain('car=');
    expect(result).not.toContain('budget=');
  });
});
