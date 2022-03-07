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

function newCoffee(req, res) {
  res.render('coffees/new', {
    title: "Add New Coffee Beans"
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  const coffee = new Coffee(req.body)
  Coffee.create(req.body)
  .then(coffee => {
    res.redirect('/coffees')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/coffees')
  })
}

function show(req, res) {
  Coffee.findById(req.params.id)
  .populate("owner")
  .then(coffee => {
    res.render('coffees/show', {
      coffee,
      title: coffee.name
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/coffees")
  })
}

export {
  index,
  newCoffee as new,
  create,
  show
}