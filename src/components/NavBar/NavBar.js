import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="carwale-navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <img
            src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg"
            alt="CarWale Logo"
          />
        </div>

        {/* Main Navigation Links */}
        <ul className="navbar-links">
          <li>NEW CARS</li>
          <li>USED CARS</li>
          <li>REVIEWS & NEWS</li>
        </ul>

        {/* Search and Icons Section */}
        <div className="navbar-actions">
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <span className="search-icon">🔍</span>
          </div>
          <div className="navbar-icons">
            <span className="location-icon">📍</span>
            <span className="user-icon">👤</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
