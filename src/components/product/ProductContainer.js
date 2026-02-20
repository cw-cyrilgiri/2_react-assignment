import { useDispatch, useSelector } from 'react-redux';
import './ProductContainer.css';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { fetchStocks } from '../../redux/data/data.thunk';
import CarCard from './CarCard';
import SortBar from './SortBar';
import Spinner from '../common/Spinner';
import { resetStocks } from '../../redux/data/data.action';
import Error from '../common/Error';

function ProductContainer() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const stocks = useSelector((state) => state.data.stocks);
  const loading = useSelector((state) => state.data.loading);
  const nextPageUrl = useSelector((state) => state.data.nextPageUrl);
  const hasMore = useSelector((state) => state.data.hasMore);
  const Stockerror = useSelector((state) => state.data.Stockerror);

  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0,0);
    dispatch(resetStocks());
    dispatch(fetchStocks({ append: false, searchParams }));
  }, [searchParams.toString(), dispatch]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading || !nextPageUrl || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            dispatch(fetchStocks({ append: true }));
          }
        },
        { rootMargin: '200px' },
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, nextPageUrl, hasMore, dispatch],
  );

  return (
    <div className="ProductContainer" style={{ position: 'relative' }}>
      <SortBar />

      {loading && stocks.length === 0 && <Spinner />}

      <div className="PC-container">
        {stocks.map((car, index) => {
          const isLast = index === stocks.length - 1;
          return (
            <div key={car.profileId} ref={isLast ? lastItemRef : null}>
              <CarCard car={car} />
            </div>
          );
        })}
      </div>

      {Stockerror && <Error error={Stockerror} />}
      {loading && stocks.length > 0 && (
        <p className="loading-bottom">Loading more cars...</p>
      )}

      {!loading && stocks.length === 0 && (
        <p className="empty">No cars found</p>
      )}
    </div>
  );
}

export default ProductContainer;
