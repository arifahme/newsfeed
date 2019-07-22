const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const favicon = require('express-favicon')

// wrapper for MongoDB server access
const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')
// support parsing jsons
app.use(bodyParser.json());

// support session variables
const session = require('cookie-session')
app.use(session({
  secret: "shh",
  maxAge: 24 * 60 * 60 * 1000 // 24 hour cookie is max length it stays
}))

// enable cors for all requests
const cors = require('cors')
app.use(cors())

// load the favicon
app.use(favicon(path.join('./frontend/build/favicon.ico')))

// client can look at our server code ^ .join() defaults to the root directory if none is specified
app.use(express.static(path.join('./frontend/build')))

// import the schemas for the database entries
let User = require('./models/User')
let Article = require('./models/Article')
let Search = require('./models/Search')
let Comment = require('./models/Comment')

// options for the database
let options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  dbName: "newsfeed",
  poolSize: 100,
  user: "pillow",
  pass: "fight"
}

// begin connection to the MongoDB server
mongoose.connect("mongodb+srv://cluster0-h3iy9.mongodb.net/test", options)

// POST request to login a new user
app.post('/login', async (request, response) => {
  console.log("logging in")
  try {
    console.log("user in")
    let user = await User.findOne({
      // query parameters in json
      username: `${request.body.username}`,
      password: `${request.body.password}`
    })
    console.log(user.username)
    console.log(user.password)
    // lean() for plain javascript object
    // callback function for a query, executed when calling query.exec()
    // callback function for a query, executed when calling query.exec()
    request.session.user = user
    let result = {
      success: true
    }
    response.status(200).json(result)
  }
  catch (error) {
    console.log(error.stack)
    request.session = null
    let result = {
      success: false
    }
    response.status(400).json(result)
  }
})

app.get('/logout', async (request, response) => {
  request.session = null
})

app.post('/whoami', async (request, response) => {
  console.log("Who am I request")
  console.log(request.session)
  if (this.session === null) {
    response.status(200).json("{}")
  }
  else {
    response.status(200).json(request.session.user)
  }
})

// POST request to register a new user
app.post('/register', async (request, response) => {
  try {
    let user = new User({
      username: `${request.body.username}`,
      password: `${request.body.password}`,
      firstname: `${request.body.firstname}`,
      lastname: `${request.body.lastname}`
    })
    user = await user.save()
    request.session.user = user
    response.status(200).json(user)
  }
  // or catch the error
  catch (error) {
    console.log(error.stack)
    // if the error is code 11000
    // Then MongoDB has thrown a duplicate key error, username is taken
    return response.status(400).json(error)
  }
})

// POST request to update the user's topic preferences
app.post('/update', async (request, response) => {
  try {
    let user = await User.updateOne(request.session.user, request.body)
    user = user.lean()
    request.session.user = user
    response.status(200).json(user)
  }
  catch (error) {
    console.log(error.stack)
    response.status(500).json(error)
  }
})

// POST request to add a user's comment to the database
app.post('/comment', async (request, response) => {
  // save the comment to the database
  try {
    let comment = await Comment.create({
      content: `${request.body.content}`,
      user: `${request.session.user.username}`
    })
    comment = comment.lean()
    response.status(200).json(comment)
  }
  catch (error) {
    console.log(error.stack)
    response.status(500).json(error)
  }
})

// POST request to add a user's search to the database
app.post('/search', async (request, response) => {
  try {
    if (request.session != null) {
      // add a new search to the database
      let search = await Search.create({
        content: `${request.body.content}`,
        user: `${request.session.user}`
      })
    }
    // find all articles that match the search
    let result = await Article.find({
      title: `${request.body.content}`
    })
    result = result.lean()
    // save the search to the database
    response.status(200).json(result)
  }
  catch (error) {
    console.log(error.stack)
    response.status(500).json(error)
  }
})

app.post('/upvote', async (request, response) => {
  try {
    console.log("[UPVOTE]: ")
    let article = request.body.article
    let score = request.body.score + 1
    let result = await Article.updateOne(request.body, {
      score: request.body.score + 1
    })
    response.status(200).json(result)
  }
  catch (error) {
    console.log(error.stack)
    response.status(500).json(error)
  }
})

app.post('/downvote', async (request, response) => {
  try {
    console.log("[DOWNVOTE]: ")
    let article = request.body.article
    let score = request.body.score + 1
    let result = await Article.updateOne(request.body, {
      score: request.body.score - 1
    })
    response.status(200).json(result)
  }
  catch (error) {
    console.log(error.stack)
    response.status(500).json(error)
  }
})

