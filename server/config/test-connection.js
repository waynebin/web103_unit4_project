// Test the connection with a simple script
import './dotenv.js'
import { pool } from './database.js'

const testConnection = async () => {
    try {
        console.log('Testing database connection...')
        console.log('Configuration:')
        console.log('PGUSER:', process.env.PGUSER)
        console.log('PGHOST:', process.env.PGHOST)
        console.log('PGPORT:', process.env.PGPORT)
        console.log('PGDATABASE:', process.env.PGDATABASE)
        console.log('Password set:', !!process.env.PGPASSWORD)
        
        const client = await pool.connect()
        console.log('✅ Database connection successful!')
        
        const result = await client.query('SELECT NOW()')
        console.log('Current time from database:', result.rows[0].now)
        
        client.release()
        await pool.end()
        
    } catch (error) {
        console.error('❌ Database connection failed:', error.message)
        console.error('Full error:', error)
    }
}

testConnection()