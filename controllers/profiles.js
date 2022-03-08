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



export {
  index,
}