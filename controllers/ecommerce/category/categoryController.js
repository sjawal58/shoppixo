const CategorySchema = require("../../../models/ecommerce/category/categorySchema");

exports.createCategory = async (req, res, next) => {

    /** Receiving data from frontend in body */
    const body = req.body;
    const name = req.body.name;

    try {

        /** Checking the "name" in the collection(database) of "categories" */
        CategorySchema.findOne({ name }, async (err, docData) => {
            if (err) throw err;
            if (docData) {
                res.json({
                    status: false,
                    message: "Category Name already exists",
                })
                /** return jahan pr aata ha, us sy agay code stop ho jata ha. */
                return;
            } else {
                /** If there is unique name */
                const categoryCreated = await CategorySchema.create(body);
                res.json({
                    status: true,
                    message: "success",
                    data: categoryCreated,
                })
                return;
            }
        })

        // const categoryCreated = await CategorySchema.create(body);
        // res.json({
        //     status: true,
        //     message: "success",
        //     data: categoryCreated,
        // })

    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.getAllCategory = async (req, res, next) => {
    try {
        const categories = await CategorySchema.find({})
        res.json({
            status: true,
            message: "success",
            data: categories,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.getCategoryById = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;

    try {
        const category = await CategorySchema.findById({ _id: id })
        if(category) {
            res.json({
                status: true,
                message: "success",
                data: category,
            })
        } else {
            res.json({
                status: false,
                message: "No Category Found",
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


exports.updateCategory = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;

    /** Receiving data from frontend in body */
    const body = req.body;

    const name = req.body.name;

    try {

        const allCategories = await CategorySchema.find({})

        /** Filter/Get all categories except the current category. */
        const otherCategories = allCategories.filter((item) => item._id != id)
        /** Checking the "name" in the collection(database) of "categories" */
        const nameCheck = otherCategories.some((item) => item?.name == name)

        if (nameCheck) {
            res.json({
                status: false,
                message: "Category Name already exists",
            })
            /** return jahan pr aata ha, us sy agay code stop ho jata ha. */
            return;
        } else {
            /** If there is unique name */
            const category = await CategorySchema.findByIdAndUpdate(id, body);
            res.json({
                status: true,
                message: "success",
                data: category,
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


exports.deleteCategory = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;
    try {
        const category = await CategorySchema.findById(id);
        category.remove();
        res.json({
            status: true,
            message: "Category has been removed",
        })
    } catch (error) {
        res.json({
            status: false,
            message: error,
        })
    }
}
