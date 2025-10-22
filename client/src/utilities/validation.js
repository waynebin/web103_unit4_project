// Validation utilities for car feature combinations

// Define incompatible combinations
export const INCOMPATIBLE_COMBINATIONS = [
    {
        condition: { interior: 'cloth', wheels: 'premium' },
        message: 'Premium wheels are not available with cloth interior. Please select leather or premium interior.'
    },
    {
        condition: { roof: 'panoramic', interior: 'cloth' },
        message: 'Panoramic roof requires leather or premium interior.'
    },
    {
        condition: { wheels: 'sport', roof: 'standard' },
        message: 'Sport wheels are only available with sunroof or panoramic roof options.'
    }
];

// Available options for each category
export const AVAILABLE_OPTIONS = {
    interior: ['cloth', 'leather', 'premium'],
    exterior: ['white', 'black', 'red', 'blue', 'silver'],
    roof: ['standard', 'sunroof', 'panoramic'],
    wheels: ['standard', 'alloy', 'sport', 'premium']
};

// Validate if a combination of features is valid
export const validateFeatureCombination = (selectedOptions) => {
    const errors = [];
    
    // Check each incompatible combination
    INCOMPATIBLE_COMBINATIONS.forEach(combo => {
        const { condition, message } = combo;
        
        // Check if all conditions in the combination match
        const matches = Object.keys(condition).every(key => 
            selectedOptions[key] === condition[key]
        );
        
        if (matches) {
            errors.push(message);
        }
    });
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

// Check if all required fields are filled
export const validateRequiredFields = (carData) => {
    const requiredFields = ['interior', 'exterior', 'roof', 'wheels'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
        if (!carData[field] || carData[field].trim() === '') {
            missingFields.push(field);
        }
    });
    
    return {
        isValid: missingFields.length === 0,
        missingFields,
        message: missingFields.length > 0 
            ? `Please select options for: ${missingFields.join(', ')}`
            : ''
    };
};

// Get disabled options based on current selection
export const getDisabledOptions = (selectedOptions, category) => {
    const disabled = [];
    
    AVAILABLE_OPTIONS[category].forEach(option => {
        const testOptions = { ...selectedOptions, [category]: option };
        const validation = validateFeatureCombination(testOptions);
        
        if (!validation.isValid) {
            disabled.push(option);
        }
    });
    
    return disabled;
};

// Complete validation for form submission
export const validateCarSubmission = (carData) => {
    // Check required fields
    const requiredValidation = validateRequiredFields(carData);
    if (!requiredValidation.isValid) {
        return {
            isValid: false,
            errors: [requiredValidation.message]
        };
    }
    
    // Check feature combinations
    const comboValidation = validateFeatureCombination(carData);
    
    return comboValidation;
};