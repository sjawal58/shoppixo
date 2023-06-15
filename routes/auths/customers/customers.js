const express = require('express');
const router = express.Router();
const { createCustomer, getAllCustomer, getCustomerById, updateCustomer, updateCustomerDevilery, deleteCustomer } = require('../../../controllers/auths/customers/customersController')

router.route("/customer-register").post(createCustomer)
router.route("/customers").get(getAllCustomer)
router.route("/customer/:id").get(getCustomerById)
router.route("/customer/update/:id").put(updateCustomer)
router.route("/customer/delivery/update/:id").put(updateCustomerDevilery)
router.route("/customer/delete/:id").delete(deleteCustomer)

module.exports = router /** exporting all routes in a single line */