const express = require("express");
const { createSupabaseClient } = require("../config/supabase");
const { searchBooks } = require("../utils/googleBooks");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

// Get all books for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  const supabase = createSupabaseClient(req.token); // Pass token to create Supabase client

  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", req.user.id);

    if (error) {
      console.error("Error fetching books:", error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Unexpected error in GET /api/books:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new book for the authenticated user
router.post("/", authMiddleware, async (req, res) => {
  const supabase = createSupabaseClient(req.token);

  const { title, author, status } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(400).json({ error: "User information is missing" });
  }

  try {
    const { data, error } = await supabase
      .from("books")
      .insert([{ title, author, status, user_id: req.user.id }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Book added", data });
  } catch (err) {
    console.error("Unexpected error in POST /api/books:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update the status of an existing book
router.put("/:id", authMiddleware, async (req, res) => {
  const supabase = createSupabaseClient(req.token);
  const { id } = req.params;
  const { status, cover_url } = req.body;

  const updateObject = {};
  if (status) updateObject.status = status;
  if (cover_url) updateObject.cover_url = cover_url;

  if (Object.keys(updateObject).length === 0) {
    return res.status(400).json({ error: "At least one of status or cover_url is required to update." });
  }

  try {
    const { data, error } = await supabase
      .from("books")
      .update(updateObject)
      .eq("id", id)
      .eq("user_id", req.user.id)
      .select();

    if (error) {
      console.error(`Error updating book status and/or cover_url for book ID ${id}:`, error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Book updated", data });
  } catch (err) {
    console.error(`Unexpected error in PUT /api/books/${id}:`, err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a book for the authenticated user
router.delete("/:id", authMiddleware, async (req, res) => {
  const supabase = createSupabaseClient(req.token);
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) {
      console.error(`Error deleting book with ID ${id}:`, error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error(`Unexpected error in DELETE /api/books/${id}:`, err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search for books via Google Books API
router.get("/search", async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {

    const books = await searchBooks(query);

    if (!books.length) {
      return res.status(404).json({ message: "No books found for your query" });
    }

    res.json(books);
  } catch (err) {
    console.error("Unexpected error in GET /api/books/search:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;