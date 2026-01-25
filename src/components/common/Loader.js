import './Loader.css';

function Loader() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image pulse"></div>
      <div className="skeleton-text-container">
        <div className="skeleton-title pulse"></div>
        <div className="skeleton-info pulse"></div>
        <div className="skeleton-price pulse"></div>
      </div>
      <div className="skeleton-button pulse"></div>
    </div>
  );
}

export default Loader;
