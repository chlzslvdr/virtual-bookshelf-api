const { createSupabaseClient } = require("../config/supabase");

exports.getBooks = async (req, res) => {
  const supabase = createSupabaseClient(req.token);
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.addBook = async (req, res) => {
  const supabase = createSupabaseClient(req.token);
  const { title, author, status } = req.body;

  const { data, error } = await supabase
    .from("books")
    .insert([{ title, author, status, user_id: req.user.id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: "Book added", data });
};

exports.updateBook = async (req, res) => {
  const supabase = createSupabaseClient(req.token);
  const { id } = req.params;
  const { status, cover_url } = req.body;

  const updateObject = {};
  if (status) updateObject.status = status;
  if (cover_url) updateObject.cover_url = cover_url;

  updateObject.updated_at = new Date().toISOString();
  updateObject.updated_by = req.user.id;

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
      console.error(`Error updating book with ID ${id}:`, error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Book updated", data });
  } catch (err) {
    console.error(`Unexpected error in PUT /api/books/${id}:`, err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBook = async (req, res) => {
  const supabase = createSupabaseClient(req.token);
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error(`Error deleting book ${id}:`, err);
    res.status(500).json({ error: "Internal server error" });
  }
};
