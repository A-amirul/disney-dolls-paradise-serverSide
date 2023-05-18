const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());





app.get('/', (req, res) => {
	res.send('disney dolls is running');
});

app.listen(port, () => {
	console.log(`Disney Doll is running on port ${port}`);
})