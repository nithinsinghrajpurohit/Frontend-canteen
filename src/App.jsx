import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from "./pages/LoginPage"; // adjust path if needed
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import SignupPage from "./pages/SignupPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import ChatWidget from "./components/ChatWidget";

import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  
  // The default ID that only works for the original template author
  const DEFAULT_CLIENT_ID = "999961982575-kui444695cnbl4dr1qd0bs9acnmaqgqr.apps.googleusercontent.com";
  
  // Use the env var if it exists, otherwise fallback to default (which will fail on production)
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || DEFAULT_CLIENT_ID;
  
  // Check if we are using the default ID on a non-localhost domain
  if (googleClientId === DEFAULT_CLIENT_ID && window.location.hostname !== "localhost") {
    console.error("🚨 CRITICAL CONFIG ERROR: You are using the default Google Client ID. This ID does not authorize your Vercel domain. You MUST create your own Client ID in Google Cloud Console and set VITE_GOOGLE_CLIENT_ID in Vercel.");
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/menu" element={<MenuPage user={user} logout={handleLogout} cartCount={cartCount} setCartCount={setCartCount} />} />
        <Route path="/cart" element={<CartPage user={user} logout={handleLogout} setCartCount={setCartCount} />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation user={user} logout={handleLogout} />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/profile" element={<ProfilePage user={user} logout={handleLogout} />} />

        {/* Add other routes */}
      </Routes>
      <ChatWidget />
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

