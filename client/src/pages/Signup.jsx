import { useState } from "react";
import axios from "axios";
import { User, Mail, Lock, Shield, ArrowRight, Loader2, AlertCircle } from "lucide-react";

const URL = import.meta.env.VITE_API_URL;

export default function Signup({ setUser, switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents default page reload on submit
    
    if (!form.name || !form.email || !form.password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      await axios.post(`${URL}/api/auth/signup`, form);

      // Auto-login after successful signup
      const res = await axios.post(`${URL}/api/auth/login`, {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f8fafc] font-sans p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">BUGPULSE</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm">Create an account to start tracking issues.</p>
        </div>

        {/* Error Message Display */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          
          {/* Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Role Selection */}
          <div className="relative">
            <Shield className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <select
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              defaultValue="user"
            >
              <option value="user">User (Report Bugs)</option>
              <option value="tester">Tester (Verify & QA)</option>
              <option value="developer">Developer (Fix & Track)</option>
              <option value="admin">Admin (Manage System)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Toggle to Login */}
        <p className="text-sm mt-6 text-center text-slate-500">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 font-semibold hover:underline"
            onClick={switchToLogin}
          >
            Log in here
          </button>
        </p>

      </div>
    </div>
  );
}