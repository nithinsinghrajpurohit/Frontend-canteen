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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/orders/user/${user.user_id}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load order history");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user?.user_id) {
      fetchOrders();
    }
  }, [user, navigate, fetchOrders]);

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Date N/A";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return "Date N/A";
    }
  };

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

        {/* Order History */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <Clock className="text-[#FF6B35]" /> Order History
          </h3>
          <Button variant="ghost" size="sm" onClick={fetchOrders}><RefreshCw size={16} className="mr-2"/> Refresh</Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#666666]">Loading history...</p>
          </div>
        ) : !Array.isArray(orders) || orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E5E5E5]/50">
            <Package className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No orders placed yet.</p>
            <Button onClick={() => navigate("/menu")} variant="link" className="text-[#FF6B35]">Order something tasty!</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              if (!order) return null;
              const isReady = order?.status === 'ready';
              return (
              <div key={order?.order_id || Math.random()} className={`bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md transition-all ${isReady ? 'border-green-500 ring-2 ring-green-100' : 'border-[#E5E5E5]/50'}`}>
                {isReady && (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl mb-4 flex items-center gap-2 font-bold animate-pulse">
                    <CheckCircle size={20} /> Your Order is Ready! Please Pickup.
                  </div>
                )}
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>Order #{order?.order_id || "Unknown"}</p>
                    <p className="text-sm text-[#666666]">{formatDate(order?.created_at)}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-2xl font-bold text-[#FF6B35]" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{(order?.total_amount || 0).toFixed(2)}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      isReady ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
                    }`}>
                      {order?.status || "Pending"}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {order?.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-[#666666]">
                      <span>{item.quantity} x {item.menu_item?.name || "Item"}</span>
                      <span>₹{item.item_total || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
