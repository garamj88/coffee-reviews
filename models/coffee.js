import mongoose from 'mongoose'

const Schema = mongoose.Schema

// reviewSchema
const reviewSchema = new Schema({
  comment: { type: String, required: true },
  tastes: {
    taste1: { type: String, required: true },
    taste2: { type: String, required: true },
    taste3: { type: String, required: true },
  },
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true
})

const coffeeSchema = new Schema({
  name: { type: String, required: true, lowercase: true },
  varietal: { type: String, required: true },
  producer: { type: String, required: true },
  region: { type: String, required: true },
  country: { type: String, required: true },
  harvest: { type: Date, required: true },
  roastDate: { type: Date, required: true },
  process: { type: String, enum: ["Washed", "Natural"], required: true },
  tasteNote: {
    taste1: { type: String, required: true },
    taste2: { type: String, required: true },
    taste3: { type: String, required: true },
    taste4: String,
    taste5: String
  },
  roasters: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const Coffee = mongoose.model('Coffee', coffeeSchema)

export {
  Coffee
}
