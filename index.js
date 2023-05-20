const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iutwb2x.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		const db = client.db("disneyDolls");
		const toysCollection = db.collection('Toys');


		app.post("/addAToy", async (req, res) => {
			const body = req.body;

			if (!body) {
				return res.status(404).send({ message: "body data not found" });
			}

			const result = await toysCollection.insertOne(body);
			console.log(result);
			res.send(result);
		})

		app.get("/allToys", async (req, res) => {

			const result = await toysCollection.find({}).limit(20).toArray();
			res.send(result);

		})



		app.put("/updateToy/:id", async (req, res) => {
			const id = req.params.id;
			const body = req.body;
			console.log(body);
			const filter = { _id: new ObjectId(id) };
			const updateDoll = {
				$set: {
					price: body.price,
					quantity: body.quantity,
					description: body.description,
				},
			};
			const result = await toysCollection.updateOne(filter, updateDoll);
			res.send(result);
			console.log(result)
		});

		app.delete('/allToys/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) }
			const result = await toysCollection.deleteOne(query);
			res.send(result);

		})



		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");



	} finally {
		// Ensures that the client will close when you finish/error
		// await client.close();
	}
}
run().catch(console.dir);




app.get('/', (req, res) => {
	res.send('disney dolls is running');
});

app.listen(port, () => {
	console.log(`Disney Dolls is running on port ${port}`);
})