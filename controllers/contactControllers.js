const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const getAllContact =asyncHandler(async(req,res)=>{
    const contacts = await Contact.find();
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
        phone
    });
    res.status(200).json(contact);
});

const getContact = asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Get contacts for ${req.params.id}`});
});

const updateContact = asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Update contacts for ${req.params.id}`});
});

const deleteContact = asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Delete contacts for ${req.params.id}`});
});
module.exports = { 
    getAllContact, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact 
};