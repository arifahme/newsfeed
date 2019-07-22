var mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');
let User = require('./models/User')

// options for the database
let options = {
  useNewUrlParser: true,
  dbName: "newsfeed",
  poolSize: 100,
  user: "pillow",
  pass: "fight"
}

// begin connection to the MongoDB server
mongoose.connect("mongodb+srv://cluster0-h3iy9.mongodb.net/test", options)

// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

let user = new User ({
  username: 'billyjean',
  password: 'jacket',
  firstname: "Billy",
  lastname: "Jean"
})

user.save()
.then( (doc) => {
  console.log("Success")
  console.log(doc.username)
  console.log(doc.password)
  return
})
.catch( (err) => {
  console.log("Error")
  console.log(err.username)
  console.log(err.password)
  return
})
