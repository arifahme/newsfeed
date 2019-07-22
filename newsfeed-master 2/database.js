// popular database driver to connect to mongodb
let mongoose = require('mongoose')

// security game airtight fam
mongoose.set('user', 'pillow')
mongoose.set('pass', 'fight')

let User = require('./backend/models/User')

mongoose.connect("mongodb+srv://cluster0-h3iy9.mongodb.net/test", {
  useNewUrlParser: true,
  dbName: "newsfeed",
  poolSize: 5,
  user: "pillow",
  pass: "fight"
})

// create a new user to insert into the database
let user = new User({
  username: "jmiller",
  password: "phd",
  firstname: "Jeffrey",
  lastname: "Miller"
})

console.log(user.toJSON())

// save the new user to the database
user.save()
  .then( (doc) => {
    // print the output
    console.log(doc)
  })
  // or catch the error
  .catch( (err) => {
    // if the error is code 11000
    // Then MongoDB has thrown a duplicate key error, username is taken
    console.log("User already exists");
    // return res.status(500).send({ success: false, message: 'User already exist!' });
  })


// mongoose.
// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
