const mongoose = require('mongoose')
require('dotenv').config()

const mongoUlr = process.env.MONGODB_AUTH_URL

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{7}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

mongoose.set('strictQuery', false)
mongoose.connect(mongoUlr)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
