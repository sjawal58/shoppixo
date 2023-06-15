const cloudinary = require('cloudinary').v2;
const ProductSchema = require("../../../models/ecommerce/products/productSchema");
const AdminSchema = require("../../../models/auths/admins/adminSchema");
const CategorySchema = require("../../../models/ecommerce/category/categorySchema");

exports.createProduct = async (req, res, next) => {

    /** Receiving data from frontend in body */
    // const body = req.body;
    const body = {
        ...req.body,
        product_gallery: JSON.parse(req.body.product_gallery)
    };

    const name = req.body.name;

    let seller_id = body.seller_id;

    try {

        /** is ma saray seller/admin aa jayn gay */
        const seller_list = await AdminSchema.find({});
        /** ye seller_id ko admins/seller ke database ma check kry ga */
        const seller_id_check = seller_list.find((item) => item._id == seller_id);

        if (seller_id_check) {
            /** Checking the "name" in the collection(database) of "categories" */
            ProductSchema.findOne({ name }, async (err, docData) => {
                if (err) throw err;
                if (docData) {
                    res.json({
                        status: false,
                        message: "Product Name already exists",
                    })
                    /** return jahan pr aata ha, us sy agay code stop ho jata ha. */
                    return;
                } else {
                    /** If there is unique name */
                    const productCreated = await ProductSchema.create(body);
                    res.json({
                        status: true,
                        message: "success",
                        data: productCreated,
                    })
                    return;
                }
            })
        } else {
            /** agr seller_id sahe na hoe to ye error show kry ga */
            res.json({
                status: false,
                message: "Invalid Seller Id",
                data: {},
            })
        }

    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.getAllSellerProduct = async (req, res, next) => {

    const seller_id = req.params.seller_id;

    try {
        // const products = await ProductSchema.find({})
        const products = await ProductSchema.find({ seller_id })
        res.json({
            status: true,
            message: "success",
            data: products,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await ProductSchema.find({})
        res.json({
            status: true,
            message: "success",
            data: products,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.deleteProductGallery = async (req, res, next) => {

    const product_id = req.params.product_id;
    const image_id = req.params.id;

    try {
        const product = await ProductSchema.findById(product_id);

        const findImage = product?.product_gallery.some(item => item?.id == image_id)

        const new_product_gallery = product?.product_gallery.filter(item => item?.id != image_id);

        if (findImage) {
            /** Updating / Deleting one entitity from an array of objects. */
            await ProductSchema.updateOne(
                { _id: product_id },
                { $pull: { product_gallery: product?.product_gallery } },
                (err, result) => {
                    if (err) throw err;
                    console.log(`Deleted ${result.deletedCount} item(s).`);

                    ProductSchema.updateOne(
                        { _id: product_id },
                        { $set: { product_gallery: new_product_gallery } },
                        (err, result) => {
                            if (err) throw err;
                            console.log(`Updated ${result.modifiedCount} item(s).`);
                        }
                    );
                }
            );

            res.json({
                status: true,
                message: "success",
                data: "Product image have been deleted!!",
            })
        } else {
            res.json({
                status: true,
                message: "success",
                data: "Image Id not found...",
            })
        }

    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.getProductById = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;

    try {
        const product = await ProductSchema.findById(id)
        res.json({
            status: true,
            message: "success",
            data: product,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.getProductsBySellerCategory = async (req, res, next) => {
    /** req.params.seller_id => this 'seller_id' is the seller_id written in routes i.e '/:seller_id/:category_id' */
    const seller_id = req.params.seller_id;
    const category_id = req.params.category_id;

    /** Receiving data from frontend in body */
    const body = req.body;

    try {
        /** is ma saray seller/admin aa jayn gay */
        const seller_list = await AdminSchema.find({});
        /** ye seller_id ko admins/seller ke database ma check kry ga */
        const seller_id_check = seller_list.find((item) => item._id == seller_id);

        if (seller_id_check) {
            // CategorySchema

            try {
                const allProducts = await ProductSchema.find({})
                const products = allProducts.filter((item) => item.seller_id == seller_id && item.category_id == category_id)
                if (products && products.length > 0) {
                    res.json({
                        status: true,
                        message: "success",
                        data: products,
                    })
                } else {
                    res.json({
                        status: false,
                        message: "No products found with this category-id",
                        data: [],
                    })
                }
            } catch (error) {
                /** It call the next available middleware in a queue (List).
                 * It means the last middleware.
                 */
                next(error);
            }

        } else {
            /** agr seller_id sahe na hoe to ye error show kry ga */
            res.json({
                status: false,
                message: "Seller Id not found",
                data: {},
            })
        }

    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.getProductsByCategory = async (req, res, next) => {

    try {
        const categories = await CategorySchema.find({})
        const allProducts = await ProductSchema.find({})

        let newProductsList = [];

        categories.map((category) => {
            const productsList = allProducts.filter((item) => item.category_id == category._id)
            newProductsList.push({
                category: {
                    category_id: category?._id,
                    name: category?.name,
                    show_flash: category?.show_flash,
                    show_sub_flash: category?.show_sub_flash,
                    main_flash_title: category?.main_flash_title,
                    main_flash_text: category?.main_flash_text,
                    main_flash_image: category?.main_flash_image || null,
                    sub_flash_title: category?.sub_flash_title,
                    sub_flash_text: category?.sub_flash_text,
                },
                products: productsList
            })
        })

        if (newProductsList && newProductsList.length > 0) {
            res.json({
                status: true,
                message: "success",
                data: newProductsList,
            })
        } else {
            res.json({
                status: false,
                message: "Products List is empty",
                data: [],
            })
        }
    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;

    /** Receiving data from frontend in body */
    // const body = req.body;
    // const body = {
    //     ...req.body,
    //     product_gallery: JSON.parse(req.body.product_gallery)
    // };

    const name = req.body.name;

    try {

        const allProducts = await ProductSchema.find({})

        /** Filter/Get all products except the current product. */
        const otherProducts = allProducts.filter((item) => item._id != id)
        /** Checking the "name" in the collection(database) of "categories" */
        const nameCheck = otherProducts.some((item) => item?.name == name)

        const getProdById = await ProductSchema.findById(id)
        const stored_product_gallery = getProdById.product_gallery

        const new_product_gallery = JSON.parse(req.body.product_gallery)

        const body = {
            ...req.body,
            product_gallery: [...stored_product_gallery, ...new_product_gallery,]
        };

        if (nameCheck) {
            res.json({
                status: false,
                message: "Product Name already exists",
            })
            /** return jahan pr aata ha, us sy agay code stop ho jata ha. */
            return;
        } else {
            /** If there is unique name */
            const product = await ProductSchema.findByIdAndUpdate(id, body);
            res.json({
                status: true,
                message: "success",
                data: product,
            })
            return;
        }

    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}


exports.deleteProduct = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;
    try {
        const product = await ProductSchema.findById(id);
        product.remove();
        res.json({
            status: true,
            message: "Product has been removed",
        })
    } catch (error) {
        res.json({
            status: false,
            message: error,
        })
    }
}
