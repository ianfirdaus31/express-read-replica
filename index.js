const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
const http = require('http').Server(app)

app.use(cors())

const { regions } = require('./controllers/RegionController');

app.get('/regions', regions);

const port = process.env.PORT || 5000
http.listen(port, () => {
    // array.map(route => console.log(route));
    console.log(`Running and listening on PORT:${port}`)
})