// POST request to share the user's current article with a phone number
app.post('/share', async (request, response) => {
  let accountSid = process.env.TWILIO_SID
  let authToken = process.env.TWILIO_TOKEN
  let myNumber = process.env.TWILIO_NUMBER

  const client = require('twilio')(accountSid, authToken)
  client.messages
  .create({
    body: `${request.body.message}`,
    from: myNumber,
    to: `${request.body.recipient}`
  })
  .then(message => response.status(200).json(message.sid))
})

// GET request to for recent articles in the "all" category
app.get('/all', async (request, response) => {
  try {
    // find all articles
    let docs = await Article.find({}).lean()
    let result = []
    // only return 50 articles max
    for (let i = 0 ; i < 50 && i < docs.length ; i += 1) {
      result.push(docs[i])
    }
    return response.status(200).json(result)
  }
  catch (err) {
    return response.status(400).json(err)
  }
})

// GET request for recent articles in the "entertainment" category
app.get('/entertainment', async (request, response) => {
  try {
    let docs = await Article.find({
      topic: "entertainment"
    }).lean()
    let result = []
    // only return 50 articles max
    for (let i = 0 ; i < 50 && i < docs.length ; i += 1) {
      result.push(docs[i])
    }
    return response.status(200).json(result)
  }
  catch (err) {
    console.log(error.stack)
    return response.status(400).json(err)
  }
})
// GET request for recent articles in the "sports" category
app.get('/sports', async (request, response) => {
  try {
    let docs = await Article.find({
      topic: "sports"
    }).lean()
    let result = []
    // only return 50 articles max
    for (let i = 0 ; i < 50 && i < docs.length ; i += 1) {
      result.push(docs[i])
    }
    return response.status(200).json(result)
  }
  catch (err) {
    console.log(error.stack)
    return response.status(400).json(err)
  }
})
// GET request for recent articles in the "politics" category
app.get('/politics', async (request, response) => {
  try {
    let docs = await Article.find({
      topic: "politics"
    }).lean()
    let result = []
    // only return 50 articles max
    for (let i = 0 ; i < 50 && i < docs.length ; i += 1) {
      result.push(docs[i])
    }
    return response.status(200).json(result)
  }
  catch (err) {
    console.log(error.stack)
    return response.status(400).json(err)
  }
})
// GET request for recent articles in the "technology" category
app.get('/technology', async (request, response) => {
  try {
    let docs = await Article.find({
      topic: "technology"
    }).lean()
    let result = []
    // only return 50 articles max
    for (let i = 0 ; i < 50 && i < docs.length ; i += 1) {
      result.push(docs[i])
    }
    return response.status(200).json(result)
  }
  catch (err) {
    console.log(error.stack)
    return response.status(400).json(err)
  }
})
// GET request for recent articles in the "business" category
app.get('/business', async (request, response) => {
  try {
    let docs = await Article.find({
      topic: "business"
    }).lean()
    let result = []
    // only return 50 articles max
    for (let i = 0 ; i < 50 && i < docs.length ; i += 1) {
      result.push(docs[i])
    }
    return response.status(200).json(result)
  }
  catch (err) {
    console.log(error.stack)
    return response.status(400).json(err)
  }
})
// GET request for recent articles in the "science" category
app.get('/science', async (request, response) => {
  try {
    let docs = await Article.find({
      topic: "science"
    }).lean()
    let result = []
    // only return 50 articles max
    for (let i = 0 ; i < 50 && i < docs.length ; i += 1) {
      result.push(docs[i])
    }
    return response.status(200).json(result)
  }
  catch (err) {
    console.log(error.stack)
    return response.status(400).json(err)
  }
})

// default redirect, loads the application when the user visits the site
app.get('/', async (req, res) => {
  res.sendFile(path.join('./frontend/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})


// TODO validate the incoming HTTP content for HTTPS

/*

// validate SSL for first article
if (data.articles[i].url.substring(0,5) !== "https" || data.articles[i].urlToImage.substring(0,5) !== "https")
{
console.log(data.articles[i].url)
console.log(data.articles[i].urlToImage)
i-=2
continue // will advance forward one index
}
// validate SSL for second article
else if (data.articles[i+1].url.substring(0,5) !== "https" || data.articles[i+1].urlToImage.substring(0,5) !== "https")
{
console.log(data.articles[i+1].url)
console.log(data.articles[i+1].urlToImage)
i-=1
continue // will advance forward two indeces
}
// validate SSL for third article
else if (data.articles[i+2].url.substring(0,5) !== "https" || data.articles[i+2].urlToImage.substring(0,5) !== "https")
{
console.log(data.articles[i+2].url)
console.log(data.articles[i+2].urlToImage)
continue // will advance forward three indeces
}

*/
