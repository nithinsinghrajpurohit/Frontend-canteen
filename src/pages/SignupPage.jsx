import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { UtensilsCrossed, UserPlus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://canteen-backend-7xui.onrender.com";

const API = `${BACKEND_URL}/api`;

const SignupPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    roll_number: "",
    phone: "",
    branch: "",
    year: "",
    section: "",
    dob: "",
  });

  const validateRoll = (roll) => {
    const pattern =
      /^[0-9][0-9][A-Z][A-Z][0-9][A-Z][0-9][0-9][A-Z0-9][0-9]$/;
    return pattern.test(roll);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "roll_number" ? value.toUpperCase() : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateRoll(form.roll_number)) {
      toast.error("Invalid roll number format");
      return;
    }

    try {
      await axios.post(`${API}/auth/signup-student`, {
        ...form,
      });

      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      if (!error.response) {
        if (API.includes("127.0.0.1") && window.location.hostname !== "localhost") {
          toast.error("Deployment Error: Backend URL is localhost. Add VITE_BACKEND_URL to Vercel.");
        } else if (API.includes("onrender.com")) {
          toast.error("Network Error: Server might be sleeping. Please wait 30s and try again.");
        } else {
          toast.error("Network Error: Cannot connect to server.");
        }
      } else {
        toast.error(error.response?.data?.detail || "Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#88C140] p-4 rounded-2xl">
              <UtensilsCrossed className="text-white" size={36} />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-[#666]">Join Smart Canteen today 🚀</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              placeholder="Roll Number"
              name="roll_number"
              value={form.roll_number}
              onChange={handleChange}
              maxLength={10}
              required
            />

            {!validateRoll(form.roll_number) && form.roll_number && (
              <p className="text-sm text-red-500">
                Invalid roll number format
              </p>
            )}

            <Input
              placeholder="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <Input
              placeholder="Branch (CSE, ECE...)"
              name="branch"
              value={form.branch}
              onChange={handleChange}
              required
            />

            <Input
              placeholder="Year (1–4)"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
            />

            <Input
              placeholder="Section"
              name="section"
              value={form.section}
              onChange={handleChange}
            />

            <Input
              placeholder="Date of Birth"
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              disabled={!validateRoll(form.roll_number)}
              className="w-full bg-[#FF6B35] text-white rounded-full py-6"
            >
              <UserPlus className="mr-2" />
              Sign Up
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="text-[#666]"
          >
            Already have an account? Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

