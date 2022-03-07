import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema({
  gear: String,
  ratio: String
}, {
  timestamps: true
}
)

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  recipes: [recipeSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)


export {
  Profile
}
