import { act } from 'react';
import * as types from './data.types';

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

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case types.RESET_STOCKS:
      return {
        ...state,
        stocks: [],
        nextPageUrl: null,
        totalCount: 0,
        Stockerror: null,
      };

    case types.FETCH_STOCKS_START:
      return { ...state, loading: true };

    case types.FETCH_STOCKS_SUCCESS:
      const incoming = action.payload.stocks || [];

      const map = new Map();

      [...state.stocks, ...incoming].forEach((car) => {
        map.set(car.profileId, car);
      });

      return {
        ...state,
        stocks: Array.from(map.values()),
        nextPageUrl: action.payload.nextPageUrl,
        hasMore: incoming.length > 0,
        loading: false,
      };

    case types.FETCH_METADATA_SUCCESS:
      return {
        ...state,
        cities: action.payload.cities,
        makes: action.payload.makes,
        metadataLoaded: true,
      };

    case types.FETCH_STOCKS_ERROR:
      return {
        ...state,
        loading: false,
        Stockerror: action.payload,
        hasMore: false,
      };

    case types.FETCH_METADATA_ERROR:
      return {
        ...state,
        metadataError: action.payload,
      };

    default:
      return state;
  }
}
