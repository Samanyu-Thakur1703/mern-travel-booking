# 🌍 TravelBook - Full Stack MERN Travel Booking Application

TravelBook is a modern, responsive, and feature-rich travel booking platform built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to explore handpicked destinations, view detailed itineraries, and seamlessly book their next adventure.

![Main Screenshot](https://mern-travel-booking-v1.vercel.app/favicon.ico) <!-- Placeholder for actual screenshot -->

## 🚀 Live Demo
- **Frontend:** [mern-travel-booking-v1.vercel.app](https://mern-travel-booking-v1.vercel.app)
- **Backend API:** [backend-seven-khaki-52.vercel.app/api](https://backend-seven-khaki-52.vercel.app/api)

---

## ✨ Features

- **🔍 Advanced Search & Filtering:** Find tours by destination, category (Beach, Mountain, City, etc.), and sort by price or rating.
- **📅 Interactive Booking:** Real-time booking form with robust client-side validation using React Hook Form and Yup.
- **⭐ Reviews & Ratings:** Users can view and submit reviews for specific tours.
- **🌓 Dark Mode:** Fully integrated theme toggle with persistent storage.
- **📱 Responsive Design:** Optimized for mobile, tablet, and desktop views.
- **🎭 Smooth Animations:** Enhanced UX with Framer Motion transitions.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite-powered)
- **React Router 6** (Navigation)
- **Styled Components & Vanilla CSS** (Styling)
- **Framer Motion** (Animations)
- **SWR & Axios** (Data fetching & Caching)
- **React Hook Form & Yup** (Forms Management)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **CORS** (Secure cross-origin requests)
- **Dotenv** (Environment configuration)

---

## 📂 Project Structure

```bash
mern-travel-booking/
├── backend/            # Express Server
│   ├── api/            # Vercel Serverless Function entry
│   ├── config/         # DB connection config
│   ├── controllers/    # Request handlers logic
│   ├── models/         # Mongoose schemas (Tour, Booking, Review)
│   ├── routes/         # API endpoints
│   └── server.js       # Local entry point
├── frontend/           # React App (Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── hooks/      # Custom React hooks (useTours, etc.)
│   │   ├── pages/      # Route pages (Home, Tours, Booking)
│   │   └── services/   # API service layer
│   └── vercel.json     # Frontend deployment config
└── README.md           # Project documentation
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Samanyu-Thakur1703/mern-travel-booking.git
cd mern-travel-booking
```

### 2. Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file (refer to `.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```
4. Start the server: `npm run dev`

### 3. Frontend Setup
1. Navigate to the frontend folder: `cd ../frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file (refer to `.env.example`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server: `npm run dev`

---

## 📦 Deployment

The project is configured for one-click deployment on **Vercel**.

### Backend (Serverless)
Set `Root Directory` to `backend` and provide the `MONGODB_URI` environment variable.

### Frontend
Set `Root Directory` to `frontend` and provide the `VITE_API_URL` environment variable pointing to your deployed backend.

---

## 👨‍💻 Author
**Samanyu Thakur**
- GitHub: [@Samanyu-Thakur1703](https://github.com/Samanyu-Thakur1703)

---

## 📄 License
This project is licensed under the ISC License.
