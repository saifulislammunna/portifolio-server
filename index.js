const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()

const cors = require('cors');
require('dotenv').config()


const app = express()
const port =  process.env.PORT || 5000;


// middleware
 app.use(cors());
 app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u6dke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri);


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        console.log('database connected');
        const database = client.db('portfolio');

        const workCollection = database.collection('works');

        const listCollection = database.collection('lists')
        const testimonialsCollection = database.collection('testimonials')


        
         // GET works API 
         app.get('/works', async(req, res) => {
            const cursor = workCollection.find({});
            const works = await cursor.toArray();
            res.send(works);

        });
         // GET works API 
         app.get('/lists', async(req, res) => {
            const cursor = listCollection .find({});
            const lists = await cursor.toArray();
            res.send(lists);

        });
         // GET testimonials API 
         app.get('/testimonials', async(req, res) => {
            const cursor = testimonialsCollection.find({});
            const testimonials = await cursor.toArray();
            res.send(testimonials);

        });

    }
    finally{
        // await client.close()
    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})