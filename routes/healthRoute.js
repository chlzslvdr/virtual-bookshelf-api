const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLIC_ANON_KEY
);

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ status: "error", error: error.message });
    }

    res.json({ status: "ok", supabase: "active", count: data?.length || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

module.exports = router;
