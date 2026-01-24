import "./CarCard.css";
import ImageCarousel from "../imageCarousel/ImageCarousel"

function CarCard({ car }) {
  return (
    <div className="CarCard">
      <ImageCarousel images={car.stockImages} />
      <div className="Car-text">
        <h2 title={car.carName}>{car.makeYear} {car.carName}</h2>

        <div className="Car-info">
          <h4>{car.km} km</h4>
          <span>|</span>
          <h4>{car.fuel}</h4>
          <span>|</span>
          <h4>{car.areaName}, {car.cityName}</h4>
        </div>

        <h3>₹ {car.price}</h3>
      </div>

      <button className="seller-btn">Get Seller Details</button>
    </div>
  );
}

export default CarCard;


