const express = require("express");

const Note = require("../models/Note");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE NOTE
router.post("/", authMiddleware, async (req, res) => {

  try {

    const { title, content } = req.body;

    const note = new Note({
      user: req.user,
      title,
      content,
    });

    await note.save();

    res.status(201).json(note);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// GET USER NOTES
router.get("/", authMiddleware, async (req, res) => {

  try {

    const notes = await Note.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.json(notes);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// DELETE NOTE
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    await Note.findByIdAndDelete(req.params.id);

    res.json({
      message: "Note deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;