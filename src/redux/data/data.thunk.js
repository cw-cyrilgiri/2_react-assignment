import * as types from './data.types';
import { buildQueryParams } from '../../utils/buildQueryParams';

export const fetchMetadata = () => async (dispatch, getState) => {
  const { metadataLoaded } = getState().data;
  if (metadataLoaded) return;

  const [citiesRes, makesRes] = await Promise.all([
    fetch('https://stg.carwale.com/api/cities'),
    fetch('https://stg.carwale.com/api/v2/makes/?type=new'),
  ]);

  dispatch({
    type: types.FETCH_METADATA_SUCCESS,
    payload: {
      cities: await citiesRes.json(),
      makes: await makesRes.json(),
    },
  });
};

export const fetchStocks =
  ({ append = false, searchParams } = {}) =>
  async (dispatch, getState) => {
    dispatch({ type: types.FETCH_STOCKS_START });

    const { nextPageUrl } = getState().data;

    try {
      const url =
        append && nextPageUrl
          ? `https://stg.carwale.com${nextPageUrl}`
          : `https://stg.carwale.com/api/stocks?${buildQueryParams(searchParams)}`;

      const res = await fetch(url);
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
