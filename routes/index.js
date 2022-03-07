import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'Coffee Snob Society', user: req.user ? req.user : null })
})

export {
  router
}
