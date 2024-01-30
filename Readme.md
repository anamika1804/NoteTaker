Welcome to NoteTaker. This application helps users manage their notes securely. 

## Getting Started
Follow these steps to set up and run the app:

## Prerequisites
Make sure you have the following installed:

->Node.js
->npm (Node Package Manager)
->MongoDB
## Installation
Includes two terminals for backend and frontend
1. Backend terminal- npm i | This installs necessary dependencies for the backend.
2. Frontend Terminal- npm i --force | This installs necessary dependencies for the frontend.


## Configuration
-> Find the config directory in the backend.

-> Edit the dev.env file with your MongoDB URL and JWT secret key.

-> Sample for dev.env file is there on sample config folder, to get started with adding your own jwt secret and mongodb URL.

MONGODB_URL="Your mongodb URL"
JWT_SECRET="your-secret-key"
Replace your-mongodb-url and your-secret-key with your actual MongoDB URL, database name, and a secret key for JWT.

## Starting the App
In the backend terminal, run:
npm run dev
This starts the backend server.

In the frontend terminal, run:
npm start
This starts the frontend application.

Open your web browser and go to http://localhost:3000 to access the Note Taking App.

## Usage
Register a new account or log in with existing credentials.
Create, edit, and delete notes.
Passwords are securely hashed for protection.
Sample Config
For a quick start, there's a sample configuration file (sample-dev.env). Follow these steps:

Duplicate sample-dev.env and rename it to dev.env.

Edit dev.env with your MongoDB URL and JWT secret key.

Follow the "Starting the App" section to launch the application.

## Security
User passwords are hashed using a bcrypt Module.
Keep your JWT secret key confidential.
If you encounter issues during installation or usage, check the troubleshooting section in the project's documentation or seek help from the community.

Thank you for using the Note Taking App!