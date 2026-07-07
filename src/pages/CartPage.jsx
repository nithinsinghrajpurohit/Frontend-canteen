import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { UtensilsCrossed, ArrowLeft, Trash2, Plus, Minus, ShoppingBag, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://canteen-backend-7xui.onrender.com";
const API = `${BACKEND_URL}/api`;

const CartPage = ({ user, logout, setCartCount }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  // 🔥 FIXED: Full debugging + error handling
  const fetchCart = useCallback(async () => {
    if (!user?.user_id) return;
    try {
      console.log("🔄 Fetching cart for user_id:", user.user_id);
      const response = await axios.get(`${API}/cart/${user.user_id}`);
      
      console.log("🛒 Raw API response:", response.data);
      
      // Handle different response structures
      const cartData = response.data;
      
      if (!cartData) {
        console.log("❌ No cart data returned");
        setCart({ items: [], total_amount: 0 });
        setLoading(false);
        return;
      }

      // Ensure items array exists
      const items = cartData.items || [];
      console.log("📦 Cart items array:", items);
      
      if (items.length > 0) {
        console.log("✅ First cart item:", items[0]);
      } else {
        console.log("❌ Empty items array");
      }

      setCart({
        ...cartData,
        items: items
      });
      
      const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      console.log("🔢 Total items count:", totalItems);
      setCartCount(totalItems);
      
    } catch (error) {
      console.error("❌ Cart fetch FAILED:", error.response?.status);
      console.error("❌ Error details:", error.response?.data || error.message);
      
      // Set empty cart on error
      setCart({ items: [], total_amount: 0 });
      toast.error(`Failed to load cart: ${error.response?.status || error.message}`);
    } finally {
      setLoading(false);
    }
  }, [user, setCartCount]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (menuItemId, newQuantity) => {
    try {
      console.log("🔄 Updating quantity:", menuItemId, "to", newQuantity);
      await axios.post(`${API}/cart/update`, {
        user_id: user.user_id,
        menu_item_id: menuItemId,
        quantity: newQuantity,
      });
      await fetchCart(); // Refresh cart
      if (newQuantity === 0) {
        toast.success("Item removed from cart");
      } else {
        toast.success("Cart updated");
      }
    } catch (error) {
      console.error("❌ Update failed:", error.response?.data);
      toast.error("Failed to update cart");
    }
  };

  const placeOrder = async () => {
    if (!cart || (cart.items?.length || 0) === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setPlacing(true);
    try {
      const response = await axios.post(`${API}/order/place`, {
        user_id: user.user_id,
      });
      toast.success("Order placed successfully!");
      setCartCount(0);
      setCart({ items: [] });
      navigate(`/order-confirmation/${response.data.order_id}`);
    } catch (error) {
      console.error("❌ Order failed:", error.response?.data);
      toast.error(error.response?.data?.detail || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  // 🔥 DEBUG BUTTON - Remove after fixing
  const debugRefresh = async () => {
    console.log("🔧 Manual refresh clicked");
    setLoading(true);
    await fetchCart();
    toast.success("Cart refreshed!");
  };

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
              <div>
                <h1 className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Your Cart
                </h1>
                <p className="text-xs text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  User ID: {user.user_id || 'Not loaded'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={debugRefresh}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-1"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                <RefreshCw size={16} className="mr-1" />
                Debug Refresh
              </Button>
              <Button
                data-testid="back-to-menu-btn"
                onClick={() => navigate("/menu")}
                className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-full px-6 py-2 transition-all active:scale-95"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to Menu
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Cart Content */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="animate-spin mx-auto mb-4 text-[#FF6B35]" size={48} />
            <p className="text-xl text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Loading cart...
            </p>
          </div>
        ) : !cart || (cart.items?.length || 0) === 0 ? (
          <div className="text-center py-20" data-testid="empty-cart">
            <div className="bg-white rounded-3xl p-12 inline-block mb-6 shadow-lg">
              <ShoppingBag className="text-[#FF6B35] mx-auto" size={64} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Your Cart is Empty
            </h2>
            <p className="text-lg text-[#666666] mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Add some delicious items from our menu!
            </p>
            <Button
              data-testid="browse-menu-btn"
              onClick={() => navigate("/menu")}
              className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
              style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4" data-testid="cart-items-list">
              {(cart.items || []).map((item, index) => (
                <div
                  key={item.menu_item?.id || index}
                  data-testid={`cart-item-${index}`}
                  className="bg-white rounded-3xl p-6 border border-[#E5E5E5]/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex gap-6">
                    <img
                      src={item.menu_item?.image_url || '/placeholder.jpg'}
                      alt={item.menu_item?.name || 'Item'}
                      className="w-24 h-24 object-cover rounded-2xl bg-gray-200"
                      data-testid={`cart-item-image-${index}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-bold truncate" style={{ fontFamily: 'Outfit, sans-serif' }} data-testid={`cart-item-name-${index}`}>
                            {item.menu_item?.name || 'Unknown Item'}
                          </h3>
                          <p className="text-sm text-[#666666] truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            {item.menu_item?.description || 'No description'}
                          </p>
                        </div>
                        <div className={`p-1.5 rounded-lg ${item.menu_item?.category === 'veg' ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-xl font-bold text-[#FF6B35]" style={{ fontFamily: 'Outfit, sans-serif' }} data-testid={`cart-item-price-${index}`}>
                          ₹{(item.menu_item?.price || 0)} x {item.quantity || 0} = ₹{(item.item_total || 0).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3">
                          <Button
                            data-testid={`decrease-quantity-btn-${index}`}
                            onClick={() => updateQuantity(item.menu_item?.id, (item.quantity || 0) - 1)}
                            size="sm"
                            className="bg-[#F2F2F2] text-[#1A1A1A] hover:bg-[#E5E5E5] rounded-full w-8 h-8 p-0 disabled:opacity-50"
                            disabled={(item.quantity || 0) <= 1}
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="text-lg font-bold min-w-[24px] text-center" style={{ fontFamily: 'Outfit, sans-serif' }} data-testid={`cart-item-quantity-${index}`}>
                            {item.quantity || 0}
                          </span>
                          <Button
                            data-testid={`increase-quantity-btn-${index}`}
                            onClick={() => updateQuantity(item.menu_item?.id, (item.quantity || 0) + 1)}
                            size="sm"
                            className="bg-[#88C140] text-white hover:bg-[#88C140]/90 rounded-full w-8 h-8 p-0"
                          >
                            <Plus size={16} />
                          </Button>
                          <Button
                            data-testid={`remove-item-btn-${index}`}
                            onClick={() => updateQuantity(item.menu_item?.id, 0)}
                            size="sm"
                            variant="ghost"
                            className="text-[#EF4444] hover:bg-[#EF4444]/10 rounded-full"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 border border-[#E5E5E5]/50 shadow-lg sticky top-24" data-testid="order-summary">
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Order Summary
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    <span>Subtotal ({(cart.items || []).length} items)</span>
                    <span data-testid="subtotal">₹{(cart.total_amount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    <span>Tax (5%)</span>
                    <span data-testid="tax">₹{((cart.total_amount || 0) * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#E5E5E5] pt-4 flex justify-between text-xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    <span>Total</span>
                    <span className="text-[#FF6B35]" data-testid="total">₹{((cart.total_amount || 0) * 1.05).toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  data-testid="place-order-btn"
                  onClick={placeOrder}
                  disabled={placing || (cart.items?.length || 0) === 0}
                  className="w-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
                  style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
                >
                  {placing ? "Placing Order..." : "Place Order"}
                  <ShoppingBag className="ml-2" size={20} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CartPage;

