const { MongoClient } = require("mongodb")
const uri = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(uri)
async function run() {
  try {
    const database = client.db('fruits_db')
    const fruits = database.collection('fruits')
    const query = [
      { 
        name: 'apple',
        score: 8,
        review:'great fruit'
      },
      { 
        name: 'orange',
        score: 6,
        review:'kinda sour'
      },
      { 
        name: 'banana',
        score: 9,
        review:'great stuff!'
      }
    ]
    const result = await fruits.insertMany(query);
    console.log(result)
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
