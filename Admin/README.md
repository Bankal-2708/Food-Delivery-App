# Food App Admin Panel

Standalone admin dashboard for managing the Food Delivery App.

## Features

- 🍽 **Manage Dishes**: Add, edit, and delete food items
- 🖼 **Image Upload**: Upload and manage food images
- 📦 **Order Management**: View and manage customer orders
- 🎨 **Dark UI**: Modern dark theme interface

## Setup

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```
Admin panel will run on `http://localhost:5174`

### Build for Production
```bash
npm run build
```

## Environment Variables

Create a `.env.local` file:
```
VITE_API_URL=http://localhost:5000/api
```

## Authentication

Admin features require authentication. Make sure to:
1. Login from the main app
2. Get the auth token
3. The admin panel will use the token from localStorage

## API Endpoints Used

- `GET /api/food` - Get all dishes
- `POST /api/food/add` - Add new dish
- `PUT /api/food/update/:id` - Update dish
- `DELETE /api/food/remove/:id` - Delete dish
- `POST /api/food/upload` - Upload image
- `GET /api/orders/all` - Get all orders
- `PUT /api/orders/confirm/:id` - Confirm order
- `PUT /api/orders/deliver/:id` - Mark delivered
- `DELETE /api/orders/cancel/:id` - Cancel order
