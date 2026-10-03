import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ReturnPolicy from "./pages/ReturnPolicy";
import Disclaimer from "./pages/Disclaimer";

import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import AdminProducts from "./admin/AdminProducts";
import EditProduct from "./admin/EditProduct";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";

import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? "dark-theme app-shell" : "light-theme app-shell"}>
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;