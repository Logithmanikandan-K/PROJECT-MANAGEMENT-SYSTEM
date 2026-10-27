EXPERIMENT 4: PROJECT MANAGEMENT DASHBOARD
Based on the FSWD Lab Manual's task manager program.

FEATURES
- Add a task
- View tasks in Pending, Ongoing, and Completed columns
- Change a task's status
- Delete a task
- Store tasks in MongoDB

REQUIREMENTS
1. Install Node.js and npm.
2. Install MongoDB Community Server and ensure the MongoDB service is running.
3. Open this project folder in VS Code.

RUN THE BACKEND
Open a terminal:
  cd server
  npm install
  npm start

Keep this terminal running. The API runs at http://localhost:5000.
MongoDB database: taskmanager

RUN THE FRONTEND
Open a second terminal:
  cd task-manager-frontend
  npm install
  npm start

The browser should open at http://localhost:3000.

IF THE APP DOES NOT CONNECT
- Confirm MongoDB is running.
- Confirm the backend terminal says "MongoDB connected".
- Keep both terminal windows open.
- If port 5000 or 3000 is already in use, stop the other application using that port.

NOTE
The manual's example uses the status name "Ongoing". This project keeps that same label and uses MongoDB, Express, React, Axios, and Bootstrap as in the manual.
