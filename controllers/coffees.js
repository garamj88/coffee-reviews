import { Coffee } from '../models/coffee.js'

function index(req, res) {
  Coffee.find({})
  .then(coffees => {
    res.render('coffees/index', {
      coffees,
      title: "Coffee Reviews",
      time: req.time
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/coffees")
  })
}

export {
  index
}