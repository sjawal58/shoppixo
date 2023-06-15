const express = require('express');
const router = express.Router();
const { createAdmin, getAllAdmin, getAllSeller, getAdminById, updateAdmin, deleteAdmin } = require('../../../controllers/auths/admins/adminController')

router.route("/admin-register").post(createAdmin)
router.route("/admins").get(getAllAdmin)
router.route("/sellers").get(getAllSeller)
router.route("/admin/:id").get(getAdminById)
router.route("/admin/update/:id").put(updateAdmin)
router.route("/admin/delete/:id").delete(deleteAdmin)

module.exports = router /** exporting all routes in a single line */