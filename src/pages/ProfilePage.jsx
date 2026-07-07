import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { UtensilsCrossed, ArrowLeft, Clock, Package, User, LogOut, RefreshCw, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://canteen-backend-7xui.onrender.com";
const API = `${BACKEND_URL}/api`;

const ProfilePage = ({ user, logout }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-4 mx-4 z-50">
        <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl px-6 md:px-12 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#FF6B35] to-[#88C140] p-3 rounded-xl">
                <UtensilsCrossed className="text-white" size={28} />
              </div>
              <h1 className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                My Profile
              </h1>
            </div>
            <Button
              onClick={() => navigate("/menu")}
              className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-full px-6 py-2 transition-all active:scale-95"
              style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Menu
            </Button>
          </div>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {/* User Details Card */}
        <div className="bg-white rounded-3xl p-8 border border-[#E5E5E5]/50 shadow-lg mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] p-6 rounded-full shadow-lg">
            <User className="text-white" size={48} />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{user.name || "User"}</h2>
            <p className="text-[#666666] text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {user.user_type === 'student' ? `Roll No: ${user.roll_number || 'N/A'}` : `Email: ${user.email || 'N/A'}`}
            </p>
            <p className="text-sm text-[#999999] mt-1 uppercase tracking-wider font-bold">{user.user_type || "Guest"}</p>
          </div>
          <Button 
            onClick={logout}
            variant="ghost" 
            className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full px-6"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>

      </section>
    </div>
  );
};

export default ProfilePage;
