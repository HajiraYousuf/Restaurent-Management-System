import React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter,RouterProvider,Navigate} from 'react-router-dom';
import './index.css';

import App from './App';
import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetails from './pages/FoodDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { CartProvider } from './CartContext';

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>, // layout: Header + <Outlet/> + Footer
    children:[
      {index:true,element:<Home/>},
      {path:'menu',element:<Menu/>},
      {path:'food-details/:id',element:<FoodDetails/>},
      {path:'cart',element:<Cart/>},
      {path:'checkout',element:<Checkout/>},
      {path:'my-orders',element:<MyOrders/>},
      {path:'about',element:<About/>},
      {path:'contact',element:<Contact/>},
      {path:'login',element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'profile',element:<Profile/>},
      {path:'*',element:<Navigate to="/" replace/>},
    ],
  },
]);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CartProvider>
            <RouterProvider router={router}/>
        </CartProvider>
    </React.StrictMode>
);
