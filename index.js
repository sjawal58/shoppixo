const express = require('express');
const app = express();
require('dotenv').config(); /** Not need to store this in a variable.  */
const connectDatabase = require('./db/conn');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const cloudinary = require('cloudinary').v2;
const PORT = 9009;

/** Importing Routes */
const admins = require('./routes/auths/admins/admins');
const customers = require('./routes/auths/customers/customers');
const login = require("./routes/auths/login")
const products = require('./routes/ecommerce/products/products');
const category = require('./routes/ecommerce/category/category');
const orders = require('./routes/auths/customers/orders');
/** **************** */

connectDatabase(); /** Connect database */

app.use(cors())
/** 
 => Use 'bodyParser' as a global middleware in 'app.use'.
 => parse application/json.
*/
// app.use(bodyParser.json());
app.use(bodyParser({ limit: '50mb' })); // limit the size of image
app.use(express.urlencoded({ extended: true }));

/** Mounting the routes in 'app.use' */
app.use('/api', admins);
app.use('/api', customers);
app.use('/api', login);
app.use('/api', products);
app.use('/api', category)
app.use('/api', orders)

// app.get("/", (req, res) => {
//     res.status(201).json("Server Created");
// })

/** cloudinary configuration for upload images on cloud server (https://cloudinary.com/) */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

/** 
 => This is the middleware for Error Handling.
 => Write error handling, at the end of all middlewares. 
 => The callback functionm which is using 4 arguments (err, req, res, next), these arguments should be the last
    of all the middlewares.
 * */
app.use((err, req, res, next) => {
    let error = { ...err }
    error.message = err.message;

    // Wrong Moongose Object ID Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new Error(message);
    }

    /** 
     => Handling Moongose Validation Error
     => These error messages are those which are defined in the schema, while validation.
     */
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(value => value.message);
        error = new Error(message);
    }

    // Handling Moongose duplicate key errors
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} already exists`;
        error = new Error(message);
    }
    // Handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid. Try Again!!!`;
        error = new Error(message);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
    })
})

/** Starting the server. */
app.listen(PORT, () => {
    console.log(`Server is listening on port no:`, PORT);
})
