
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Eye, EyeOff, User, Mail, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://canteen-backend-7xui.onrender.com";
const API = `${BACKEND_URL}/api`;

// Roll number validation
const validateRollNumber = (roll) => {
  const pattern = /^[0-9]{2}[A-Z]{2}[0-9][A-Z][0-9]{2}[A-Z0-9][0-9]$/;
  return pattern.test(roll.toUpperCase());
};

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("student-login");
  const [showSignup, setShowSignup] = useState({ student: false, faculty: false });
  
  // Password visibility states
  const [showFacultyPassword, setShowFacultyPassword] = useState(false);

  // Student states
  const [studentRollNumber, setStudentRollNumber] = useState("");
  const [studentDob, setStudentDob] = useState("");
  
  const [studentSignupData, setStudentSignupData] = useState({
    name: "",
    branch: "",
    year: "",
    section: "",
    roll_number: "",
    phone: "",
    dob: "",
  });

  // Faculty states
  const [facultyEmail, setFacultyEmail] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");
  const [facultySignupData, setFacultySignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Google Signup State
  const [showGoogleSignup, setShowGoogleSignup] = useState(false);
  const [googleToken, setGoogleToken] = useState("");
  const [googleSignupData, setGoogleSignupData] = useState({
    roll_number: "",
    phone: "",
    branch: "",
    year: "",
    section: ""
  });

  // ✅ STUDENT LOGIN WITH ROLL NUMBER & DOB
  const handleStudentLogin = async (e) => {
    e.preventDefault();
    const roll = studentRollNumber.toUpperCase();
    
    if (!roll.trim()) {
      toast.error("Please enter your roll number");
      return;
    }
    if (!studentDob) {
      toast.error("Please enter your Date of Birth");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/login-student`, {
        roll_number: roll,
        dob: studentDob
      });
      onLogin(response.data);
      toast.success("Login successful!");
      navigate("/menu");
    } catch (error) {
      console.error(error);
      if (!error.response) {
        if (API.includes("127.0.0.1") && window.location.hostname !== "localhost") {
          toast.error("Deployment Error: Backend URL is localhost. Add VITE_BACKEND_URL to Vercel.");
        } else if (API.includes("onrender.com")) {
          toast.error("Network Error: Server might be sleeping. Please wait 30s and try again.");
        } else {
          toast.error("Network Error: Cannot connect to server. Please check your connection.");
        }
      } else {
        toast.error(error.response?.data?.detail || "Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Faculty Login
  const handleFacultyLogin = async (e) => {
    e.preventDefault();
    if (!facultyEmail.trim() || !facultyPassword.trim()) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/login-faculty`, {
        email: facultyEmail,
        password: facultyPassword,
      });
      onLogin(response.data);
      toast.success("Login successful!");
      navigate("/menu");
    } catch (error) {
      if (!error.response) {
        if (API.includes("onrender.com")) {
          toast.error("Network Error: Server might be sleeping. Please wait 30s and try again.");
        } else {
          toast.error("Network Error: Cannot connect to server.");
        }
      } else {
        toast.error(error.response?.data?.detail || "Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  // Student Signup
  const handleStudentSignup = async (e) => {
    e.preventDefault();
    const roll = studentSignupData.roll_number.toUpperCase();
    
    if (!validateRollNumber(roll)) {
      toast.error("Invalid roll number format (e.g., 22CSE1A001X)");
      return;
    }
    if (!studentSignupData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!studentSignupData.dob) {
      toast.error("Please enter your Date of Birth");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/auth/signup-student`, {
        name: studentSignupData.name,
        roll_number: roll,
        branch: studentSignupData.branch,
        year: parseInt(studentSignupData.year),
        section: studentSignupData.section || null,
        phone: studentSignupData.phone || null,
        dob: studentSignupData.dob,
      });
      toast.success("Signup successful! Please login.");
      setShowSignup({ ...showSignup, student: false });
      setStudentSignupData({ 
        name: "", 
        branch: "", 
        year: "", 
        section: "", 
        roll_number: "", 
        phone: "",
        dob: ""
      });
      setActiveTab("student-login");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Faculty Signup
  const handleFacultySignup = async (e) => {
    e.preventDefault();
    if (!facultySignupData.name.trim() || !facultySignupData.email.trim() || !facultySignupData.password.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/auth/signup-faculty`, {
        name: facultySignupData.name,
        email: facultySignupData.email,
        phone: facultySignupData.phone || null,
        password: facultySignupData.password,
      });
      toast.success("Faculty account created! You can now login.");
      setShowSignup({ ...showSignup, faculty: false });
      setFacultySignupData({ name: "", email: "", phone: "", password: "" });
      setActiveTab("faculty-login");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Login Handler
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      // Send the ID token to the backend
      const response = await axios.post(`${API}/auth/google-login`, {
        credential: credentialResponse.credential,
      });
      onLogin(response.data);
      toast.success("Google login successful!");
      navigate("/menu");
    } catch (error) {
      // If user not found (404), show the Complete Profile form
      if (error.response && error.response.status === 404) {
        setGoogleToken(credentialResponse.credential);
        setShowGoogleSignup(true);
        toast.info("Please complete your profile to continue.");
      } else {
        if (!error.response) {
          if (API.includes("onrender.com")) {
            toast.error("Network Error: Server might be sleeping. Please wait 30s and try again.");
          } else {
            toast.error("Network Error: Cannot connect to server.");
          }
        } else {
          toast.error(error.response?.data?.detail || "Google login failed");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Signup Submit (Complete Profile)
  const handleGoogleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!googleSignupData.phone || googleSignupData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/google-signup-student`, {
        credential: googleToken,
        roll_number: `G-${Date.now()}`,
        phone: googleSignupData.phone,
        branch: googleSignupData.branch,
        year: 1,
        section: null
      });
      onLogin(response.data);
      toast.success("Profile completed! Login successful.");
      navigate("/menu");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#88C140] p-4 rounded-2xl">
              <UtensilsCrossed className="text-white" size={36} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Welcome Back
          </h1>
          <p className="text-base md:text-lg text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Login or create account to order delicious meals
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-[#E5E5E5]/50 p-8">
          
          {/* GOOGLE COMPLETE PROFILE FORM */}
          {showGoogleSignup ? (
            <form onSubmit={handleGoogleSignupSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-[#FF6B35]" style={{ fontFamily: 'Outfit, sans-serif' }}>Complete Your Profile</h3>
                <p className="text-sm text-gray-500">Phone number is mandatory</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={googleSignupData.phone}
                  onChange={(e) => setGoogleSignupData({ ...googleSignupData, phone: e.target.value })}
                  className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] h-12 px-4"
                />
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Branch *</label>
                  <select
                    value={googleSignupData.branch}
                    onChange={(e) => setGoogleSignupData({ ...googleSignupData, branch: e.target.value })}
                    className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] focus:bg-white h-12 px-3 w-full"
                  >
                    <option value="">Select</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="AIML">AIML</option>
                    <option value="AIDS">AIDS</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!googleSignupData.phone || !googleSignupData.branch || loading}
                className="w-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full py-6 shadow-lg"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                {loading ? "Creating Account..." : "Complete Signup"}
              </Button>
              <Button type="button" variant="link" onClick={() => setShowGoogleSignup(false)} className="w-full text-gray-500">
                Cancel
              </Button>
            </form>
          ) : (
          <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#F2F2F2] rounded-2xl p-1">
              <TabsTrigger
                value="student-login"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                <User className="mr-2" size={18} />
                Student
              </TabsTrigger>
              <TabsTrigger
                value="faculty-login"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
              >
                <Mail className="mr-2" size={18} />
                Faculty
              </TabsTrigger>
            </TabsList>

            {/* ✅ STUDENT LOGIN WITH ALL FIXES */}
            <TabsContent value="student-login" className="mt-0">
              {!showSignup.student ? (
                <form onSubmit={handleStudentLogin} className="space-y-6">
                  {/* Roll Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Roll Number *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., 22CSE1A001X"
                      value={studentRollNumber}
                      onChange={(e) => setStudentRollNumber(e.target.value.toUpperCase())}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] focus:bg-white h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Date of Birth *
                    </label>
                    <Input
                      type="date"
                      value={studentDob}
                      onChange={(e) => setStudentDob(e.target.value)}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] focus:bg-white h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!studentRollNumber || !studentDob || loading}
                    className="w-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full py-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                    style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowSignup({ ...showSignup, student: true })}
                    className="w-full text-[#FF6B35] hover:text-[#FF6B35]/80 p-0 h-auto"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <UserPlus className="mr-1 inline h-4 w-4" /> Create Student Account
                  </Button>
                </form>
              ) : (
                // Student Signup Form (unchanged - complete)
                <form onSubmit={handleStudentSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={studentSignupData.name}
                      onChange={(e) => setStudentSignupData({ ...studentSignupData, name: e.target.value })}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>Branch *</label>
                      <select
                        value={studentSignupData.branch}
                        onChange={(e) => setStudentSignupData({ ...studentSignupData, branch: e.target.value })}
                        className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] focus:bg-white h-12 px-3 w-full"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        <option value="">Select Branch</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">Mechanical</option>
                        <option value="CIVIL">Civil</option>
                        <option value="AIML">AI & ML</option>
                        <option value="AIDS">AI & DS</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>Year *</label>
                      <select
                        value={studentSignupData.year}
                        onChange={(e) => setStudentSignupData({ ...studentSignupData, year: e.target.value })}
                        className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] focus:bg-white h-12 px-3 w-full"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Section
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., A, B"
                      value={studentSignupData.section}
                      onChange={(e) => setStudentSignupData({ ...studentSignupData, section: e.target.value.toUpperCase() })}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Date of Birth *
                    </label>
                    <Input
                      type="date"
                      value={studentSignupData.dob}
                      onChange={(e) => setStudentSignupData({ ...studentSignupData, dob: e.target.value })}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Phone Number 
                    </label>
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      value={studentSignupData.phone}
                      onChange={(e) => setStudentSignupData({ ...studentSignupData, phone: e.target.value })}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Roll Number * (e.g., 22CSE1A001X)
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter roll number"
                      value={studentSignupData.roll_number}
                      onChange={(e) => setStudentSignupData({ ...studentSignupData, roll_number: e.target.value.toUpperCase() })}
                      maxLength={10}
                      className={`rounded-xl border-2 h-12 px-4 w-full ${
                        !validateRollNumber(studentSignupData.roll_number) && studentSignupData.roll_number
                          ? "border-red-400 bg-red-50 focus:border-red-400"
                          : "border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] focus:bg-white"
                      }`}
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                    {!validateRollNumber(studentSignupData.roll_number) && studentSignupData.roll_number && (
                      <p className="text-xs text-red-500 mt-1">Invalid format. Use: 22CSE1A001X</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={!validateRollNumber(studentSignupData.roll_number) || 
                             !studentSignupData.name || 
                             !studentSignupData.branch || 
                             !studentSignupData.year || 
                             !studentSignupData.dob || loading}
                    className="w-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full py-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                    style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
                  >
                    {loading ? "Creating..." : "Create Student Account"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowSignup({ ...showSignup, student: false })}
                    className="w-full text-[#666666] hover:text-[#FF6B35] p-0 h-auto"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    ← Back to Login
                  </Button>
                </form>
              )}
            </TabsContent>

            {/* Faculty Tab - Complete */}
            <TabsContent value="faculty-login" className="mt-0">
              {!showSignup.faculty ? (
                <form onSubmit={handleFacultyLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="faculty@college.edu"
                      value={facultyEmail}
                      onChange={(e) => setFacultyEmail(e.target.value)}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] focus:bg-white h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Password *
                    </label>
                    <div className="relative">
                      <Input
                        type={showFacultyPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={facultyPassword}
                        onChange={(e) => setFacultyPassword(e.target.value)}
                        className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] focus:bg-white h-12 pl-4 pr-12"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowFacultyPassword(!showFacultyPassword)}
                      >
                        {showFacultyPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <p className="text-xs text-[#666666] mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Demo: faculty@college.edu / faculty123
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={!facultyEmail || !facultyPassword || loading}
                    className="w-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full py-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                    style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
                  >
                    {loading ? "Logging in..." : "Login as Faculty"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowSignup({ ...showSignup, faculty: true })}
                    className="w-full text-[#FF6B35] hover:text-[#FF6B35]/80 p-0 h-auto"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <UserPlus className="mr-1 inline h-4 w-4" /> Create Faculty Account
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleFacultySignup} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={facultySignupData.name}
                      onChange={(e) => setFacultySignupData({ ...facultySignupData, name: e.target.value })}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="faculty@college.edu"
                      value={facultySignupData.email}
                      onChange={(e) => setFacultySignupData({ ...facultySignupData, email: e.target.value })}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Phone (Optional)
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      value={facultySignupData.phone}
                      onChange={(e) => setFacultySignupData({ ...facultySignupData, phone: e.target.value })}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Password *
                    </label>
                    <Input
                      type="password"
                      placeholder="Create password"
                      value={facultySignupData.password}
                      onChange={(e) => setFacultySignupData({ ...facultySignupData, password: e.target.value })}
                      className="rounded-xl border-2 border-[#F2F2F2] bg-[#F2F2F2]/30 focus:border-[#FF6B35] h-12 px-4"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!facultySignupData.name || !facultySignupData.email || !facultySignupData.password || loading}
                    className="w-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 rounded-full py-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                    style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
                  >
                    {loading ? "Creating..." : "Create Faculty Account"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowSignup({ ...showSignup, faculty: false })}
                    className="w-full text-[#666666] hover:text-[#FF6B35] p-0 h-auto"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    ← Back to Login
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>

          {activeTab === "faculty-login" && (
          <>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              useOneTap
            />
          </div>
          </>
          )}
          </>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-[#666666] hover:text-[#FF6B35]"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
