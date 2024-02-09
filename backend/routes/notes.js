const express = require("express");
const { validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const User = require("../models/User");
const { noteValidator } = require("../validator/FieldValidation");
const { restart } = require("nodemon");
const { NotBeforeError } = require("jsonwebtoken");

//ROUTE # 1: Get all the notes by using the http method GET "api/notes/fetchallnotes" and jwt is required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });
    res.json([note]);
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//ROUTE # 2: Add a new note by using the http method POST "api/notes/addnote" and jwt is required
router.post("/addnote", fetchuser, noteValidator, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote = await note.save();
    return res.status(200).json(savedNote);
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//ROUTE # 3: Update a existing note by using the http method PUT "api/notes/updatenote" and jwt is required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const {title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id){
      console.log("Not updating note")
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    return res.status(200).json(note);
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

  //ROUTE # 4: Delete an existing note by using the http method DELETE "api/notes/deleteenote" and jwt is required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id); 
    return res.json({"Success": "Note deleted successfully", note: note });
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({ message: "Internal Server Error"});
  }
});

module.exports = router;
