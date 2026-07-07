
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { UtensilsCrossed, ShoppingCart, LogOut, Plus, Search, User } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://canteen-backend-7xui.onrender.com";
const API = `${BACKEND_URL}/api`;

const MenuPage = ({ user, logout, cartCount, setCartCount }) => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch menu from the backend API
  useEffect(() => {
    const loadPageData = async () => {
      if (!user?.user_id) return;

      setLoading(true);
      try {
        // Fetch menu and cart count in parallel for efficiency
        const [menuResponse, cartResponse] = await Promise.all([
          axios.get(`${API}/menu`),
          axios.get(`${API}/cart/${user.user_id}`),
        ]);

        setMenuItems(menuResponse.data);

        const totalItems = cartResponse.data.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error("Failed to load page data:", error);
        toast.error("Failed to load menu or cart. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [user?.user_id, setCartCount]);

  const fetchCartCount = async () => {
    try {
      const response = await axios.get(`${API}/cart/${user.user_id}`);
      const totalItems = response.data.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error("Failed to fetch cart count");
    }
  };

  const addToCart = async (menuItemId) => {
    try {
      await axios.post(`${API}/cart/add`, {
        user_id: user.user_id,
        menu_item_id: menuItemId,
        quantity: 1,
      });
      toast.success("Item added to cart!");
      fetchCartCount();
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  // Filter items based on category and search query
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header - EXACTLY SAME */}
      <header className="sticky top-4 mx-4 z-50">
        <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl px-6 md:px-12 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#FF6B35] to-[#88C140] p-3 rounded-xl">
                <UtensilsCrossed className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Smart Canteen
                </h1>
                <p className="text-sm text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Welcome, {user.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                data-testid="cart-btn"
                onClick={() => navigate("/cart")}
                className="bg-[#88C140] text-white hover:bg-[#88C140]/90 rounded-full px-6 py-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 relative"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span
                    data-testid="cart-count-badge"
                    className="absolute -top-2 -right-2 bg-[#FF6B35] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button
                data-testid="profile-btn"
                onClick={() => navigate("/profile")}
                variant="ghost"
                className="hover:bg-[#F2F2F2] rounded-full"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                <User size={18} />
              </Button>
              <Button
                data-testid="logout-btn"
                onClick={logout}
                variant="ghost"
                className="hover:bg-[#F2F2F2] rounded-full"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Menu Section - SAME DESIGN */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Outfit, sans-serif' }} data-testid="menu-title">
            Today's Menu
          </h2>
          <p className="text-base md:text-lg text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }} data-testid="menu-subtitle">
            Fresh, delicious, and made with love ✨
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] transition-all duration-200 shadow-sm"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* ✅ Tabs now work with your menuData */}
        <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveCategory}>
          <TabsList className="inline-flex bg-white rounded-full p-2 shadow-md border border-[#E5E5E5]/50 mx-auto" data-testid="category-tabs">
            <TabsTrigger
              value="all"
              className="rounded-full px-8 py-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#88C140] data-[state=active]:text-white"
              style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              data-testid="all-tab"
            >
              All Items
            </TabsTrigger>
            <TabsTrigger
              value="veg"
              className="rounded-full px-8 py-2 data-[state=active]:bg-[#22C55E] data-[state=active]:text-white"
              style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              data-testid="veg-tab"
            >
              <span className="w-3 h-3 bg-[#22C55E] rounded-full inline-block mr-2 border-2 border-white"></span>
              Veg
            </TabsTrigger>
            <TabsTrigger
              value="non-veg"
              className="rounded-full px-8 py-2 data-[state=active]:bg-[#EF4444] data-[state=active]:text-white"
              style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              data-testid="non-veg-tab"
            >
              <span className="w-3 h-3 bg-[#EF4444] rounded-full inline-block mr-2 border-2 border-white"></span>
              Non-Veg
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* ✅ Your 100+ menu items displayed */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Loading delicious menu...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <UtensilsCrossed size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No items match your selection</h3>
            <p className="text-gray-500">Try another category or filter</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="menu-items-grid">
            {filteredItems.map((item) => (
              <div key={item.id} data-testid={`menu-item-${item.id}`} className="bg-white rounded-3xl border border-[#E5E5E5]/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200/FFE5D9/FF6B35?text=🍛";
                    }}
                    data-testid={`menu-item-image-${item.id}`}
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`${item.category === 'veg' ? 'bg-[#22C55E]' : 'bg-[#EF4444]'} p-2 rounded-xl shadow-lg`}>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }} data-testid={`menu-item-name-${item.id}`}>
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#666666] mb-4 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }} data-testid={`menu-item-description-${item.id}`}>
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-[#FF6B35]" style={{ fontFamily: 'Outfit, sans-serif' }} data-testid={`menu-item-price-${item.id}`}>
                      ₹{item.price}
                    </p>
                    <Button
                      data-testid={`add-to-cart-btn-${item.id}`}
                      onClick={() => addToCart(item.id)}
                      className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full px-6 py-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                      style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
                    >
                      <Plus size={18} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MenuPage;
