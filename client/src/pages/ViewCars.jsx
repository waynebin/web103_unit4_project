import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI.js'
import { calculateTotalPrice, formatPrice } from '../utilities/priceCalculator.js'
import '../App.css'

// ViewCars component for displaying a list of cars
const ViewCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const allCars = await getAllCars();
                setCars(allCars);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    const handleDelete = async (carId) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await deleteCar(carId);
                setCars(cars.filter(car => car.id !== carId));
            } catch (error) {
                console.error('Error deleting car:', error);
                alert('Failed to delete car. Please try again.');
            }
        }
    };

    if (loading) {
        return <div>Loading cars...</div>;
    }

    return (
        <div className="view-cars">
            <h2>Custom Car Collection</h2>
            {cars.length === 0 ? (
                <div>
                    <p>No custom cars created yet.</p>
                    <Link to="/">Create your first car</Link>
                </div>
            ) : (
                <div className="cars-grid">
                    {cars.map(car => (
                        <div key={car.id} className="car-card">
                            <div className="car-info">
                                <h3>Car #{car.id}</h3>
                                <div className="car-details">
                                    <p><strong>Interior:</strong> {car.interior}</p>
                                    <p><strong>Exterior:</strong> {car.exterior}</p>
                                    <p><strong>Roof:</strong> {car.roof}</p>
                                    <p><strong>Wheels:</strong> {car.wheels}</p>
                                    <p className="price"><strong>Total Price:</strong> {formatPrice(calculateTotalPrice(car))}</p>
                                </div>
                                <div className="car-actions">
                                    <Link to={`/customcars/${car.id}`} className="btn btn-view">
                                        View Details
                                    </Link>
                                    <Link to={`/edit/${car.id}`} className="btn btn-edit">
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(car.id)} 
                                        className="btn btn-delete"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars