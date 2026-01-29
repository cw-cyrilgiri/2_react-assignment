import * as types from './data.types';
import { buildQueryParams } from '../../utils/buildQueryParams';
import { API_BASE_URL, API_ENDPOINTS } from '../../utils/constants';

export const fetchMetadata = () => async (dispatch, getState) => {
  const { metadataLoaded } = getState().data;
  if (metadataLoaded) return;

  try {
    const [citiesRes, makesRes] = await Promise.all([
      fetch(`${API_BASE_URL}${API_ENDPOINTS.CITIES}`),
      fetch(`${API_BASE_URL}${API_ENDPOINTS.MAKES}`),
    ]);

    if (!citiesRes.ok || !makesRes.ok) {
      throw new Error(`Failed to load metadata`);
    }

    dispatch({
      type: types.FETCH_METADATA_SUCCESS,
      payload: {
        cities: await citiesRes.json(),
        makes: await makesRes.json(),
      },
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_METADATA_ERROR,
      payload: error.message,
    });
  }
};

export const fetchStocks =
  ({ append = false, searchParams } = {}) =>
  async (dispatch, getState) => {
    dispatch({ type: types.FETCH_STOCKS_START });

    const { nextPageUrl } = getState().data;

    try {
      const url =
        append && nextPageUrl
          ? `${API_BASE_URL}${nextPageUrl}`
          : `${API_BASE_URL}${API_ENDPOINTS.STOCKS}?${buildQueryParams(searchParams)}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: failed to fetch stocks`);
      }
      const data = await res.json();

      dispatch({
        type: types.FETCH_STOCKS_SUCCESS,
        payload: data,
        append,
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_STOCKS_ERROR,
        payload: error.message || 'Failed to fetch stocks',
      });
    }
  };
