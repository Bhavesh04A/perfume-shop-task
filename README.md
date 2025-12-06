# 🛍️ Perfume Shop: Full Stack E-commerce Homepage

This project implements a responsive, engaging homepage and a detailed product page for a perfume e-commerce store, fulfilling the requirements for the Full Stack Developer assessment task.

## 🌟 Features

### Front-End (React)
* **Responsive Layout:** Built with **React** and styled using **Tailwind CSS**.
* **Dynamic Homepage:** Displays featured product cards fetched dynamically from the back-end database.
* **Internationalization:** Prices are correctly formatted and displayed in **Indian Rupees (₹)**.
* **Product Page Details:** Includes image gallery, detailed product description, and size selection.
* **Interactive Review System:** Users can read and submit new reviews, which are persisted to MongoDB.

### Back-End (Node.js & MongoDB)
* **API Development:** Built with **Node.js** and **Express.js**.
* **Data Source:** Uses **MongoDB Atlas** (via Mongoose) for all data fetching (products, prices, reviews). Static values are avoided.
* **Data Seeding:** The server automatically seeds the database with mock product data on the first run, fulfilling the requirement to use the database as the sole data source.

***

## 🛠️ Project Setup and Running Instructions

Follow these steps in **two separate terminal windows** to run the full application locally.

### Step 1: Back-End Setup (Terminal 1)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure MongoDB:** Create a file named **`.env`** in the `backend` folder and add your MongoDB Atlas connection string.

    > **CRITICAL:** Replace the placeholders below with your actual, live MongoDB URI to allow the server to connect and seed the mock data.
    
    ```dotenv
    # backend/.env (Template for Reviewer)
    PORT=5000
    MONGODB_URI="mongodb+srv://[YOUR_USERNAME]:[YOUR_PASSWORD]@cluster0.duuvoyk.mongodb.net/perfume_shop?retryWrites=true&w=majority"
    ```

4.  **Start the server:**
    ```bash
    npm run dev
    ```
    The console must show: `MongoDB connected successfully!` and `Server running on port 5000`.

---

### Step 2: Front-End Setup (Terminal 2)

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the React application:**
    ```bash
    npm run dev
    ```

The application will launch on `http://localhost:5173/`, pulling all product and review data from the API server you started in Terminal 1.

***

## 📁 File Structure Overview

perfume-shop-task/ ├── backend/ # Node.js/Express Server Logic │ ├── .env # DB Connection string (Excluded from Git) │ ├── models/ # Mongoose Schemas │ ├── routes/ # API Endpoints │ └── server.js # Main entry point ├── frontend/ # React/Vite Application │ ├── public/ # Static assets, includes /images for perfumes │ ├── src/ │ │ ├── components/ # Reusable UI pieces │ │ ├── pages/ # Home, Product, About, Contact, 404 │ │ └── utils/ # currency.js for INR formatting │ └── .gitignore └── README.md
