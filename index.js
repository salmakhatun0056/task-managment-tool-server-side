const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ocpmo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const tasksCollention = client.db('taskManager').collection('task')

        app.get('/get-task', async (req, res) => {
            const tasks = await tasksCollention.find({}).toArray()
            res.send(tasks)
        });
        app.get('/get-task/:id', async (req, res) => {
            const { id } = req.params;
            const filter = { _id: ObjectId(id) }
            const tasks = await tasksCollention.findOne(filter)
            console.log(tasks)
            res.send(tasks)
        });

        app.post('/add-task', async (req, res) => {
            const data = req.body
            console.log(data)
            const result = await tasksCollention.insertOne(data)
            res.send(result)
        })

        app.put('/update-task/:id', async (req, res) => {
            const { id } = req.params
            const data = req.body
            const filter = { _id: ObjectId(id) }
            const updateDoc = { $set: data }
            const option = { upsert: true }
            const result = await tasksCollention.updateOne(filter, updateDoc, option)
            res.send(result)
        })
    } finally {
    }
}
run().catch(console.dir);

app.post('/add task', (req, res) => {
    const data = req.body;
    console.log(data)
    res.send({ roles: "25", accessToken: "abcd" })
})

app.listen(port, () => {
    console.log('this is port', port)
});