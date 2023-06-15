const mongoose = require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const orderSchema = new Schema({
    customer_id: {
        type: String,
    },
    payment_method: {
        type: String,
    },
    delivery_address: {
        // type: String,
    },
    orders_list: {
        // type: String,
    },
}, {
    timestamps: true, /** This will automatically get the time, whenever this scheme created or updated.  */
});

/* => It is used to make "_id" key to integer incremental. "_id" is a primary key. */
autoIncrement.initialize(mongoose.connection);
orderSchema.plugin(autoIncrement.plugin, {
    model: "orders", // collection or table name in which you want to apply auto increment
    // field: "_id", // field of model which you want to auto increment. If not mention, then automatically use '_id'.
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});


/** Creating Modal */
/** It will create collection of 'Category' */
const Orders = mongoose.model("orders", orderSchema);
module.exports = Orders;

