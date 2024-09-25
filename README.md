# Realtime Whiteboard

A collaborative whiteboard application that allows users to draw and share in real-time.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Running Locally](#running-locally)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time drawing and collaboration
- User-friendly interface
- Responsive design for desktop and mobile
- Socket.IO for real-time communication

## Technologies Used

- **Frontend:**
- React
- Vercel for deployment
- Socket.IO for real-time communication
- @testing-library/react for testing

- **Backend:**
- Node.js with Express
- Socket.IO for real-time communication
- Render for deployment

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js installed on your machine
- npm or yarn for package management

### Installation

1. Clone the repository:
   git clone https://github.com/shahana308/realtime-whiteboard.git

1. Navigate to the project directory:
   cd realtime-whiteboard

1. Install dependencies for both frontend and backend:

   - For frontend:
     cd frontend
     npm install

   - For backend:

     cd backend
     npm install

## Frontend Deployment

The frontend is deployed on Vercel and can be accessed at:

- <https://realtime-whiteboard-zmfs.vercel.app/>

## Backend Deployment

The backend is deployed on Render and can be accessed at:

- <https://realtime-whiteboard-l4cw.onrender.com/>

## Running Locally

To run the application locally:

1.  Start the backend server:

    cd backend
    node index.js

    Ensure the server is running on port `4000`.

2.  Start the frontend application:

    cd frontend
    npm start

    The frontend will typically run on `http://localhost:3000`.
