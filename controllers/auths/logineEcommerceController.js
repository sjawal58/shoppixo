const CustomerDB = require("../../models/auths/customers/customerSchema");
const authenticateEcommerce = require("../../middleware/auth/authenticateEcommerce");

exports.loginEcommerce = async (req, res, next) => {

    /** Receiving data from frontend in body */

    const { email, password } = req.body;
    // const { email, password } = req.query;

    // console.log(req.body)

    /** Adding Headers */
    // res.setHeader('Content-Type', 'application/json');

    if (!email) {
        res.status(422).json({ error: true, message: "Please enter your email" })
    } else if (!password) {
        res.status(422).json({ error: true, message: "Please enter password" })
    } else if (!email && !password) {
        res.status(422).json({ error: true, message: "Fill all the details" })
    }

    try {
        const userValid = await CustomerDB.findOne({ email: email });
        // console.log("userValid", userValid)

        if (userValid) {

            if (password != userValid.password) {
                res.status(422).json({
                    success: false,
                    error: true,
                    message: "Password not matched"
                })
            } else {
                /** Token Generate (JWT: JSON Web Token) */
                /** defining this "generateEcommerceAuthtoken()" function in the  user schema. */
                /** passing 'req.query' as a parameters in generateEcommerceAuthtoken for custom use, otherwise no need for this.  */
                const token = await userValid.generateEcommerceAuthtoken(req.query);
                // console.log(token)

                /** cookiegenerate */
                /** new Date(Date.now() + 9000000) = 15 mins (may not valid) */
                /** new Date(Date.now() + 900000) = 15 mins */
                /** new Date(Date.now() + 90000) = 1.5 mins */
                /** new Date(Date.now() + 900000000) = 10 days */
                res.cookie("eccom_usercookie", token, {
                    expires: new Date(Date.now() + 900000000), /** Expiry Time  */
                    httpOnly: true
                });

                const data = {
                    userValid,
                    token
                }
                res.status(201).json({
                    status: true,
                    success: true,
                    message: "success",
                    data: data,
                })
            }
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                error: true,
                message: "User not found"
            });
        }

    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.validUserEcommerce = async (req, res) => {
    try {
        /** this 'userId' comes from middleware's response. */
        const ValidUserOne = await CustomerDB.findOne({ _id: req.userId });
        res.status(201).json({
            status: 201,
            success: true,
            data: ValidUserOne
        });
    } catch (error) {
        res.status(401).json({
            status: 401,
            success: false,
            error: true,
            message: error,
            data: null,
        });
    }
}

exports.logoutEcommerce = async (req, res) => {
    try {
        /** 'rootUser' from authenticate middleware. */
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            /** removing valid token from database. */
            /** curelem.token => token comming from database. */
            /** req.token => token of authenticate (coming from frontend) */
            return curelem.token !== req.token
        });

        // req.rootUser.tokens = []; /** remove all tokens array */

        res.clearCookie("eccom_usercookie", { path: "/" }); /** clear/remove the cookie */

        req.rootUser.save(); /** As token values are updating, therefore we use 'save()' method here. */

        res.status(201).json({ status: 201 })

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}

