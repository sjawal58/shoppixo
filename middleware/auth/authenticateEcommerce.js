const jwt = require("jsonwebtoken");
const customerDB = require("../../models/auths/customers/customerSchema");
const keysecret = process.env.SECRET_KEY


/** middleware for user authentication. */
const authenticateEcommerce = async (req, res, next) => {

    try {
        /** 
         * -> get the values of header which we pass from frontend in the axios (api). 
         * -> this 'authorization' get values from frontent axio's api.
        */
        const token = req.headers.authorization;

        /** Verifing token with secret key. */
        const verifytoken = jwt.verify(token, keysecret);

        /** accuring the user verified user. */
        const rootUser = await customerDB.findOne({ _id: verifytoken._id });

        if (!rootUser) { throw new Error("User not found") }

        /** Sending Response */
        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next(); /** used to continue the next operation (after middleware operations) */

    } catch (error) {
        res.status(401).json({ status: 401, error: true, message: "Unauthorized no token provide" })
    }
}


module.exports = authenticateEcommerce