import "./App.css";

import { useContext } from "react";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar/Navbar";
import Footer from"./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Auth from "./pages/Auth/Auth";
import Orders from "./pages/Orders/Orders";
import AdminAnalytics from "./pages/AdminAnalytics/AdminAnalytics";
import Payment from "./pages/Payment/Payment";
import Success from "./pages/Success/Success";

import {
  ThemeContext,
} from "./context/ThemeContext";

import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const { darkMode } =
    useContext(ThemeContext);

  return (
    <div

      className={
        darkMode
          ? "dark-theme"
          : "light-theme"
      }
    >
            {/* ORANGE GLOW */}
      <div className="orange-glow"></div>


      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Products />
            </>
          }
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        

        <Route
          path="/orders"
          element={<Orders />}
        />
        
        <Route
           path="/auth"
           element={<Auth />}
        />

          <Route
             path="/analytics"
            element={<AdminAnalytics />}
         />

        <Route
          path="/payment"
         element={<Payment />}
       />
         <Route
          path="/success"
         element={<Success />}
       />
       
        <Route
          path="/cart"
          element={<Cart />}
        />
      </Routes>
       
      <Footer />
    </div>
    
  );
}

export default App;