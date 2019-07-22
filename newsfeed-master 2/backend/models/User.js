let mongoose = require('mongoose')
let encrypt = require('mongoose-encryption');
const Schema = mongoose.Schema


function buildModel(name, input) {
  let schema = new Schema(input, {timestamps: true})
  // var encKey = process.env.SOME_32BYTE_BASE64_STRING
  // var sigKey = process.env.SOME_64BYTE_BASE64_STRING
  // // schema.plugin(encrypt, {
  // //   secret: "shh", // secret key is a string
  // //   encryptedFields: ['password']
  // // })
  // This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
  // and encrypt, decrypt, sign, and authenticate instance methods
  return mongoose.model(name, schema)
}

// also contained "updatedAt" and "createdAt"
const User = buildModel('User', {
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: {
    type: String,
    required: true,
    uniqueCaseInsensitive: false,
  },
  firstname: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  topic: {
    type: [String],
    default: ['entertainment', 'sports', 'politics', 'technology', 'business', 'science']
  }
})

module.exports = User
