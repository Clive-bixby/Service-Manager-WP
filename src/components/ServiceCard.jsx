// src/components/ServiceCard.jsx
import PropTypes from 'prop-types'
import './ServiceCard.css'

const ServiceCard = ({ id, image, title, description, priceValue }) => (
  <div className="service-card">
    <div className="service-image-wrapper">
      <img src={image} alt={title} loading="lazy" className="service-image" />
    </div>
    <div className="service-content">
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      {/* Display formatted priceValue with currency symbol */}
      <p className="service-price">₹{priceValue.toFixed(2)}</p>
      <button className="service-button">Learn More</button>
    </div>
  </div>
)

ServiceCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priceValue: PropTypes.number.isRequired,
}

export default ServiceCard
