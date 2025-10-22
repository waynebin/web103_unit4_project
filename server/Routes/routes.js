import express from 'express'
// import controller for custom items
import { getCustomItems, getCustomItem, CreateCustomItems, EditCustomItems, DeleteCustomItems } from '../Controllers/Carsitems.js'

const router = express.Router()

// define routes to get, create, edit, and delete items
router.get('/custom-items', getCustomItems)           // GET all custom items
router.get('/custom-items/:id', getCustomItem)       // GET a single custom item by id
router.post('/custom-items', CreateCustomItems)      // CREATE a new custom item
router.put('/custom-items/:id', EditCustomItems)     // EDIT/UPDATE a custom item by id
router.delete('/custom-items/:id', DeleteCustomItems) // DELETE a custom item by id

export default router