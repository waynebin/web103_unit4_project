// Query the custom_items table
import './dotenv.js'
import { pool } from './database.js'

const queryTable = async () => {
    try {
        console.log('Querying custom_items table...')
        
        const result = await pool.query('SELECT * FROM custom_items;')
        
        console.log('\n📋 Table: custom_items')
        console.log('=' .repeat(80))
        
        if (result.rows.length === 0) {
            console.log('No records found in the table.')
        } else {
            console.log(`Found ${result.rows.length} records:`)
            console.log('\nColumns:', result.fields.map(field => field.name).join(' | '))
            console.log('-'.repeat(80))
            
            result.rows.forEach((row, index) => {
                console.log(`Row ${index + 1}:`)
                console.log(`  ID: ${row.id}`)
                console.log(`  Interior: ${row.interior}`)
                console.log(`  Exterior: ${row.exterior}`)
                console.log(`  Roof: ${row.roof}`)
                console.log(`  Wheels: ${row.wheels}`)
                console.log(`  Created: ${row.created_at}`)
                console.log('')
            })
        }
        
        await pool.end()
        
    } catch (error) {
        console.error('❌ Error querying table:', error.message)
        console.error('Full error:', error)
    }
}

queryTable()