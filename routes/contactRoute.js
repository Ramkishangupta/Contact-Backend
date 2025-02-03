const express = require("express");
const router = express.Router();
const {deleteContact,updateContact,getContact,createContact,getAllContact} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.get('/',getAllContact);

router.get("/:id",getContact)

router.post('/',createContact);

router.put('/:id',updateContact);

router.delete('/:id',deleteContact);

module.exports = router;