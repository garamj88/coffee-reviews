import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from "../controllers/profiles.js"

const router = Router()

// GET - localhost:3000/profiles
router.get("/", isLoggedIn, profilesCtrl.index)

// GET - localhost:3000/profiles/:id
router.get("/:id", isLoggedIn, profilesCtrl.show)

// POST - localhost:3000/profiles/:id/recipes
router.post("/:id/recipes", isLoggedIn, profilesCtrl.createRecipe)

// PUT - localhost:3000/profiles/recipes/:id
router.patch("/:profileId/recipes/:recipeId", isLoggedIn, profilesCtrl.updateRecipe)

// DELETE - localhost:3000/profiles/recipes/:id
router.delete("/:profileId/recipes/:recipeId", isLoggedIn, profilesCtrl.deleteRecipe)

export {
  router
}