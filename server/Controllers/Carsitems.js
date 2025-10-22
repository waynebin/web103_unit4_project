// a pool is a cached set of database connections

import { pool } from '../config/database.js';

// create get,create,edit,and delete cars from custom items table

// Get all custom items
const getCustomItems = async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM custom_items ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching custom items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get a single custom item by id
const getCustomItem = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM custom_items WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Custom item not found' });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching custom item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Create a new custom item
const CreateCustomItems = async(req, res) => {
    try{
        // parse the interior, exterior, roof, wheels from the request body
        const { interior, exterior, roof, wheels } = req.body;

        const result = await pool.query(
            'INSERT INTO custom_items (interior, exterior, roof, wheels) VALUES ($1, $2, $3, $4) RETURNING *',
            [interior, exterior, roof, wheels]
        );

        res.status(201).json({ message: 'Custom item created successfully', item: result.rows[0] });
    } catch (error) {
        console.error('Error creating custom item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Edit/Update a custom item
const EditCustomItems = async(req, res) => {
    try {
        const { id } = req.params;
        const { interior, exterior, roof, wheels } = req.body;

        const result = await pool.query(
            'UPDATE custom_items SET interior = $1, exterior = $2, roof = $3, wheels = $4 WHERE id = $5 RETURNING *',
            [interior, exterior, roof, wheels, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Custom item not found' });
        }

        res.status(200).json({ message: 'Custom item updated successfully', item: result.rows[0] });
    } catch (error) {
        console.error('Error updating custom item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete a custom item
const DeleteCustomItems = async(req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM custom_items WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Custom item not found' });
        }

        res.status(200).json({ message: 'Custom item deleted successfully', item: result.rows[0] });
    } catch (error) {
        console.error('Error deleting custom item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Export all functions
export { getCustomItems, getCustomItem, CreateCustomItems, EditCustomItems, DeleteCustomItems };