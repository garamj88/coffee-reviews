import { Router } from 'express'
import * as coffeesCtrl from '../controllers/coffees.js'

const router = Router()

router.get('/', coffeesCtrl.index)

export {
  router
}
