const OrderSchema = require("../../../models/auths/customers/orderSchema");
const CustomerSchema = require("../../../models/auths/customers/customerSchema");

exports.createOrder = async (req, res, next) => {

    /** Receiving data from frontend in body */
    let body = req.body;

    console.log('fromData', body)

    try {
        const orderCreated = await OrderSchema.create(body);
        res.json({
            status: true,
            message: "Order Placed Successfully",
            data: orderCreated,
        })

    } catch (error) {
        /** It call the next available middleware in a queue (List).
         * It means the last middleware.
         */
        next(error);
    }
}

exports.getOrdersByCustomerId = async (req, res, next) => {
    /** req.params.customer_id => this 'customer_id' is the id written in routes i.e '/:customer_id' */
    const customer_id = req.params.customer_id;

    try {
        const orders = await OrderSchema.find({})
        // const customersList = await CustomerSchema.find({});

        const customerOrders = orders?.filter((item) => item?.customer_id == customer_id)
            .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);

        res.json({
            status: true,
            message: "success",
            data: customerOrders,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.getOrdersBySellerId = async (req, res, next) => {
    /** req.params.seller_id => this 'seller_id' is the id written in routes i.e '/:seller_id' */
    const seller_id = req.params.seller_id;

    try {
        const orders = await OrderSchema.find({})

        let allOrders = [];

        allOrders = orders?.map((item) => ({
            _id: item?._id,
            createdAt: item?.createdAt,
            updatedAt: item?.updatedAt,
            customer_id: item?.customer_id,
            payment_method: item?.payment_method,
            delivery_address: item?.delivery_address,
            orders_list: item?.orders_list.filter((sub_itm) => sub_itm?.seller_id == seller_id)
        })).filter((item) => item?.orders_list?.length != 0).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);

        res.json({
            status: true,
            message: "success",
            data: allOrders,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await OrderSchema.find({})
        const allOrders = orders.map(item => item).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
        res.json({
            status: true,
            message: "success",
            data: allOrders,
        })
    } catch (error) {
        /** It call the next available middleware in a queue (List).
          * It means the last middleware.
          */
        next(error);
    }
}

exports.getOrderById = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const order_id = req.params.order_id;

    try {
        const order = await OrderSchema.findById({ _id: order_id })
        if (order) {
            res.json({
                status: true,
                message: "success",
                data: order,
            })
        } else {
            res.json({
                status: false,
                message: "No Order Found",
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


exports.deleteOrder = async (req, res, next) => {
    /** req.params.id => this 'id' is the id written in routes i.e '/:id' */
    const id = req.params.id;
    try {
        const order = await OrderSchema.findById(id);
        order.remove();
        res.json({
            status: true,
            message: "Order has been removed",
        })
    } catch (error) {
        res.json({
            status: false,
            message: error,
        })
    }
}
