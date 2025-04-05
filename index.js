const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Virtual Bookshelf API is running!");
});

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.info(`🚀 Server running on port ${PORT}`));
