import { Profile } from "../models/profile.js"
import { Coffee } from '../models/coffee.js'

function index(req, res) {
  Profile.find({})
    .then(profiles => {
      res.render('profiles/index', {
        profiles,
        title: "Members"
      })
    })
    .catch(err => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

function show(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {
      Profile.findById(req.user.profile._id)
        .then(self => {
          const isSelf = self._id.equals(profile._id)
          res.render("profiles/show", {
            title: profile.name,
            profile,
            isSelf
          })
        })
    })
    .catch(err => {
      res.redirect("/")
    })
}

function createRecipe(req, res) {
  Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.recipes.push(req.body)
      profile.save()
        .then(() => {
          res.redirect(`/profiles/${req.user.profile._id}`)
        })
        .catch(err => {
          res.redirect(`/profiles/${req.user.profile._id}`)
        })
    })
}

function updateRecipe(req, res) {
  Profile.findById(req.params.profileId)
    .then(profile => {
      const index = profile.recipes.findIndex(r => parseInt(r._id) === parseInt(req.params.recipeId))
      profile.recipes[index].gear = req.body.gear
      profile.recipes[index].ratio = req.body.ratio
      profile.save()
        .then(() => {
          res.redirect(`/profiles/${req.params.profileId}`)
        })
    })
    .catch(err => {
      res.redirect(`/profiles/${req.params.profileId}`)
    })
}

function deleteRecipe(req, res) {
  Profile.findById(req.params.profileId)
    .then(profile => {
      profile.recipes.remove({ _id: req.params.recipeId })
      profile.save()
        .then(() => {
          res.redirect(`/profiles/${req.params.profileId}`)
        })
    })
    .catch(err => {
      res.redirect(`/profiles/${req.params.profileId}`)
    })
}

export {
  index,
  show,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}



