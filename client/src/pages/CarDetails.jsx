import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCar, deleteCar } from '../services/CarsAPI.js'
import { calculateTotalPrice, formatPrice } from '../utilities/priceCalculator.js'
import '../App.css'

// CarDetails component for displaying details of a specific car
const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const carData = await getCar(id);
                if (carData) {
                    setCarData(carData);
                } else {
                    setError('Car not found');
                }
            } catch (error) {
                console.error('Error fetching car:', error);
                setError('Failed to load car details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCar();
        }
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
            try {
                await deleteCar(id);
                alert('Car deleted successfully!');
                navigate('/customcars');
            } catch (error) {
                console.error('Error deleting car:', error);
                alert('Failed to delete car. Please try again.');
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading car details...</div>;
    }

    if (error) {
        return (
            <div className="error-page">
                <h2>Error</h2>
                <p>{error}</p>
                <Link to="/customcars" className="btn btn-primary">Back to Car List</Link>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="error-page">
                <h2>Car Not Found</h2>
                <p>The requested car could not be found.</p>
                <Link to="/customcars" className="btn btn-primary">Back to Car List</Link>
            </div>
        );
    }

    const totalPrice = calculateTotalPrice(car);

    return (
        <div className="car-details">
            <div className="car-details-header">
                <h2>Car Details - #{car.id}</h2>
                <div className="action-buttons">
                    <Link to={`/edit/${car.id}`} className="btn btn-edit">
                        Edit Car
                    </Link>
                    <button onClick={handleDelete} className="btn btn-delete">
                        Delete Car
                    </button>
                </div>
            </div>

            <div className="car-details-content">
                <div className="car-specs">
                    <h3>Specifications</h3>
                    <div className="spec-grid">
                        <div className="spec-item">
                            <label>Interior:</label>
                            <span className="spec-value">{car.interior}</span>
                        </div>
                        <div className="spec-item">
                            <label>Exterior Color:</label>
                            <span className="spec-value">{car.exterior}</span>
                        </div>
                        <div className="spec-item">
                            <label>Roof Type:</label>
                            <span className="spec-value">{car.roof}</span>
                        </div>
                        <div className="spec-item">
                            <label>Wheels:</label>
                            <span className="spec-value">{car.wheels}</span>
                        </div>
                    </div>
                </div>

                <div className="pricing-info">
                    <h3>Pricing Information</h3>
                    <div className="price-breakdown">
                        <div className="price-item">
                            <span>Base Price:</span>
                            <span>{formatPrice(25000)}</span>
                        </div>
                        <div className="price-item">
                            <span>Total Customizations:</span>
                            <span>{formatPrice(totalPrice - 25000)}</span>
                        </div>
                        <div className="price-item total-price">
                            <span><strong>Total Price:</strong></span>
                            <span><strong>{formatPrice(totalPrice)}</strong></span>
                        </div>
                    </div>
                </div>

                <div className="car-visual">
                    <h3>Car Preview</h3>
                    <div className="visual-representation">
                        <div className={`car-icon ${car.exterior}`}>
                            🚗
                        </div>
                        <p>Visual representation would show here based on selected options</p>
                    </div>
                </div>
            </div>

            <div className="navigation-buttons">
                <Link to="/customcars" className="btn btn-secondary">
                    ← Back to Car List
                </Link>
                <Link to="/" className="btn btn-primary">
                    Create New Car
                </Link>
            </div>
        </div>
    )
}

export default CarDetails