import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";
import { UtensilsCrossed, CheckCircle, Clock, RefreshCw, CheckSquare, User } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://canteen-backend-7xui.onrender.com";
const API = `${BACKEND_URL}/api`;

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active"); // active, ready, history

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/admin/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, []);

  // Poll for new orders every 10 seconds
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const updateStatus = async (orderId, newStatus) => {
    // 1. Instantly update the UI (Optimistic Update)
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.order_id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    try {
      // 2. Send the request to the server in the background
      await axios.post(`${API}/admin/order/update-status`, {
        order_id: orderId,
        status: newStatus
      });
      toast.success(`Order marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
      // 3. If it fails, refresh from the server to fix the UI
      fetchOrders(); 
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: '2-digit', minute: '2-digit'
    });
  };

  // Filter logic
  const filteredOrders = orders.filter(order => {
    if (filter === "active") return order.status === "confirmed" || order.status === "preparing";
    if (filter === "ready") return order.status === "ready";
    if (filter === "history") return order.status === "completed" || order.status === "cancelled";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF6B35] p-3 rounded-xl">
            <UtensilsCrossed className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Kitchen Dashboard</h1>
            <p className="text-gray-500">Manage orders and status</p>
          </div>
        </div>
        <Button onClick={fetchOrders} variant="outline" className="gap-2">
          <RefreshCw size={16} /> Refresh
        </Button>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-8 flex gap-4">
        <button 
          onClick={() => setFilter("active")}
          className={`px-6 py-2 rounded-full font-bold transition-all ${filter === "active" ? "bg-[#FF6B35] text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100"}`}
        >
          Active Orders
        </button>
        <button 
          onClick={() => setFilter("ready")}
          className={`px-6 py-2 rounded-full font-bold transition-all ${filter === "ready" ? "bg-green-500 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100"}`}
        >
          Ready for Pickup
        </button>
        <button 
          onClick={() => setFilter("history")}
          className={`px-6 py-2 rounded-full font-bold transition-all ${filter === "history" ? "bg-gray-800 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100"}`}
        >
          History
        </button>
      </div>

      {/* Orders Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full text-gray-500">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <CheckCircle className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 text-lg">No orders in this category</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.order_id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              {/* Card Header */}
              <div className={`p-4 border-b border-gray-100 flex justify-between items-start ${order.status === 'ready' ? 'bg-green-50' : ''}`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-lg text-gray-900">#{order.order_id.slice(-4)}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                      order.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock size={14} /> {formatDate(order.created_at)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#FF6B35]">₹{order.total_amount}</p>
                </div>
              </div>

              {/* User Details */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                <div className="bg-white p-2 rounded-full border border-gray-200">
                  <User size={16} className="text-gray-500" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{order.user_name}</p>
                  <p className="text-xs text-gray-500 font-mono">{order.user_details}</p>
                  {order.user_phone && (
                    <p className="text-xs text-gray-500 mt-0.5">📞 {order.user_phone}</p>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div className="p-4 flex-1">
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-800">
                        <span className="font-bold text-gray-900">{item.quantity}x</span> {item.menu_item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 grid grid-cols-2 gap-3">
                {order.status !== 'ready' && order.status !== 'completed' && (
                  <Button 
                    onClick={() => updateStatus(order.order_id, "ready")}
                    className="col-span-2 bg-green-600 hover:bg-green-700 text-white w-full"
                  >
                    <CheckCircle size={18} className="mr-2" /> Mark Ready
                  </Button>
                )}
                {order.status === 'ready' && (
                  <Button 
                    onClick={() => updateStatus(order.order_id, "completed")}
                    className="col-span-2 bg-gray-800 hover:bg-gray-900 text-white w-full"
                  >
                    <CheckSquare size={18} className="mr-2" /> Mark Completed
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
