import { Router } from 'express'
import * as coffeesCtrl from '../controllers/coffees.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET - localhost:3000/coffees
router.get('/', coffeesCtrl.index)

// GET - localhost:3000/coffees/new
router.get('/new', isLoggedIn, coffeesCtrl.new)

// POST - localhost:3000/coffees
router.post('/', coffeesCtrl.create)

export {
  router
}
