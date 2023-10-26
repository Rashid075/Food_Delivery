const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Shaik_Rashid:Rashid_123@cluster0.3z8zwwm.mongodb.net/gofood?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected to Database');

    // Fetch data from the "food_items" collection
    const collection = mongoose.connection.db.collection("food_items");
    const fetchedData = await collection.find({}).toArray();

    // Fetch data from the "food_category" collection
    const FoodCategory = mongoose.connection.db.collection("food_category");
    const catData = await FoodCategory.find({}).toArray();

    // Assign fetched data to global variables
    global.food_items = fetchedData;
    global.FoodCategory = catData;

    // console.log('Fetched data:', global.food_items);
    // console.log('Fetched categories:', global.FoodCategory);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports=mongoDB(); // Call the function to connect and fetch data
