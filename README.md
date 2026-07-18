 
 
# 🍔 FreshBite- Full-Stack Food Delivery Application

A robust, production-ready full-stack food delivery application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The project features a responsive customer-facing storefront, a dynamic admin management dashboard, an item-matching storage layer, and an adaptive checkout workflow supporting both Cash on Delivery (COD) and Online Payments via real-time generated dynamic QR Codes.

---

## 📁 Repository Structure

The repository is organized as a unified monorepo divided cleanly into three decoupled main blocks:

```text
.
├── Admin/               # React (Vite) Admin Control Dashboard
│   ├── src/
│   │   ├── AdminNavbar.jsx   # Top Navigation & Tab Controls
│   │   ├── AdminBody.jsx     # Handles Listings, Forms, & Order Actions
│   │   └── App.jsx           # Main Authentication Guard & State Orchestrator
│   └── package.json
│
├── backend/             # Node.js + Express REST API Server
│   ├── api/food/        # Food Controller, Service, and Routes Architecture
│   ├── middleware/      # JSON Web Token (JWT) Authentication & Multer File Uploads
│   ├── models/          # Mongoose Schemas (User, Food, Cart)
│   ├── routes/          # API Endpoint Route Resolvers (Auth, Cart)
│   ├── uploads/         # Static Storage Directory for Admin Multipart Form Uploads
│   └── server.js        # Main Application Entry Point
│
└── Frontend/            # React (Vite) Customer Application Storefront
    ├── src/
    │   ├── Components/  # Modular View Subcomponents (NavBar, Dishes, Footer)
    │   ├── Pages/       # Context-Driven Layout views (Cart, Home, Checkout)
    │   └── Context/     # Global State Management Context (Cart, Auth, Search)
    └── package.json
