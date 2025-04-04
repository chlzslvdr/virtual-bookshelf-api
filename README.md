
# Virtual Bookshelf API

A RESTful API for managing books, integrated with Supabase for authentication and storage. This project allows users to register, login, and manage their personal collection of books, including adding, updating, deleting, and searching for books. It also allows users to update book statuses and cover images.

###  Technologies Used
- [Node.js](https://nodejs.org/en) for the backend server
- [Express](https://expressjs.com) for routing and middleware
- [Supabase](https://supabase.com) for authentication and database management
- JWT (JSON Web Tokens) for user authentication
- Google Books API for book search functionality

## Features

- **User Authentication**:
  - User registration via email and password
  - User login with email and password
  - Token-based authentication for secure API access

- **Book Management**:
  - **CRUD Operations**:
    - Add a new book to the user's collection
    - Update book status and cover image
    - Delete a book from the collection
    - Retrieve all books for the authenticated user
  - Partial updates allowed for book status and cover image
  - Search books via the Google Books API

- **Database**:
  - Uses Supabase for database management and user authentication
  - Stores books with details such as title, author, status, and cover image URL

## Installation
### Steps

1. Clone the repository:
	```bash
	git clone git@github.com:chlzslvdr/virtual-bookshelf-api.git
    cd virtual-bookshelf-api
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Set up your environment variables:
	Create a `.env` file at the root of the project and add the following keys (replace with your own values from your Supabase project):
	```
	SUPABASE_URL=your_supabase_url
	SUPABASE_PUBLIC_ANON_KEY=your_supabase_anon_key
	SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
	JWT_SECRET=your_jwt_secret_key
	PORT=4020
	```
4. Start the development server:
   	```bash
	npm start
	```

5. The server should now be running on http://localhost:4020.