# 🏨 Yassin Palace Hotel Booking App
Welcome to Yassin Palace Hotel, a modern full-stack web application built for seamless hotel room booking and management. This project combines a robust Spring Boot backend with an elegant React + Bootstrap frontend, delivering a complete reservation experience with JWT authentication, role-based access control, and an admin dashboard.
## ✨ Features
👥 **User Features** – Register and log in securely with JWT-based authentication, browse available rooms with photos and prices, filter rooms by type, availability, and date range, book rooms instantly with real-time availability checks, and manage your reservations easily.  
🛠️ **Admin Features** – Access a secure admin panel to manage the system, add/edit/delete rooms with images, descriptions, and prices, manage bookings and registered users, and monitor activity through a modern dashboard.
## ⚙️ Tech Stack
Frontend: React 18, Vite, React Bootstrap, Axios  
Backend: Spring Boot 3, Spring Security, JWT, Lombok, JPA/Hibernate  
Database: MySQL (can be switched to PostgreSQL or H2)  
Build Tools: Maven (backend), npm (frontend)  
Deployment Ready: Easily containerized with Docker or deployable on any cloud.
## 🚀 Setup & Run Locally
1️⃣ Clone the repository  
`git clone https://gitlab.com/your-username/yassin-palace-hotel.git`  
`cd yassin-palace-hotel`
2️⃣ Run the backend  
`cd backend/HotelBookingApplication`  
`mvn spring-boot:run`  
➡️ Backend runs on http://localhost:8080
3️⃣ Run the frontend  
`cd frontend/Hotel-booking-application`  
`npm install`  
`npm run dev`  
➡️ Frontend runs on http://localhost:5173
## 🔐 Default Roles
ROLE_USER → Can browse and book rooms  
ROLE_ADMIN → Can manage rooms, users, and bookings  
(Admin can be created in the backend DataInitializer or through registration.)

## 💬 About the Project
This project demonstrates a full integration between Spring Boot and React, focusing on RESTful API design, secure JWT authentication, responsive UI, and a scalable architecture suitable for production environments.

