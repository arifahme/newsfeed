import fetch from 'node-fetch'
fetch('https://www.polytime.solutions/sports')
.then( (results) => {
  console.log(results)
})
