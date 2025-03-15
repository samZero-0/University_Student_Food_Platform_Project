const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
dotenv.config();    
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k2nj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const database = client.db('PlateMate');
        const categoryCollection = database.collection('categories');
        const orderCollection = database.collection('orders');
        const foodCollection = database.collection('foods');
        const mealPlanCollection = database.collection('mealPlan');
        const cookReqCollection = database.collection('cookRequests');
        const cookListCollection = database.collection('cookList');
        const guestOrdersCollection = database.collection('guestOrders')


        app.get('/categories', async (req, res) => {
            const cursor = categoryCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/orders', async (req, res) => {
            const cursor = orderCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post('/orders', async (req, res) => {
            
            const order = req.body;  
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

        app.get('/orders/:email', async (req, res) => {
            const email = req.params.email;
            const query = {userEmail: `${email}`}
            const cursor = orderCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/foods', async (req, res) => {
            const cursor = foodCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post('/foods', async (req, res) => {
            const food = req.body; 
            const result = await foodCollection.insertOne(food);
            res.send(result);

        });

        app.get('/foods/:email', async (req, res) => {
            const email = req.params.email;
            const query = {email: `${email}`}
            const cursor = foodCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post('/guestOrders', async (req, res) => {
            const order = req.body;  
            const result = await guestOrdersCollection.insertOne(order);
            res.send(result);
        });

        app.get('/guestOrders', async (req, res) => {
            const cursor = guestOrdersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });


        

        app.get('/mealPlan', async (req, res) => {
            const cursor = mealPlanCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post('/cookRequests',async(req,res)=>{
            const cookApplication = req.body;
            const result = await cookReqCollection.insertOne(cookApplication);
            res.send(result);
        })
        
        app.get('/cookRequests', async (req, res) => {
            const cursor = cookReqCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post('/cookList',async(req,res)=>{
            const data = req.body;
            const result = await cookListCollection.insertOne(data);
            res.send(result);
        })

        app.get('/cookList', async (req, res) => {
            const cursor = cookListCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.delete('/cookRequests/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cookReqCollection.deleteOne(query);
            res.send(result);
        })



    } finally {
        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('PlateMate Backend Running ')
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})