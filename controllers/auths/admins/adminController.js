const cloudinary = require('cloudinary').v2;
const AdminAuth = require("../../../models/auths/admins/adminSchema");

exports.createAdmin = async (req, res, next) => {

    /** Receiving data from frontend in body */
    const body = req.body;

    const adminImage = body.adminImage;
    /** 
     * => For storing image/files on server, we use 'multer'.
     * => For storing image on cloud, we use 'cloudinary'.
     * => Cloudinary website Link to storing image: https://cloudinary.com/.
     * ---------------------------------
     * Cloudinary account created on 'zul.........07@gmail.com'
     * */

    /** Uploading image on Cloudinary */
    if (adminImage) {
        const result = await cloudinary.uploader.upload(adminImage, {
            'folder': 'kfc'
        })
        // Get the image link uploaded on cloudinary, and overside the 'adminImage' from body.
        body.adminImage = result.secure_url;
    }

    try {
        const adminCreated = await AdminAuth.create(body);
        // console.log("adminCreated", adminCreated)
        // const admins = await AdminAuth.find({}); // get all admins
        res.json({
            status: true,
            message: "success",
            data: adminCreated, /** Current created admin */
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.getAllAdmin = async (req, res, next) => {
    try {
        const admins = await AdminAuth.find({})
        const allAdmins = admins.filter((seller) => seller?.role == "admin");
        res.json({
            status: true,
            message: "success",
            data: allAdmins,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}


exports.getAllSeller = async (req, res, next) => {
    try {
        const admins = await AdminAuth.find({})
        const allSellers = admins.filter((seller) => seller?.role == "seller");
        res.json({
            status: true,
            message: "success",
            data: allSellers,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.getAdminById = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;

    try {
        const admin = await AdminAuth.findById(id)
        res.json({
            status: true,
            message: "success",
            data: admin,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.updateAdmin = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;

    /** Receiving data from frontend in body */
    const body = req.body;

    try {
        const product = await AdminAuth.findByIdAndUpdate(id, body);
        res.json({
            status: true,
            message: "success",
            // data: product,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.deleteAdmin = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;
    try {
        const admin = await AdminAuth.findById(id);
        admin.remove();
        res.json({
            status: true,
            message: "Admin has been removed",
        })
    } catch (error) {
        res.json({
            status: false,
            message: error,
        })
    }
}
