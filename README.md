# 🍽️ RoyalBite – Restaurant Management System

A modern and responsive restaurant web application built with React. RoyalBite provides customers with a smooth online food ordering experience, from exploring the menu to placing orders and managing their profiles.

## 📌 Project Overview

RoyalBite is a frontend restaurant management application designed to simplify the food ordering process. Customers can browse food items, search and filter meals by category, add products to their cart, complete checkout, and track their orders.

The application uses React Context API for cart state management and Local Storage for storing user information, orders, and other application data.

## ✨ Features

### 🏠 Home & Menu
- Modern and responsive user interface.
- Browse available food items.
- Search foods by name.
- Filter foods by category.
- View detailed food information.

### 🛒 Shopping Cart
- Add food items to the cart.
- Increase or decrease item quantities.
- Remove items from the cart.
- Automatically calculate the total price.
- Persistent cart data using Local Storage.

### 👤 Authentication
- User registration.
- User login and logout.
- Remember me functionality.
- Basic user session management.

### 💳 Checkout
- Customer information form.
- Delivery address input.
- Cash on Delivery and Card Payment options.
- Automatic subtotal, delivery fee, and grand total calculation.
- Place and save customer orders.

### 📦 My Orders
- View personal order history.
- Filter orders by status.
- Display order details and total prices.
- Track order status.

### 👤 User Profile
- View and update personal information.
- Upload a profile picture.
- Manage account information.
- Logout functionality.

### 📩 Contact
- Contact form with input validation.
- Save customer messages.
- Display submission success feedback.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript (ES6+) | Application logic |
| Tailwind CSS | Styling and responsive design |
| React Router DOM | Navigation and routing |
| Context API | Global state management |
| useReducer | Cart state management |
| Lucide React | Icons |
| Local Storage | Data persistence |
| Vite | Development environment |

## 📂 Project Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── FoodCard.jsx
│   └── ...
│
├── context/
│   ├── CartContext.jsx
│   └── CartReducer.jsx
│
├── data/
│   └── foods.js
│
├── pages/
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── FoodDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── MyOrders.jsx
│   ├── Profile.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Contact.jsx
│
├── App.jsx
└── main.jsx
```

*Note: Update the folder structure above if your actual project uses different file or folder names.*

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd "Restaurent Management System"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## 💾 Data Storage

This project currently uses browser Local Storage to store:

- Registered users
- Logged-in user information
- Shopping cart items
- Customer orders
- Contact messages

**Note:** This is a frontend demonstration project. It does not currently use a backend API or a production database. Authentication and payment options are demonstration features, not production-ready services.

## 🎯 Project Goals

- Practice modern React development.
- Understand component-based architecture.
- Implement global state management.
- Work with React Hooks and React Router.
- Build responsive and reusable UI components.
- Understand browser-based data persistence.
- Develop a practical full-stack project foundation.

## 👩‍💻 Developer

**Hajira Yousuf Ali**

Software Engineering Student | Full-Stack Developer

- GitHub: [HajiraYousuf](https://github.com/HajiraYousuf/)
- LinkedIn: [Hajira Yousuf](https://linkedin.com/in/hajira-yousuf/)

---

⭐ If you find this project interesting, feel free to explore the repository!