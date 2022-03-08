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

function createCoffee(req, res) {
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
      title: `${coffee.name}, ${coffee.country}`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/coffees")
  })
}

function editCoffee(req, res) {
  Coffee.findById(req.params.id)
  .then(coffee => {
    res.render("coffees/edit", {
      coffee,
      title: "Edit Coffee"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/coffees")
  })
}

function updateCoffee(req, res) {
  Coffee.findById(req.params.id)
  .then(coffee => {
    if (coffee.owner.equals(req.user.profile._id)) {
      coffee.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/coffees/${req.params.id}`)
      })
    } else {
      throw new Error("NOT AUTHORIZED")
    }
  })
  .catch(err => {
    console.log("the error:", err)
    res.redirect("/coffees")
  })
}

export {
  index,
  newCoffee,
  createCoffee,
  show,
  editCoffee,
  updateCoffee
}