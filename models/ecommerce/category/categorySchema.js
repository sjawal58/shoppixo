const mongoose = require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category Name is required"],
    },
    show_flash: {
        type: String,
    },
    show_sub_flash: {
        type: String,
    },
    main_flash_title: {
        type: String,
        required: [false, "Flash Title is required"],
    },
    main_flash_text: {
        type: String,
        required: [false, "Flash Text is required"],
    },
    main_flash_image: {
        type: String,
        required: [false, "Flash Image is required"],
    },
    sub_flash_title: {
        type: String,
        required: [false, "Sub Flash Title is required"],
    },
    sub_flash_text: {
        type: String,
        required: [false, "Sub Flash Text is required"],
    },
}, {
    timestamps: true, /** This will automatically get the time, whenever this scheme created or updated.  */
});

/* => It is used to make "_id" key to integer incremental. "_id" is a primary key. */
autoIncrement.initialize(mongoose.connection);
categorySchema.plugin(autoIncrement.plugin, {
    model: "category", // collection or table name in which you want to apply auto increment
    // field: "_id", // field of model which you want to auto increment. If not mention, then automatically use '_id'.
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});


/** Creating Modal */
/** It will create collection of 'Category' */
const Category = mongoose.model("category", categorySchema);
module.exports = Category;

