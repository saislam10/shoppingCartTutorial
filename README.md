# Shopping Cart Web App

This repository contains a shopping cart web application built with React, Node.js, and MySQL. It provides authentication, registration, and CRUD operations on cart items.

## Features

- **User Authentication**: Secure login and registration system. Password hashing using bcrypt and 10 salt rounds.
- **Shopping Cart CRUD**: Users can add, view, and remove items from the shopping cart.
- **MySQL Integration**: Backend storage with MySQL, providing persistent storage for user accounts and cart items.

## Tailwind Branch Features

The Tailwind branch of this repository integrates the beautiful utility-first Tailwind CSS framework to provide the following:

- **Responsive Design**: The shopping cart is responsive and adapts to different screen sizes.
- **Enhanced UI**: Enhanced user interface elements, including buttons, form inputs, and layout components.
- **Modern Look and Feel**: The Tailwind integration brings a modern and clean design to the shopping cart application.

## Getting Started

1. Run npm install at the root to ensure all necessary dependencies are downloaded.
2. Add a .env file in the server directory to add a password for mysql connection. The password should be in this format: "MYSQL_PASSWORD=your_password". This .env file is ignored when pushing.

### Running the Backend Server

1. Open a terminal or command prompt.
2. Navigate to the project directory:
    ```bash
    cd path_to_project_directory
    ```
3. Change directory to the server folder:
    ```bash
    cd server
    ```
4. Run the server using nodemon:
    ```bash
    nodemon server.js
    ```

### Running the Frontend

1. Open another terminal or command prompt.
2. Navigate to the project directory:
    ```bash
    cd path_to_project_directory
    ```
3. Change directory to the `src` folder:
    ```bash
    cd src
    ```
4. Start the frontend:
    ```bash
    npm run start
    ```

The frontend should now open in your default browser, and you can interact with the shopping cart web app.


