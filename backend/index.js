const express= require('express');
const app=express();
const port=5000;
const mongoDB=require('./db');
const cors=require('cors')

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

let corsOptions = {
    origin: ["https://food-delivery-olive.vercel.app"],
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
  };

app.use("*", cors(corsOptions));

app.use(express.json());    
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, ()=>{
    console.log(`Server is running on '${port}`);
})