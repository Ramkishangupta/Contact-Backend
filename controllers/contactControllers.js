const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const getAllContact =asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async(req,res)=>{
    console.log("the request body is",req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All new fields are mandatory");
        // return res.status(400).json({ error: "All fields are mandatory" });
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        userId: req.user.id,
    });
    res.status(200).json(contact);
});

const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString !== req.user.id){
        res.status(401);
        throw new Error("incorrect User");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true}
    );
    res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString !== req.user.id){
        res.status(401);
        throw new Error("incorrect User");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200);
    res.json({message:"contact deleted"});
});
module.exports = { 
    getAllContact, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact 
};