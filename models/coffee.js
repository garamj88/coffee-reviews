import mongoose from 'mongoose'

const Schema = mongoose.Schema

// reviewSchema
const reviewSchema = new Schema({
  comment: String,
  tasteNote: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true
})

const coffeeSchema = new Schema({
  name: { type: String, required: true },
  varietal: String,
  producer: String,
  region: { type: String, required: true },
  country: { type: String, required: true },
  harvestDate: Date,
  process: { type: String, enum: ["Washed", "Natural"], required: true },
  tasteNote: {
    taste1: { type: String, required: true },
    taste2: { type: String, required: true },
    taste3: { type: String, required: true },
    taste4: String,
    taste5: String
  },
  roaster: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  review: [reviewSchema]
}, {
  timestamps: true
})

const Coffee = mongoose.model('Coffee', coffeeSchema)

export {
  Coffee
}
