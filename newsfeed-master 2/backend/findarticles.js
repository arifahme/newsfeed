const mongoose = require('mongoose')
const fetch = require ('node-fetch')
const AbortController = require('abort-controller')

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
let database = mongoose.connect("mongodb+srv://cluster0-h3iy9.mongodb.net/test", options)

let Article = require('./models/Article')

// let fetchTimeout = (url,options,timeout=3000) => {
//   return new Promise( (resolve, reject) => {
//     fetch(url, options)
//     .then(resolve,reject)
//     setTimeout(reject,timeout);
//   })
// }

// define a function to get all the articles, given the topic as an input
const getArticles = async (topic) => {
  // pull the response from polytime (takes ~10 seconds)
  console.log("Searching for articles about " + topic)

  const controller = new AbortController()
  const signal = controller.signal
  setTimeout(() => {
    controller.abort()
  }, 20000)

  let url = `https://www.polytime.solutions/${topic}`
  // let url = `https://postman-echo.com/get?foo1=bar1&foo2=bar2`

  response = await fetch(url, { signal })
  articles = await response.json()
  // for each of the articles
  try {
    console.log("Here")
    for (var i = 0; i < articles.length; ++i) {
      console.log("There")
      let article = articles[i]
      // if the body of news content that they contain has more than ~40 words
      if (article.content.length > 200) {
        // save the topic as "parsify" does not do this automatically
        article.topic = topic
        // reformat the name of the source
        article.source = article.source.name
        // create the document in the database
        try {
          let doc = await Article.create(article)
          console.log(doc)
        }
        catch (err) {
          // likely a duplicate key error, possibly a missing parameter error
          console.error(err)
        }
      }
    }
  }
  catch (err) {
    console.error(err)
  }
}

const main = async () => {
  console.log("[Begin Finding Articles]")
  await getArticles("entertainment")
  await getArticles("sports")
  await getArticles("politics")
  await getArticles("technology")
  await getArticles("business")
  await getArticles("science")
  await getArticles("all")
  await mongoose.connection.close( () => {
    console.log("MongoDB Connection Closed")
    console.log("[End Finding Articles]")
    process.exit(0)
  })
}

main()
