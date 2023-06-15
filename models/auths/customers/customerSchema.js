const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const autoIncrement = require("mongoose-auto-increment");

const keysecret = process.env.SECRET_KEY

const customerSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "First Name is required"],
        minLength: [3, "Atleast 3 characters required"],
    },
    lastname: {
        type: String,
        required: [false, "Last Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, /** Every email must be unique */
        validate(value) {
            /** Check email is valid or not. */
            if (!validator.isEmail(value)) {
                throw new Error("Email not valid")
            }
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    phone_number: {
        type: String,
    },
    date_of_birth: {
        type: String,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    province: {
        type: String,
    },
    city: {
        type: String,
    },
    delivery_label: {
        type: String,
    },
    customerImage: {
        type: String,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    /** verify token (while password-reset) */
    verifytoken: {
        type: String,
    }
}, {
    timestamps: true, /** This will automatically get the time, whenever admin created or update.  */
});

/** 
 jsonwebtoken:
 => expiresIn: expressed in seconds or a string describing a time span 
 Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. 
 If you use a string be sure you provide the time units (days, hours, etc), 
 otherwise milliseconds unit is used by default ("120" is equal to "120ms").
*/
/** expiresIn: '365d', // expires in 365 days (1y - 1 year) */
/** expiresIn: '30d', // expires in 30 days (1 month) */
/** Token Generate */
/** 
 * -> This 'methods' is the the instance method of mongodb.
 * -> sign(payload, keysecret, callback) 
 * -> 'this._id' get the current _id from 'userValid' on router page. 
 * -> 'keysecret' is any key containing 32 wrods. (Any alphabets, alphanumeric, etc)
 * */
customerSchema.methods.generateEcommerceAuthtoken = async function (req) {
    // console.log("generateEcommerceAuthtoken-req", req)   

    const isRememberMe = req.remember_me;
    var expiryTimeSet = null;
    if (isRememberMe && isRememberMe == 'true' || isRememberMe == true) {
        expiryTimeSet = "30d"
    } else {
        // expiryTimeSet = "48h"
        expiryTimeSet = "10d"
    }

    console.log("generateEcommerceAuthtoken--remember_me", isRememberMe)
    console.log("generateEcommerceAuthtoken--expiryTimeSet", expiryTimeSet)

    try {
        let token23 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: expiryTimeSet, /** Time limit */
            // expiresIn: 60, /** Time limit (in seconds) */
        });

        /** 
         * Saving tokens in the array of token. 
         * 'this.token' is the array created in the schema.
        */
        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json({ success: false, error: true, message: error, })
    }
}


/* => It is used to make "_id" key to integer incremental. "_id" is a primary key. */
autoIncrement.initialize(mongoose.connection);
customerSchema.plugin(autoIncrement.plugin, {
    model: "customer", // collection or table name in which you want to apply auto increment
    // field: "_id", // field of model which you want to auto increment. If not mention, then automatically use '_id'.
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});


/** Creating Modal */
/** It will create collection of 'admin' */
const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;

