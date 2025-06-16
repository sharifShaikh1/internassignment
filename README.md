**Todo List App** 🚀
Welcome to the Todo List App repository! This project is a full‐stack task management application built using React on the frontend and Express with MongoDB on the backend. It features full user authentication using JWT along with comprehensive CRUD operations for managing todos. Follow this documentation for details on features, requirements, installation, and how to run it locally on your machine.

─────────────────────────────────────────────

Introduction
The Todo List App is designed to help users manage their tasks in an intuitive and efficient way. The application supports user registration, login, and secure data operations. Users can create, update, delete, and mark todo items as completed. The project is split into two main parts:

• Frontend – Built with React (using Create React App) and styled using Tailwind CSS. The frontend handles user interactions and communicates with the backend API.
• Backend – An Express server that provides authentication and todo API endpoints. It uses JSON Web Tokens (JWT) for secure user authentication and MongoDB as the database.

─────────────────────────────────────────────

Features
This application provides a range of useful functions:

User Authentication
• Sign up for a new account
• Login and logout functionalities using JWT
Todo Management
• Create new tasks with an optional description and due date
• Edit and update existing todos
• Mark tasks as completed and delete them
• Clear all completed tasks at once
Responsive UI
• A clean, modern interface built with Tailwind CSS and React
• Dynamic form handling for adding and editing todos
Backend API
• Secure endpoints protected by middleware (e.g. authentication checks)
• RESTful routes for todos and user authentication
─────────────────────────────────────────────

Requirements
Before running the project, ensure you have the following prerequisites:

Component	Version / Requirement	Notes
Node.js	v14 or later	Use the Node.js LTS version for best compatibility
npm	Latest version	Comes bundled with Node.js
MongoDB	v4.2 or later	Local or cloud instance
Environment Variables	JWT_SECRET, MONGO_URI	See installation instructions
─────────────────────────────────────────────

Installation
1. Clone the Repository
Open your terminal and run:
git clone https://github.com/sharifShaikh1/internassignment.git
cd internassignment
2. Setup the Backend
Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Create a .env file in the backend folder with the following variables:
MONGO_URI = mongodb://localhost:27017/todos-db
JWT_SECRET = your_jwt_secret_here
PORT = 3001
Start the backend server:
npm start
3. Setup the Frontend
In a new terminal window, navigate to the React frontend folder:
cd todo-list
Install dependencies:
npm install
Start the frontend application:
npm start
─────────────────────────────────────────────

Usage
Once both the frontend and backend are running locally, open your web browser and navigate to:
http://localhost:3000
You will see the login page. If you are a new user, click the “Register” option to create an account. Once logged in, you can:

• View your list of todos
• Add a new task (with an optional description and due date)
• Edit or delete existing tasks
• Mark tasks as completed and clear all completed tasks at once

The application communicates with the backend endpoints to perform secure CRUD operations. Enjoy managing your tasks with an interactive and responsive user experience!

─────────────────────────────────────────────
**LOOM VIEDEO LINK**
https://www.loom.com/share/31dc256e935843e1be2bc0e6a7682d6f?sid=3c888436-625a-4cfd-bbf7-6acc3a01ab19

─────────────────────────────────────────────

Running Locally on Your Machine
To run the application locally:

Make sure MongoDB is running on your local machine (or adjust the MONGO_URI in the .env file).
Start the backend server from the “backend” folder using npm start.
Start the React frontend from the “todo-list” folder using npm start.
Open your web browser and go to http://localhost:3000 to access the app.
