import express from "express";
import Book from "../models/bookmodel.js"
const route=express.Router();

route.post("/", async (req, res) => {
  const { title, author, publishYear } = req.body;

  if (!title || !author || !publishYear) {
    return res.status(400).json({
      message: "All fields (title, author, publishYear) are required.",
    });
  }

  try {
    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);
    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create book", details: error.message });
  }
});

route.get("/", async (req, res) => {
  try {
    const book = await Book.find({});
    return res.json(book);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching book", details: error.message });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json(book);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching book", details: error.message });
  }
});
route.put("/:id", async (req, res) => {
  try {
      const { title, author, publishYear } = req.body;

  if (!title || !author || !publishYear) {
    return res.status(400).json({
      message: "All fields (title, author, publishYear) are required.",
    });
  }

    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id,req.body);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json({ message: "Book updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching book", details: error.message });
  }
});
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json({ message: "Book deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching book", details: error.message });
  }});
  export default route;
