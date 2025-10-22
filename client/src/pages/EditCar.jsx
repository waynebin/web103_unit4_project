import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar, updateCar } from '../services/CarsAPI.js'
import { calculateTotalPrice, formatPrice } from '../utilities/priceCalculator.js'
import { validateCarSubmission, getDisabledOptions, AVAILABLE_OPTIONS } from '../utilities/validation.js'
import '../App.css'

// EditCar component for editing an existing car entry
const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carData, setCarData] = useState({
        interior: '',
        exterior: '',
        roof: '',
        wheels: ''
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const car = await getCar(id);
                if (car) {
                    setCarData({
                        interior: car.interior,
                        exterior: car.exterior,
                        roof: car.roof,
                        wheels: car.wheels
                    });
                } else {
                    setErrors(['Car not found']);
                }
            } catch (error) {
                console.error('Error fetching car:', error);
                setErrors(['Failed to load car data']);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCar();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
        setErrors([]); // Clear errors when user makes changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors([]);

        // Validate the car configuration
        const validation = validateCarSubmission(carData);
        
        if (!validation.isValid) {
            setErrors(validation.errors);
            setIsSubmitting(false);
            return;
        }

        try {
            await updateCar(id, carData);
            alert('Car updated successfully!');
            navigate(`/customcars/${id}`);
        } catch (error) {
            console.error('Error updating car:', error);
            setErrors(['Failed to update car. Please try again.']);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading car data...</div>;
    }

    const totalPrice = calculateTotalPrice(carData);
    const disabledOptions = {
        interior: getDisabledOptions(carData, 'interior'),
        exterior: getDisabledOptions(carData, 'exterior'),
        roof: getDisabledOptions(carData, 'roof'),
        wheels: getDisabledOptions(carData, 'wheels')
    };

    return (
        <div className="edit-car">
            <h2>Edit Car #{id}</h2>
            
            {errors.length > 0 && (
                <div className="error-messages">
                    {errors.map((error, index) => (
                        <p key={index} className="error">{error}</p>
                    ))}
                </div>
            )}

            <div className="car-customizer">
                <form onSubmit={handleSubmit} className="customization-form">
                    
                    <div className="form-group">
                        <label htmlFor="interior">Interior:</label>
                        <select 
                            name="interior" 
                            id="interior"
                            value={carData.interior} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select Interior</option>
                            {AVAILABLE_OPTIONS.interior.map(option => (
                                <option 
                                    key={option} 
                                    value={option}
                                    disabled={disabledOptions.interior.includes(option)}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exterior">Exterior Color:</label>
                        <select 
                            name="exterior" 
                            id="exterior"
                            value={carData.exterior} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select Color</option>
                            {AVAILABLE_OPTIONS.exterior.map(option => (
                                <option 
                                    key={option} 
                                    value={option}
                                    disabled={disabledOptions.exterior.includes(option)}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="roof">Roof Type:</label>
                        <select 
                            name="roof" 
                            id="roof"
                            value={carData.roof} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select Roof</option>
                            {AVAILABLE_OPTIONS.roof.map(option => (
                                <option 
                                    key={option} 
                                    value={option}
                                    disabled={disabledOptions.roof.includes(option)}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="wheels">Wheels:</label>
                        <select 
                            name="wheels" 
                            id="wheels"
                            value={carData.wheels} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select Wheels</option>
                            {AVAILABLE_OPTIONS.wheels.map(option => (
                                <option 
                                    key={option} 
                                    value={option}
                                    disabled={disabledOptions.wheels.includes(option)}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="price-display">
                        <h3>Total Price: {formatPrice(totalPrice)}</h3>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="btn btn-primary"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Car'}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate(`/customcars/${id}`)}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                <div className="car-preview">
                    <h3>Preview</h3>
                    <div className="preview-details">
                        <p><strong>Interior:</strong> {carData.interior || 'Not selected'}</p>
                        <p><strong>Exterior:</strong> {carData.exterior || 'Not selected'}</p>
                        <p><strong>Roof:</strong> {carData.roof || 'Not selected'}</p>
                        <p><strong>Wheels:</strong> {carData.wheels || 'Not selected'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCar