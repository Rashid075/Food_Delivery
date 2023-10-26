const mongoose=require('mongoose');

const {Schema} =mongoose;

const OrderSchema = new Schema({
    email:{
        type: String,
        required: true,     
    },
    Order_dat:{
        type: Array,
        required: true
    }
})

module.exports= mongoose.model('order', OrderSchema)