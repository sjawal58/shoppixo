/** Connection with MoongoDB */
/** Congiguration of Mongoose */
const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);

const connectDatabase = async () => {
    /** An async callback function */
    /**
     1. mongodb://localhost:27017 => Moongose Localhost 
     2. /shoppoxo_db => Moongose Databse Name 
     */
    /** This 'uri' is the mongodb uri */
    const uri = process.env.ATLAS_URI;
    const uri_compass = process.env.ATLAS_URI_COMPASS;
    mongoose.connect(uri_compass, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false // set useFindAndModify option to false
    })

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully!!! 👍👍👍")
    })
    connection.once('error', (err) => {
        console.log("MongoDB connection failed...  😒😒😒");
        console.log("MongoDB-connection-error: ", err)
    })

    // try {
    //     mongoose.connect('mongodb://localhost:27017/kfc', { useNewUrlParser: true })
    //         .then((con) => {
    //             console.log("MongoDB is Connected!!!")
    //         })
    // } catch (error) {
    //     console.log("Moongose Error:", error);
    // }
}

module.exports = connectDatabase

