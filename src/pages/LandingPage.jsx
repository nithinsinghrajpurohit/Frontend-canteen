import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { UtensilsCrossed, LogIn, ShoppingBag, Clock, Award } from "lucide-react";

const LandingPage = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-4 mx-4 z-50">
        <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#88C140] p-3 rounded-xl">
              <UtensilsCrossed className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Smart Canteen
            </h1>
          </div>
          <Button
            data-testid="header-login-btn"
            onClick={() => navigate(user ? "/menu" : "/login")}
            className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full px-6 py-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
            style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
          >
            {user ? "Go to Menu" : "Login"}
            <LogIn className="ml-2" size={18} />
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2
              className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
              data-testid="hero-title"
            >
              Your Hunger,{" "}
              <span className="text-[#FF6B35]">Our Mission</span>
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed text-[#666666]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
              data-testid="hero-description"
            >
              Skip the queues, order ahead, and savor delicious meals prepared fresh daily. The future of campus dining is here.
            </p>
            <div className="flex gap-4">
              <Button
                data-testid="hero-order-now-btn"
                onClick={() => navigate(user ? "/menu" : "/login")}
                className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                Order Now
                <ShoppingBag className="ml-2" size={20} />
              </Button>
              <Button
                data-testid="hero-learn-more-btn"
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-full px-8 py-6 text-lg transition-all active:scale-95"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1567297642193-b771fa3adcce"
              alt="Delicious food spread"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
              data-testid="hero-image"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-[#E5E5E5]">
              <div className="flex items-center gap-3">
                <div className="bg-[#88C140] p-3 rounded-xl">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>50+</p>
                  <p className="text-sm text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>Menu Items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-32">
        <h3
          className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16"
          style={{ fontFamily: 'Outfit, sans-serif' }}
          data-testid="features-title"
        >
          Why Choose Smart Canteen?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-[#E5E5E5]/50 shadow-sm hover:shadow-md transition-all duration-300" data-testid="feature-card-1">
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] p-4 rounded-2xl inline-block mb-6">
              <Clock className="text-white" size={32} />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Quick & Easy
            </h4>
            <p className="text-base md:text-lg leading-relaxed text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Order in seconds, pick up when ready. No more waiting in long queues.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-[#E5E5E5]/50 shadow-sm hover:shadow-md transition-all duration-300" data-testid="feature-card-2">
            <div className="bg-gradient-to-br from-[#88C140] to-[#FFD93D] p-4 rounded-2xl inline-block mb-6">
              <UtensilsCrossed className="text-white" size={32} />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Fresh Daily
            </h4>
            <p className="text-base md:text-lg leading-relaxed text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              All meals prepared fresh with quality ingredients. Veg and non-veg options available.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-[#E5E5E5]/50 shadow-sm hover:shadow-md transition-all duration-300" data-testid="feature-card-3">
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#88C140] p-4 rounded-2xl inline-block mb-6">
              <ShoppingBag className="text-white" size={32} />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Simple Ordering
            </h4>
            <p className="text-base md:text-lg leading-relaxed text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Browse menu, add to cart, and place your order. Get instant confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#88C140] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h3
              className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}
              data-testid="cta-title"
            >
              Ready to Order?
            </h3>
            <p
              className="text-lg md:text-xl text-white/90 mb-8"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
              data-testid="cta-description"
            >
              Join hundreds of students and faculty enjoying hassle-free meals every day.
            </p>
            <Button
              data-testid="cta-get-started-btn"
              onClick={() => navigate("/login")}
              className="bg-white text-[#FF6B35] hover:bg-white/90 rounded-full px-10 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
              style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#88C140] p-2 rounded-xl">
              <UtensilsCrossed className="text-white" size={24} />
            </div>
            <h4 className="text-xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Smart Canteen
            </h4>
          </div>
          <p className="text-[#999999]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            © 2025 Smart Canteen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;