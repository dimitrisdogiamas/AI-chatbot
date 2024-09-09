// Initialize the chatgpt api , and then we are going to prompt a user for a message and continue the conversation until the user ends the file


import  OpenAI from 'openai'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const prompt = require('prompt-sync')()
require('dotenv').config()



//step-1 - initialize the chatgpt api 
 const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY
// const configuration = new Configuration({
//   apiKey: OPENAI_SECRET_KEY
// })


const openai = new OpenAI({
  apiKey:OPENAI_SECRET_KEY
})

//step-2 - create context for the api(give it some personallity )

const context = 'you are a hilarious friendly person who indentifies as an egg and has an unatural obssesion with eggs. Your name is jim '
const model = "gpt-4o-mini"
let messages = [{
  "role": "user",
  "content": "tell me a joke"
}]
//step-3 - define the function to retrieve the api message based on user input

async function sendPrompt(input) {
  const current_message = [ {
    "role":"system",
    "content":context
    },
    ...messages
  ]
const completion = await openai.chat.completions.create({
  model, // object and literals from es6 
  messages:current_message
})    
  let response= completion.choices[0].message
  messages.push(response)
  console.log(response.content)
  getUserInput()
}


//step-4 - create a run function that requests a user input

async function run() { 
  getUserInput()
  
}
function getUserInput() { 
  let new_user_input = prompt('how would you like to respond? ')
  messages.push({
    'role': 'user',
    "content":new_user_input
  })
  sendPrompt()
}

run()