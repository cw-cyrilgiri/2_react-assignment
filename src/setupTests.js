import '@testing-library/jest-dom';

/* -------------------- */
/* react-router-dom mock */
/* -------------------- */
jest.mock(
  'react-router-dom',
  () => ({
    useSearchParams: () => {
      const params = new URLSearchParams();
      return [params, jest.fn()];
    },
    useNavigate: () => jest.fn(),
    useLocation: () => ({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
    }),
    useParams: () => ({}),
  }),
  { virtual: true },
);

/* ---------------- */
/* react-redux mock */
/* ---------------- */
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: (selectorFn) =>
    selectorFn({
      data: {
        stocks: [],
        loading: false,
        nextPageUrl: null,
        hasMore: false,
        Stockerror: null,
        makes: [],
        cities: [],
        metadataLoaded: true,
        metadataError: null,
        totalCount: 0,
      },
    }),
}));
