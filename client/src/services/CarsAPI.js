//define function to get,add,update,and delete cars by calling the api endpoints

const API_BASE_URL = 'http://localhost:3000/api';

//get all cars from custom items table
const getAllCars = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/custom-items`);
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cars:', error);
        return [];
    }
}

//get a single car by id
const getCar = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/custom-items/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch car');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching car:', error);
        return null;
    }
}

//create a new car in custom items table
const createCar = async (carData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/custom-items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });
        if (!response.ok) {
            throw new Error('Failed to create car');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating car:', error);
        throw error;
    }
}

//update a car in custom items table
const updateCar = async (id, carData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/custom-items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });
        if (!response.ok) {
            throw new Error('Failed to update car');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating car:', error);
        throw error;
    }
}

//delete a car from custom items table
const deleteCar = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/custom-items/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete car');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting car:', error);
        throw error;
    }
}

export { getAllCars, getCar, createCar, updateCar, deleteCar }
