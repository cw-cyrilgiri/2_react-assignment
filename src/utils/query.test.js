import { getArrayParam, setArrayParam, setParam } from './query';

describe('Query utility functions', () => {
  describe('getArrayParam', () => {
    it('should return empty array when key does not exist', () => {
      const searchParams = new URLSearchParams();
      const result = getArrayParam(searchParams, 'fuel');
      expect(result).toEqual([]);
    });

    it('should parse single value into array', () => {
      const searchParams = new URLSearchParams('fuel=1');
      const result = getArrayParam(searchParams, 'fuel');
      expect(result).toEqual([1]);
    });

    it('should parse multiple values separated by + into array of numbers', () => {
      const searchParams = new URLSearchParams('fuel=1%2B6%2B5');
      const result = getArrayParam(searchParams, 'fuel');
      expect(result).toEqual([1, 6, 5]);
    });

    it('should convert string values to numbers', () => {
      const searchParams = new URLSearchParams('ids=10%2B20%2B30');
      const result = getArrayParam(searchParams, 'ids');
      expect(result).toEqual([10, 20, 30]);
      expect(result.every((num) => typeof num === 'number')).toBe(true);
    });

    it('should handle different keys', () => {
      const searchParams = new URLSearchParams('city=1%2B2&fuel=5%2B6');
      const resultCity = getArrayParam(searchParams, 'city');
      const resultFuel = getArrayParam(searchParams, 'fuel');
      expect(resultCity).toEqual([1, 2]);
      expect(resultFuel).toEqual([5, 6]);
    });
  });

  describe('setArrayParam', () => {
    it('should delete parameter when values array is empty', () => {
      const searchParams = new URLSearchParams('fuel=1+2');
      setArrayParam(searchParams, 'fuel', []);
      expect(searchParams.has('fuel')).toBe(false);
    });

    it('should set parameter with single value', () => {
      const searchParams = new URLSearchParams();
      setArrayParam(searchParams, 'fuel', [1]);
      expect(searchParams.get('fuel')).toBe('1');
    });

    it('should set parameter with multiple values joined by +', () => {
      const searchParams = new URLSearchParams();
      setArrayParam(searchParams, 'fuel', [1, 6, 5]);
      expect(searchParams.get('fuel')).toBe('1+6+5');
    });

    it('should replace existing parameter values', () => {
      const searchParams = new URLSearchParams('fuel=1');
      setArrayParam(searchParams, 'fuel', [2, 3, 4]);
      expect(searchParams.get('fuel')).toBe('2+3+4');
    });

    it('should preserve other parameters', () => {
      const searchParams = new URLSearchParams('city=bangalore&fuel=1');
      setArrayParam(searchParams, 'fuel', [2, 3]);
      expect(searchParams.get('city')).toBe('bangalore');
      expect(searchParams.get('fuel')).toBe('2+3');
    });
  });

  describe('setParam', () => {
    it('should delete parameter when value is null', () => {
      const searchParams = new URLSearchParams('car=toyota');
      setParam(searchParams, 'car', null);
      expect(searchParams.has('car')).toBe(false);
    });

    it('should delete parameter when value is undefined', () => {
      const searchParams = new URLSearchParams('car=toyota');
      setParam(searchParams, 'car', undefined);
      expect(searchParams.has('car')).toBe(false);
    });

    it('should delete parameter when value is empty string', () => {
      const searchParams = new URLSearchParams('car=toyota');
      setParam(searchParams, 'car', '');
      expect(searchParams.has('car')).toBe(false);
    });

    it('should set parameter with string value', () => {
      const searchParams = new URLSearchParams();
      setParam(searchParams, 'car', 'toyota');
      expect(searchParams.get('car')).toBe('toyota');
    });

    it('should set parameter with numeric value', () => {
      const searchParams = new URLSearchParams();
      setParam(searchParams, 'year', 2020);
      expect(searchParams.get('year')).toBe('2020');
    });

    it('should replace existing parameter value', () => {
      const searchParams = new URLSearchParams('car=toyota');
      setParam(searchParams, 'car', 'honda');
      expect(searchParams.get('car')).toBe('honda');
    });

    it('should preserve other parameters', () => {
      const searchParams = new URLSearchParams('city=bangalore&car=toyota');
      setParam(searchParams, 'car', 'honda');
      expect(searchParams.get('city')).toBe('bangalore');
      expect(searchParams.get('car')).toBe('honda');
    });
  });
});
