# Full-Stack Todo Application

This is a full-stack todo application that allows users to manage their tasks. It features user authentication, allowing users to register, log in, and manage their personal todo lists. The application is split into a Node.js Express backend and a React frontend.

## Features

*   **User Authentication**: Register, log in, and log out.
*   **CRUD Operations for Todos**: Create, read, update, and delete tasks.
*   **Task Filtering**: Filter tasks by active, completed, or all.
*   **Clear Completed Tasks**: Easily remove all completed tasks.
*   **Responsive Design**: Built with Tailwind CSS for a modern and responsive user interface.

## Technologies Used

### Backend

*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **MongoDB (via Mongoose)**: NoSQL database for storing user and todo data.
*   **JWT (JSON Web Tokens)**: For secure user authentication.
*   **Bcryptjs**: For hashing passwords.
*   **CORS**: For enabling Cross-Origin Resource Sharing.
*   **Dotenv**: For managing environment variables.
*   **Express Rate Limit**: For basic API rate limiting.

### Frontend

*   **React**: JavaScript library for building user interfaces.
*   **Tailwind CSS**: A utility-first CSS framework for styling.
*   **React Scripts**: For managing the development and build processes (likely Create React App).

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (Node Package Manager)
*   MongoDB instance (local or cloud-hosted)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Backend Setup:**

    Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

    Install dependencies:

    ```bash
    npm install
    ```

    Create a `.env` file in the `backend` directory and add the following environment variables:

    ```
    PORT=3001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

    *   `PORT`: The port the backend server will run on (e.g., 3001).
    *   `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/todoapp`).
    *   `JWT_SECRET`: A strong, random string for JWT signing.

3.  **Frontend Setup:**

    Navigate to the `todo-list` directory:

    ```bash
    cd ../todo-list
    ```

    Install dependencies:

    ```bash
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**

    In the `backend` directory, run:

    ```bash
    npm start
    ```

    The backend server will start on the port specified in your `.env` file (default: 3001).

2.  **Start the Frontend Development Server:**

    In the `todo-list` directory, run:

    ```bash
    npm start
    ```

    The frontend application will open in your browser (usually at `http://localhost:3000`).

## API Endpoints (Backend)

The backend provides the following RESTful API endpoints:

*   **Authentication:**
    *   `POST /auth/register`: Register a new user.
    *   `POST /auth/login`: Log in an existing user.
    *   `GET /auth/me`: Get the currently authenticated user's details.
    *   `POST /auth/logout`: Log out the current user.

*   **Todos:**
    *   `GET /todos`: Get all todos for the authenticated user.
    *   `POST /todos`: Create a new todo.
    *   `PUT /todos/:id`: Update an existing todo by ID.
    *   `DELETE /todos/:id`: Delete a todo by ID.
