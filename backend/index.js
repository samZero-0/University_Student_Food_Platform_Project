const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { default: axios } = require("axios");
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


// Store ID: plate67fa009b87ec4
// Store Password (API/Secret Key): plate67fa009b87ec4@ssl


// Merchant Panel URL: https://sandbox.sslcommerz.com/manage/ (Credential as you inputted in the time of registration)


 
// Store name: testplategp15
// Registered URL: https://platemate-3c7a2.web.app/
// Session API to generate transaction: https://sandbox.sslcommerz.com/gwprocess/v3/api.php
// Validation API: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?wsdl
// Validation API (Web Service) name: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php





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
        const featuredItemsCollection = database.collection('featuredItems')
        const paymentCollection = database.collection('payment')


        // payment apis

        app.post('/create-ssl-payment',async (req,res)=>{
            const payment = req.body;
            console.log("payment info",payment);

            const trxid = new ObjectId().toString();

            payment.transactionId = trxid;

            const initiate = {
                store_id : 'plate67fa009b87ec4',
                store_passwd :'plate67fa009b87ec4@ssl',
                total_amount: payment.price,
                currency: 'BDT',
                tran_id: trxid, // use unique tran_id for each api call
                success_url: 'http://localhost:5000/success-payment',
                fail_url: 'http://localhost:5173/fail',
                cancel_url: 'http://localhost:5173/cancel',
                ipn_url: 'http://localhost:5000/ipn-success-payment',
                shipping_method: 'Courier',
                product_name: 'Computer.',
                product_category: 'Electronic',
                product_profile: 'general',
                cus_name: payment.name,
                cus_email:  payment.email,
                cus_add1: 'Dhaka',
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: '01711111111',
                cus_fax: '01711111111',
                ship_name: 'Customer Name',
                ship_add1: 'Dhaka',
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: 1000,
                ship_country: 'Bangladesh',
            }

            const iniResponse = await axios({
                url:'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
                method:'POST',
                data: initiate,
                headers:{
                    "Content-Type" : "application/x-www-form-urlencoded"
                }
            })

            const saveData = await paymentCollection.insertOne(payment)
            // console.log(iniResponse);
            const gateway = iniResponse?.data?.GatewayPageURL;

            console.log("gateway",gateway);

            res.send({gateway})
        })

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

        app.get('/featuredItems', async (req, res) => {
            const cursor = featuredItemsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post('/featuredItems', async (req, res) => {
            try {
                const featuredItems = req.body;
                
                // Clear existing items
                await featuredItemsCollection.deleteMany({});
                
                // If there are items to add, insert them
                if (Array.isArray(featuredItems) && featuredItems.length > 0) {
                    const result = await featuredItemsCollection.insertMany(featuredItems);
                    res.send({
                        success: true,
                        message: 'Featured items updated'
                    });
                } else {
                    res.send({
                        success: true,
                        message: 'Featured items cleared'
                    });
                }
            } catch (error) {
                res.status(500).send({
                    success: false,
                    message: 'Failed to update featured items'
                });
            }
        });
       


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