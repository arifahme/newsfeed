import fetch from 'node-fetch'

export async function upvote (article) {
  try {
    let request = {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await fetch (`/upvote`, request)
  }
  catch (error) {
    console.log("[ERROR] increaseScore()")
  }
}

export async function downvote (article) {
  try {
    let request = {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await fetch (`/downvote`, request)
  }
  catch (error) {
    console.log("[ERROR] decreaseScore()")
  }
}

export async function whoami () {
  try {
    let request = {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let response = await fetch ('/whoami', request)
    let output = await response.json()
    if (Object.keys(output).length === 0){
      return null
    }
    else {
      return output
    }
  }
  catch (error) {
    console.log(error.stack)
    return null
  }
}
