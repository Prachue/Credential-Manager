// const express = require('express')
// const dotenv = require('dotenv')
// const { MongoClient } = require('mongodb'); // import { MongoClient } from 'mongodb'
// const bodyparser = require('body-parser') 

// dotenv.config()
// // console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working

// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// const dbName = 'passop'; // Database Name
// const app = express()
// const port = 3000
// app.use(bodyparser.json)

// await client.connect();
// const db = client.db(dbName);

// // TO GET A PASSWORD
// app.get('/', async (req, res) => {
//     const collection = db.collection('documents');
//     const findResult = await collection.find({}).toArray();
//     res.json(findResult)
// })

// // TO SAVE A PASSWORD
// app.post('/', async (req, res) => {
//     const collection = db.collection('documents');
//     const findResult = await collection.find({}).toArray();
//     res.send(req.body)
// })

// // TO DELETE A PASSWORD

// app.listen(port, () => {
//     console.log(`Example app listening on port http://localhost:${port}`)
// }) 

// startServer();







// CHATGPT CODE


const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser'); 

dotenv.config();
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passop'; // Database Name
const app = express();
const port = 3000;

app.use(bodyparser.json());

// Use an async function for setting up the database connection
async function startServer() {
  try {
    await client.connect(); // Connect to MongoDB
    const db = client.db(dbName);

    // TO GET A PASSWORD
    app.get('/', async (req, res) => {
      const collection = db.collection('documents');
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    });

    // TO SAVE A PASSWORD
    app.post('/', async (req, res) => {
      const collection = db.collection('documents');
      await collection.insertOne(req.body); // Assuming you want to save the password
      res.send(req.body);
    });

    // TO DELETE A PASSWORD
    app.delete('/', async (req, res) => {
      const collection = db.collection('documents');
      await collection.deleteOne({ _id: req.body._id }); // Assuming password has an _id
      res.send(`Password with ID ${req.body._id} deleted`);
    });

    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Start the server
startServer();
