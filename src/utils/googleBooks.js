const axios = require("axios");

async function searchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.items.map(book => ({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(", ") || "Unknown",
      description: book.volumeInfo.description || "No description available",
      cover: book.volumeInfo.imageLinks?.thumbnail || null,
    }));
  } catch (error) {
    console.error("Error fetching book data:", error);
    return [];
  }
}

module.exports = { searchBooks };
