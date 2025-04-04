const express = require("express");
const { supabaseAnon } = require("../config/supabase");
const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabaseAnon.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "User registered successfully", data });
});

// Login (Updated to use signInWithPassword)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Login successful", data });
});

module.exports = router;
