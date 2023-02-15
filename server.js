import {ChatGPTAPIBrowser}  from 'chatgpt'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

//Connecting the server with the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// process.env.PUPPETEER_EXECUTABLE_PATH = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'

//creating a schema for the object in mongoDB
const blogCollectionSchema = new mongoose.Schema({
  data: String,
});


const blogCollection = mongoose.model('BlogCollection', blogCollectionSchema);

async function example() {
  // use puppeteer to bypass cloudflare (headful because of captchas)
  const api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL,
    password: process.env.OPENAI_PASSWORD,
    isGoogleLogin: true
  })

  await api.initSession()
  
  function generateBlog() {

  let firstResponse;

  api.sendMessage(`Please generate an in-depth blog on LeetCode question number 4 in markdown format. The blog should cover the problem statement, examples, solution with multiple approaches if applicable along with code and time and space complexity analysis with explanation, edge cases, conclusion, tips, similar questions with link. Make it in about 1700 words`)
      .then(result => {
          firstResponse = result;
          return api.sendMessage('continue', {
            conversationId: firstResponse.conversationId,
            parentMessageId: firstResponse.messageId
          });
      })
      .then(secondResponse => {
          let res1 = firstResponse.response
          let res2 = secondResponse.response

          let result = res1.concat(res2)
          console.log(result)
          const newObject = { data : result};

          // Create a new document from the object
          const newDoc = new blogCollection(newObject);

          // Save the document to the collection
          newDoc.save((err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Successfully added blog to the collection.`);
            }
          });
      })
      .catch(err => console.log(err));
  }
  // this function could be called X times using a setInterval()
  generateBlog()
}
await example()