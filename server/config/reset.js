import './dotenv.js'
import { pool } from './database.js'

// create custom_items table
const createCustomItemsTable = async () => {
    try {
        // Drop table first to ensure a clean state
        await pool.query('DROP TABLE IF EXISTS custom_items')

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS custom_items (
            id SERIAL PRIMARY KEY,
            interior VARCHAR(50) NOT NULL,
            exterior VARCHAR(50) NOT NULL,
            roof VARCHAR(50) NOT NULL,
            wheels VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`

        await pool.query(createTableQuery)
        console.log('Custom items table created successfully')
    } catch (error) {
        console.error('Error creating custom items table:', error)
        throw error
    }
}

// seed the custom_items table with some initial data
const seedCustomItemsTable = async () => {
    try {
        // Insert sample car configurations
        const sampleCars = [
            { interior: 'leather', exterior: 'black', roof: 'sunroof', wheels: 'alloy' },
            { interior: 'cloth', exterior: 'white', roof: 'standard', wheels: 'standard' },
            { interior: 'premium', exterior: 'red', roof: 'panoramic', wheels: 'premium' },
            { interior: 'leather', exterior: 'blue', roof: 'sunroof', wheels: 'sport' }
        ];

        const insertQuery = `INSERT INTO custom_items (interior, exterior, roof, wheels) VALUES ($1, $2, $3, $4)`

        for (const car of sampleCars) {
            await pool.query(insertQuery, [car.interior, car.exterior, car.roof, car.wheels])
        }

        console.log('Custom items table seeded successfully')
    } catch (error) {
        console.error('Error seeding custom items table:', error)
        throw error
    }
}

const resetDatabase = async () => {
    try {
        await createCustomItemsTable()
        await seedCustomItemsTable()
        console.log('Database reset completed successfully')
    } catch (err) {
        console.error('Reset database failed:', err)
    } finally {
        // ensure the pool is closed and wait for it
        await pool.end()
    }
}

resetDatabase()
