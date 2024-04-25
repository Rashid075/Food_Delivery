const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Shaik_Rashid:Rashid_123@cluster0.3z8zwwm.mongodb.net/gofood?retryWrites=true&w=majority';

router.post('/foodData', async (req, res) => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, { useNewUrlParser: true });

        // Fetch data from the "food_items" collection
        const collection = mongoose.connection.db.collection("food_items");
        const fetchedData = await collection.find({}).toArray();

        // Fetch data from the "food_category" collection
        const FoodCategory = mongoose.connection.db.collection("food_category");
        const catData = await FoodCategory.find({}).toArray();

        // Assign fetched data to global variables
        global.food_items = fetchedData;
        global.FoodCategory = catData;

        // Send response with fetched data
        res.send([fetchedData, catData]);
        console.log(fetchedData)
        console.log(catData)

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
