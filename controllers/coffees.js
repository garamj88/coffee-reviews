import { Coffee } from '../models/coffee.js'
import { Profile } from "../models/profile.js"

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
      res.redirect('/coffees')
    })
}

function showCoffee(req, res) {
  Coffee.findById(req.params.id)
    .populate("owner")
    .then(coffee => {
      res.render('coffees/show', {
        coffee,
        title: `${coffee.name}, ${coffee.country}`
      })
    })
    .catch(err => {
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
      res.redirect("/coffees")
    })
}

function updateCoffee(req, res) {
  Coffee.findById(req.params.id)
    .then(coffee => {
      if (coffee.owner.equals(req.user.profile._id)) {
        coffee.updateOne(req.body, { new: true })
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

function createReview(req, res) {
  req.body.owner = req.user.profile._id
  Coffee.findById(req.params.id, function (err, coffee) {
    coffee.reviews.push(req.body)
    coffee.save(function (err) {
      res.redirect(`/coffees/${coffee._id}`)
    })
  })
}

function updateReview(req, res) {
  Coffee.findById(req.params.coffeeId)
    .then(coffee => {
      const index = coffee.reviews.findIndex(r => parseInt(r._id) === parseInt(req.params.reviewId))
      coffee.reviews[index].tastes.taste1 = req.body.taste1
      coffee.reviews[index].tastes.taste2 = req.body.taste2
      coffee.reviews[index].tastes.taste3 = req.body.taste3
      coffee.reviews[index].comment = req.body.comment
      coffee.save()
      .then(() => {
        res.redirect(`/coffees/${req.params.coffeeId}`)
      })
    })
    .catch(err => {
      res.redirect(`/coffees/${req.params.coffeeId}`)
    })
}

function deleteReview(req, res) {
  Coffee.findById(req.params.coffeeId)
    .then(coffee => {
      coffee.reviews.remove({ _id: req.params.reviewId })
      coffee.save()
        .then(() => {
          res.redirect(`/coffees/${req.params.coffeeId}`)
        })
    })
    .catch(err => {
      res.redirect(`/coffees/${req.params.coffeeId}`)
    })
}

export {
  index,
  newCoffee,
  createCoffee,
  showCoffee,
  editCoffee,
  updateCoffee,
  createReview,
  updateReview,
  deleteReview
}