import { Router } from 'express'
import * as coffeesCtrl from '../controllers/coffees.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET - localhost:3000/coffees
router.get('/', coffeesCtrl.index)

// GET - localhost:3000/coffees/new
router.get('/new', isLoggedIn, coffeesCtrl.newCoffee)
// POST - localhost:3000/coffees
router.post('/', isLoggedIn, coffeesCtrl.createCoffee)

// GET - localhost:3000/coffees/:id
router.get('/:id', isLoggedIn, coffeesCtrl.showCoffee)
// GET - localhost:3000/coffees/:id/edit
router.get('/:id/edit', isLoggedIn, coffeesCtrl.editCoffee)
// GET - localhost:3000/coffees/:id/
router.put("/:id", isLoggedIn, coffeesCtrl.updateCoffee)
// POST - localhost:3000/coffees/:id/reviews
router.post("/:id/reviews", isLoggedIn, coffeesCtrl.createReview)
// // GET - localhost:3000/coffees/reviews/:id
// router.post("/:coffeeId/reviews/:reviewId", isLoggedIn, coffeesCtrl.updateCoffee)

export {
  router
}
