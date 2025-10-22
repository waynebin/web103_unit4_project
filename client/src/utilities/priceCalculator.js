// Price calculation utilities for car customization

// Price data for different car options
export const PRICES = {
    interior: {
        cloth: 0,
        leather: 2000,
        premium: 4000
    },
    exterior: {
        white: 0,
        black: 500,
        red: 800,
        blue: 800,
        silver: 300
    },
    roof: {
        standard: 0,
        sunroof: 1500,
        panoramic: 3000
    },
    wheels: {
        standard: 0,
        alloy: 1200,
        sport: 2500,
        premium: 4000
    }
};

// Base price for the car
export const BASE_PRICE = 25000;

// Calculate total price based on selected options
export const calculateTotalPrice = (options) => {
    let total = BASE_PRICE;
    
    if (options.interior && PRICES.interior[options.interior]) {
        total += PRICES.interior[options.interior];
    }
    
    if (options.exterior && PRICES.exterior[options.exterior]) {
        total += PRICES.exterior[options.exterior];
    }
    
    if (options.roof && PRICES.roof[options.roof]) {
        total += PRICES.roof[options.roof];
    }
    
    if (options.wheels && PRICES.wheels[options.wheels]) {
        total += PRICES.wheels[options.wheels];
    }
    
    return total;
};

// Get price for a specific option
export const getOptionPrice = (category, option) => {
    return PRICES[category]?.[option] || 0;
};

// Format price for display
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
};