# Online Learning Platform Using Mern 
NMID: F9CAE28AC0EFDDE82EC4B497470DDCEC

**EduSphere** is a comprehensive online learning platform designed using the MERN stack (MongoDB, Express.js, React, Node.js). The platform supports different user roles including students, teachers, and administrators, facilitating a seamless educational experience.


![Screenshot (23)](https://github.com/user-attachments/assets/95596133-cf70-4496-9507-4acd6d1128a5)



## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Folder Structure](#folder-structure)
- [API Overview](#api-overview)
- [User Roles and Responsibilities](#user-roles-and-responsibilities)
- [Environment Variables](#environment-variables)
- [Run the Project](#run-the-project)

## Project Overview
EduSphere is a digital platform providing tools and resources to facilitate learning and education over the internet. Users can enroll in courses, track their progress, and earn certifications. The platform is designed to ensure ease of use for all users, including students, teachers, and administrators.

## Key Features
- **User-Friendly Interface:** Intuitive navigation for seamless learning.
- **Course Management:** Instructors can create, manage, and update courses.
- **Student Progress Tracking:** Progress is saved to allow learners to pick up where they left off.
- **Interactivity:** Includes discussion forums and webinars for real-time engagement.
- **Certification:** Digital certificates are issued upon course completion.
- **Payment Integration:** Supports free and paid courses.
- **Admin Oversight:** Admins can monitor users, manage courses, and oversee platform operations.

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other Tools:** 
  - **Authentication:** JWT (JSON Web Token)
  - **File Handling:** Multer
  - **Password Encryption:** bcryptjs

## Installation and Setup
### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Git**
- **Two web browsers** (for testing purposes)
- **Internet bandwidth:** 30 Mbps

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name/backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the `backend` folder with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret-key
    ```
4. Run the server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the `frontend` folder:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```

## Folder Structure
```plaintext
EduSphere/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routers/
│   └── index.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.js
    └── package.json

