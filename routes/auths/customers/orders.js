const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrdersByCustomerId, getOrdersBySellerId, getOrderById, deleteOrder } = require('../../../controllers/auths/customers/orderController')

router.route("/order/create").post(createOrder)
router.route("/orders").get(getAllOrders)
router.route("/orders/customer/:customer_id").get(getOrdersByCustomerId)
router.route("/orders/seller/:seller_id").get(getOrdersBySellerId)
router.route("/order/:order_id").get(getOrderById)
// router.route("/customer/delivery/update/:id").put(updateCustomerDevilery)
router.route("/order/delete/:id").delete(deleteOrder)

module.exports = router /** exporting all routes in a single line */