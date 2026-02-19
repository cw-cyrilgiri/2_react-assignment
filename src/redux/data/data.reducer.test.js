import dataReducer from './data.reducer';
import * as types from './data.types';

describe('Data Reducer', () => {
  const initialState = {
    stocks: [],
    nextPageUrl: null,
    totalCount: 0,
    loading: false,
    Stockerror: null,
    hasMore: true,
    cities: [],
    makes: [],
    metadataLoaded: false,
    metadataError: null,
  };

  it('returns initial state', () => {
    const state = dataReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('RESET_STOCKS', () => {
    it('resets stocks, nextPageUrl, totalCount, and Stockerror', () => {
      const state = dataReducer(
        {
          ...initialState,
          stocks: [{ id: 1 }],
          nextPageUrl: 'http://example.com/next',
          totalCount: 100,
          Stockerror: 'Some error',
        },
        { type: types.RESET_STOCKS },
      );
      expect(state.stocks).toEqual([]);
      expect(state.nextPageUrl).toBeNull();
      expect(state.totalCount).toBe(0);
      expect(state.Stockerror).toBeNull();
    });

    it('preserves other state properties', () => {
      const state = dataReducer(
        {
          ...initialState,
          loading: true,
          cities: [{ id: 1 }],
        },
        { type: types.RESET_STOCKS },
      );
      expect(state.loading).toBe(true);
      expect(state.cities).toEqual([{ id: 1 }]);
    });
  });

  describe('FETCH_STOCKS_START', () => {
    it('sets loading to true', () => {
      const state = dataReducer(initialState, {
        type: types.FETCH_STOCKS_START,
      });
      expect(state.loading).toBe(true);
    });
  });

  describe('FETCH_STOCKS_SUCCESS', () => {
    it('adds and merges new stocks', () => {
      const state = dataReducer(
        { ...initialState, stocks: [{ profileId: 1, carName: 'Car 1' }] },
        {
          type: types.FETCH_STOCKS_SUCCESS,
          payload: {
            stocks: [{ profileId: 2, carName: 'Car 2' }],
            nextPageUrl: 'url',
          },
        },
      );
      expect(state.stocks).toHaveLength(2);
    });

    it('replaces stocks with same profileId', () => {
      const state = dataReducer(
        { ...initialState, stocks: [{ profileId: 1, carName: 'Old' }] },
        {
          type: types.FETCH_STOCKS_SUCCESS,
          payload: {
            stocks: [{ profileId: 1, carName: 'Updated' }],
            nextPageUrl: null,
          },
        },
      );
      expect(state.stocks[0].carName).toBe('Updated');
    });

    it('sets nextPageUrl and loading to false', () => {
      const state = dataReducer(
        { ...initialState, loading: true },
        {
          type: types.FETCH_STOCKS_SUCCESS,
          payload: {
            stocks: [{ profileId: 1 }],
            nextPageUrl: 'http://example.com',
          },
        },
      );
      expect(state.nextPageUrl).toBe('http://example.com');
      expect(state.loading).toBe(false);
    });

    it('sets hasMore based on incoming stocks', () => {
      const state = dataReducer(initialState, {
        type: types.FETCH_STOCKS_SUCCESS,
        payload: { stocks: [], nextPageUrl: null },
      });
      expect(state.hasMore).toBe(false);
    });
  });

  describe('FETCH_STOCKS_ERROR', () => {
    it('sets error message, loading false, and hasMore false', () => {
      const state = dataReducer(
        { ...initialState, loading: true },
        {
          type: types.FETCH_STOCKS_ERROR,
          payload: 'Network error',
        },
      );
      expect(state.Stockerror).toBe('Network error');
      expect(state.loading).toBe(false);
      expect(state.hasMore).toBe(false);
    });

    it('preserves existing stocks on error', () => {
      const state = dataReducer(
        { ...initialState, stocks: [{ profileId: 1 }] },
        {
          type: types.FETCH_STOCKS_ERROR,
          payload: 'Error',
        },
      );
      expect(state.stocks).toHaveLength(1);
    });
  });

  describe('FETCH_METADATA_SUCCESS', () => {
    it('sets cities, makes, and metadataLoaded flag', () => {
      const cities = [{ cityId: 1, cityName: 'Bangalore' }];
      const makes = [{ makeId: 1, makeName: 'Toyota' }];
      const state = dataReducer(initialState, {
        type: types.FETCH_METADATA_SUCCESS,
        payload: { cities, makes },
      });
      expect(state.cities).toEqual(cities);
      expect(state.makes).toEqual(makes);
      expect(state.metadataLoaded).toBe(true);
    });
  });

  describe('FETCH_METADATA_ERROR', () => {
    it('sets metadataError message', () => {
      const state = dataReducer(initialState, {
        type: types.FETCH_METADATA_ERROR,
        payload: 'Failed to fetch metadata',
      });
      expect(state.metadataError).toBe('Failed to fetch metadata');
    });
  });

  it('returns current state for unknown action', () => {
    const state = dataReducer(initialState, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });
});
