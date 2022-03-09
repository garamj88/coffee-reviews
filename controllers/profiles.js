import { Profile } from "../models/profile.js"

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


export {
  index,
  show,
  createRecipe
}