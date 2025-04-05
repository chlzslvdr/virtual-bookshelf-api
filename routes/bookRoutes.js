const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateRequest");
const { bookCreateSchema, bookUpdateSchema } = require("../validations/bookSchema");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.get("/", authMiddleware, bookController.getBooks);
router.post("/", authMiddleware, validate(bookCreateSchema), bookController.addBook);
router.put("/:id", authMiddleware, validate(bookUpdateSchema), bookController.updateBook);
router.delete("/:id", authMiddleware, bookController.deleteBook);

module.exports = router;
