const mongoose = require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const productSchema = new Schema({
    seller_id: {
        type: String,
        required: [true, "Seller Id is required"],
    },
    category_id: {
        type: String,
        required: [true, "Product Category is required"],
    },
    name: {
        type: String,
        required: [true, "Product Name is required"],
    },
    prod_price: {
        type: String,
        required: [true, "Product Price is required"],
    },
    discount_available: {
        type: String,
        required: [true, "Discount Availability is required"],
    },
    discount_percentage: {
        type: String,
    },
    stock: {
        type: String,
        required: [true, "Stock is required"],
    },
    description: {
        type: String,
        required: [false, "Description is required"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    product_gallery: {
        type: Array,
    }
}, {
    timestamps: true, /** This will automatically get the time, whenever this schema created or updated.  */
});


/* => It is used to make "_id" key to integer incremental. "_id" is a primary key. */
autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, {
    model: "product", // collection or table name in which you want to apply auto increment
    // field: "_id", // field of model which you want to auto increment, if not mention, then automatically use '_id'.
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

/** Creating Modal */
/** It will create collection of 'product' */
const Product = mongoose.model("product", productSchema);
module.exports = Product;

