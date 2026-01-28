import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('updates debounced value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } },
    );
    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial');

    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toBe('updated');
  });

  it('cancels previous timeout when value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 500 } },
    );

    rerender({ value: 'second', delay: 500 });
    act(() => jest.advanceTimersByTime(250));
    rerender({ value: 'third', delay: 500 });
    act(() => jest.advanceTimersByTime(250));

    expect(result.current).toBe('first');
    act(() => jest.advanceTimersByTime(250));
    expect(result.current).toBe('third');
  });

  it('respects custom delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 1000 } },
    );

    rerender({ value: 'updated', delay: 1000 });
    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toBe('test');

    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toBe('updated');
  });

  it('handles rapid value changes by using latest', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 500 } },
    );

    rerender({ value: 'b', delay: 500 });
    rerender({ value: 'c', delay: 500 });
    rerender({ value: 'd', delay: 500 });
    expect(result.current).toBe('a');

    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toBe('d');
  });

  it('works with various data types', () => {
    const { result: strResult, rerender: rerenderStr } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: '', delay: 300 } },
    );
    rerenderStr({ value: 'test', delay: 300 });
    act(() => jest.advanceTimersByTime(300));
    expect(strResult.current).toBe('test');

    const { result: numResult, rerender: rerenderNum } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 200 } },
    );
    rerenderNum({ value: 100, delay: 200 });
    act(() => jest.advanceTimersByTime(200));
    expect(numResult.current).toBe(100);
  });
});
