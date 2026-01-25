import './NavBar.css';
import magnifierIco from '../../assets/magnifier.svg';
import locationIco from '../../assets/location.svg';
import userIco from '../../assets/user.svg';

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
            <span className="search-icon">
              <img src={magnifierIco} alt="search" />
            </span>
          </div>
          <div className="navbar-icons">
            <span className="location-icon">
              <img src={locationIco} alt="search" />
            </span>
            <span className="user-icon">
              <img src={userIco} alt="search" />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
