const express = require("express");

const Note = require("../models/note.js");
const auth = require("../middlewares/auth");

const router = new express.Router();

router.post("/notes", auth, async (req, res) => {
    const note = new Note({
        ...req.body,
        owner: req.user._id,
    });
    try {
        await note.save();
        res.status(201).send({ note, message: "Note Saved" });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/notes", auth, async (req, res) => {
    try {
      const sortOrder = req.query.sort || "desc";
  
      await req.user.populate({
        path: "notes",
        options: {
          sort: {
            createdAt: sortOrder === "desc" ? -1 : 1,
          },
        },
      });
  
      res.send(req.user.notes);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });

router.get("/notes/:id", auth, async (req, res) => {
    try {
        const note = await Note.findById({ _id: req.params.id });
        if (!note) {
            return res.status(404).send();
        }
        
        res.send(note);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete("/notes/:id", auth, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id });

        if (!note) {
            return res.status(404).send();
        }
        res.send({ message: "Note was deleted" });
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/search', async (req, res) => {
    const searchTerm = req.query.term.toLowerCase();
  
    try {
      // Simulated search logic - find notes containing the search term in the title
      const results = await Note.find({
        title: { $regex: new RegExp(searchTerm), $options: 'i' },
      });
  
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
