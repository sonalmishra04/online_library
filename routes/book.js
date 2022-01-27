const router = require("express").Router();
const User = require("../models/user");
const book = require("../models/book");

//Create a new book
router.post("/", async (req, res) => {
  const newbook = new book(req.body);
  try {
    const savedBook = await newbook.save();
    res.status(200).json(savedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update book
router.put("/:id", async (req, res) => {
  try {
    const Book = await book.findById(req.params.id);
    if (Book.username === req.body.username) {
      try {
        const updatebook = await book.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatebook);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json("You can update only your book ");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete book

module.exports = router;
