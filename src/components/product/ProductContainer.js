import { useDispatch, useSelector } from 'react-redux';
import './ProductContainer.css';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { fetchStocks } from '../../redux/data/data.thunk';
import CarCard from './CarCard';
import SortBar from './SortBar';
import Spinner from '../common/Spinner'; // Import your new spinner
import { resetStocks } from '../../redux/data/data.action';

function ProductContainer() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { stocks, loading, nextPageUrl, hasMore } = useSelector(
    (state) => state.data,
  );

  const observerRef = useRef(null);

  useEffect(() => {
    dispatch(resetStocks());
    dispatch(fetchStocks({ append: false, searchParams }));
  }, [searchParams.toString(), dispatch]);

  const sortedList = useMemo(() => {
    const sort = searchParams.get('sort');
    if (!sort) return stocks;

    const [field, order] = sort.split('-');

    return [...stocks].sort((a, b) => {
      const aVal = Number(a[field]) || 0;
      const bVal = Number(b[field]) || 0;
      return order === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [stocks, searchParams]);

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

      {/* Show full overlay spinner ONLY during initial fetch/filter change */}
      {loading && sortedList.length === 0 && <Spinner />}

      <div className="PC-container">
        {sortedList.map((car, index) => {
          const isLast = index === sortedList.length - 1;
          return (
            <div key={car.profileId} ref={isLast ? lastItemRef : null}>
              <CarCard car={car} />
            </div>
          );
        })}
      </div>

      {/* Show simple text loader at the bottom for Infinite Scroll */}
      {loading && sortedList.length > 0 && (
        <p className="loading-bottom">Loading more cars...</p>
      )}

      {!loading && sortedList.length === 0 && (
        <p className="empty">No cars found</p>
      )}
    </div>
  );
}

export default ProductContainer;
