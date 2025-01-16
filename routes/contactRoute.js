const express = require("express");
const router = express.Router();
const {deleteContact,updateContact,getContact,createContact,getAllContact} = require("../controllers/contactControllers");

router.get('/',getAllContact);

router.get("/:id",getContact)

router.post('/',createContact);

router.put('/:id',updateContact);

router.delete('/:id',deleteContact);

module.exports = router;