import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { UtensilsCrossed, CheckCircle, Home } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://canteen-backend-7xui.onrender.com";

const API = `${BACKEND_URL}/api`;


const OrderConfirmation = ({ user, logout }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${API}/order/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  // Calculate subtotal and tax for display
  const subtotal = order ? order.items.reduce((sum, item) => sum + item.item_total, 0) : 0;
  const tax = order ? order.total_amount - subtotal : 0;

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
                Order Confirmation
              </h1>
            </div>
          </div>
        </nav>
      </header>

      {/* Confirmation Content */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Loading order details...
            </p>
          </div>
        ) : order ? (
          <div className="text-center">
            {/* Success Icon */}
            <div className="mb-8 animate-bounce">
              <div className="bg-gradient-to-br from-[#88C140] to-[#22C55E] rounded-full p-6 inline-block shadow-2xl">
                <CheckCircle className="text-white" size={80} />
              </div>
            </div>

            {/* Order ID */}
            <div className="bg-white rounded-3xl p-12 shadow-lg border border-[#E5E5E5]/50 mb-8" data-testid="order-confirmation">
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Order Placed Successfully!
              </h2>
              <p
                className="text-lg text-[#666666] mb-8"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Your delicious meal is being prepared
              </p>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 mb-8">
                <p
                  className="text-sm text-[#666666] mb-2"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Your Order ID
                </p>
                <h3
                  className="text-5xl md:text-6xl font-extrabold tracking-tighter text-[#FF6B35]"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  data-testid="order-id"
                >
                  {order.order_id}
                </h3>
              </div>

              {/* Order Details */}
              <div className="border-t border-[#E5E5E5] pt-8 mb-8">
                <h4
                  className="text-xl font-bold mb-6 text-left"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Order Details
                </h4>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      data-testid={`order-item-${index}`}
                      className="flex justify-between items-center text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`${item.menu_item.category === 'veg' ? 'bg-[#22C55E]' : 'bg-[#EF4444]'} p-1.5 rounded-lg`}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          {item.menu_item.name} x {item.quantity}
                        </span>
                      </div>
                      <span
                        className="font-bold"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                        data-testid={`order-item-total-${index}`}
                      >
                        ₹{item.item_total}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax Breakdown */}
              <div className="border-t border-[#E5E5E5] pt-4 mb-4 space-y-2">
                <div className="flex justify-between text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-[#E5E5E5] pt-6">
                <div className="flex justify-between items-center">
                  <span
                    className="text-xl font-bold"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Total Amount
                  </span>
                  <span
                    className="text-3xl font-extrabold text-[#FF6B35]"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                    data-testid="order-total"
                  >
                    ₹{order.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button
                data-testid="order-more-btn"
                onClick={() => navigate("/menu")}
                className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                Order More
              </Button>
              <Button
                data-testid="go-home-btn"
                onClick={() => navigate("/")}
                className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-full px-8 py-6 text-lg transition-all active:scale-95"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                <Home className="mr-2" size={20} />
                Go Home
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-[#EF4444]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Order not found
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderConfirmation;
