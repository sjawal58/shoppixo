const cloudinary = require('cloudinary').v2;
const CustomerAuth = require("../../../models/auths/customers/customerSchema");

exports.createCustomer = async (req, res, next) => {

    /** Receiving data from frontend in body */
    const body = req.body;

    const customerImage = body.customerImage;
    /** 
     * => For storing image/files on server, we use 'multer'.
     * => For storing image on cloud, we use 'cloudinary'.
     * => Cloudinary website Link to storing image: https://cloudinary.com/.
     * ---------------------------------
     * Cloudinary account created on 'zul.........07@gmail.com'
     * */

    /** Uploading image on Cloudinary */
    if (customerImage) {
        const result = await cloudinary.uploader.upload(customerImage, {
            'folder': 'kfc'
        })
        // Get the image link uploaded on cloudinary, and overside the 'customerImage' from body.
        body.customerImage = result.secure_url;
    }

    try {
        const customerCreated = await CustomerAuth.create(body);
        // console.log("customerCreated", customerCreated)
        // const admins = await CustomerAuth.find({}); // get all admins
        res.json({
            status: true,
            message: "success",
            data: customerCreated, /** Current created admin */
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.getAllCustomer = async (req, res, next) => {
    try {
        const customers = await CustomerAuth.find({})
        res.json({
            status: true,
            message: "success",
            data: customers,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.getCustomerById = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;

    try {
        const customer = await CustomerAuth.findById(id)
        res.json({
            status: true,
            message: "success",
            data: customer,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.updateCustomer = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id || req.body.customer_id;

    /** Receiving data from frontend in body */
    const body = req.body;

    try {
        const customer = await CustomerAuth.findById(id);

        if (customer) {
            const newData = {
                ...customer._doc,
                firstname: body?.firstname,
                lastname: body?.lastname,
                phone_number: body?.phone_number,
                date_of_birth: body?.date_of_birth,
                gender: body?.gender,
            }
            const updatedCustomer = await CustomerAuth.findByIdAndUpdate(id, newData);
            res.json({
                status: true,
                message: "User Profile Updated!!",
                // data: updatedCustomer,
            })
        } else {
            res.json({
                status: false,
                message: "No Customer Found",
                // data: updatedCustomer,
            })
        }

    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.updateCustomerDevilery = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id || req.body.customer_id;

    /** Receiving data from frontend in body */
    const body = req.body;

    try {
        const customer = await CustomerAuth.findById(id);

        if (customer) {
            const newData = {
                ...customer._doc,
                phone_number: body?.phone_number,
                address: body?.address,
                province: body?.province,
                city: body?.city,
                delivery_label: body?.delivery_label,
            }
            const updatedCustomerDelivery = await CustomerAuth.findByIdAndUpdate(id, newData);
            res.json({
                status: true,
                message: "Delivery Address Updated!!",
                // data: updatedCustomer,
            })
        } else {
            res.json({
                status: false,
                message: "No Customer Found",
                // data: updatedCustomer,
            })
        }

    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.deleteCustomer = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;
    try {
        const customer = await CustomerAuth.findById(id);
        customer.remove();
        res.json({
            status: true,
            message: "Customer has been removed",
        })
    } catch (error) {
        res.json({
            status: false,
            message: error,
        })
    }
}
