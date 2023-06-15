const express = require('express');
const router = express.Router();
const adminDB = require("../../models/auths/admins/adminSchema");
const customerDB = require("../../models/auths/customers/customerSchema");
var bcrypt = require("bcryptjs");
const authenticateDashboard = require("../../middleware/auth/authenticateDashboard");
const authenticateEcommerce = require("../../middleware/auth/authenticateEcommerce");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { loginDashboard, validUserDashboard, logoutDashboard } = require("../../controllers/auths/loginDashboardController")
const { loginEcommerce, validUserEcommerce, logoutEcommerce } = require("../../controllers/auths/logineEcommerceController")

const keysecret = process.env.SECRET_KEY

/** Dasboard Login */
router.route("/login-dashboard").post(loginDashboard);

/** Ecommerce Login */
router.route("/login").post(loginEcommerce);

/** User Valid => Check if user is valid or not.  */
/** 'authenticate' is a middleware. */
/**
 * -> When this 'validuser' api call, then it first goto to the middleware's 'authenticate' method.
 *    and then togo callback.
 */
// router.route("/validuser-dashboard").get(authenticateDashboard, validUserDashboard);
router.get("/validuser-dashboard", authenticateDashboard, async (req, res) => {
    try {
        /** this 'userId' comes from middleware's response. */
        const ValidUserOne = await adminDB.findOne({ _id: req.userId });
        console.log(ValidUserOne)
        res.status(201).json({ status: 201, success: true, data: ValidUserOne });
    } catch (error) {
        res.status(401).json({ status: 401, error: true, message: error });
    }
});

/** Ecommerce/Customer Validator */
router.get("/validuser", authenticateEcommerce, async (req, res) => {
    try {
        /** this 'userId' comes from middleware's response. */
        const ValidUserOne = await customerDB.findOne({ _id: req.userId });
        console.log(ValidUserOne)
        res.status(201).json({ status: 201, success: true, data: ValidUserOne });
    } catch (error) {
        res.status(401).json({ status: 401, error: true, message: error });
    }
});

/** Dasboard Logout */
router.route("/logout-dashboard").get(authenticateDashboard, logoutDashboard)

/** Ecommerce/Customer Logout */
router.route("/logout").get(authenticateEcommerce, logoutEcommerce)



module.exports = router;

// 2 way connection
// 12345 ---> e#@$hagsjd
// e#@$hagsjd -->  12345

// hashing compare
// 1 way connection
// 1234 ->> e#@$hagsjd
// 1234->> (e#@$hagsjd,e#@$hagsjd)=> true