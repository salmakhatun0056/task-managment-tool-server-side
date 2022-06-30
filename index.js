const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});

app.post('/add task', (req, res) => {
    const data = req.body;
    console.log(data)
    res.send({ roles: "25", accessToken: "abcd" })
})

app.listen(port, () => {
    console.log('this is port', port)
});