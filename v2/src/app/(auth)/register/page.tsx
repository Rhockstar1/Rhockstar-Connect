"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, UserPlus, ArrowRight, AlertCircle } from "lucide-react";
import { registerUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const { user, error } = await registerUser(email, password, fullName, username);

    if (error) {
      setError(error);
      setLoading(false);
    } else if (user) {
      router.push("/feed");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617] text-white flex flex-col">
      {/* Neomorphic Glows */}
      <div className="neo-glow bg-brand/20 w-[600px] h-[600px] top-[-200px] right-[-200px]" />
      <div className="neo-glow bg-brand-purple/20 w-[500px] h-[500px] bottom-[-150px] left-[-150px]" style={{ animationDelay: '2s' }} />

      {/* NAV */}
      <nav className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-50">
        <Link href="/" className="text-xl font-bold font-outfit text-brand flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-purple flex items-center justify-center neo-card shadow-brand/30 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-white text-lg">R</span>
          </div>
          Rhockstar Connect
        </Link>
        <Link href="/login" className="neo-button-secondary text-sm px-6 py-2">
          Login
        </Link>
      </nav>

      {/* AUTH WRAPPER */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <section className="w-full max-w-md neo-card p-10 my-8">
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold mb-3 text-white">Create Account</h2>
            <p className="text-slate-400">Join Rhockstar Connect and start connecting</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
              <span className="mt-0.5">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-2">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-500 group-focus-within:text-brand transition-colors" />
                </div>
                <input
                  type="text"
                  className="neo-input pl-12"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-2">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 group-focus-within:text-brand transition-colors font-bold text-lg">@</span>
                </div>
                <input
                  type="text"
                  className="neo-input pl-12"
                  placeholder="Choose a unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-slate-500 ml-2 mt-1">This will be your public identity</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-brand transition-colors" />
                </div>
                <input
                  type="email"
                  className="neo-input pl-12"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-brand transition-colors" />
                </div>
                <input
                  type="password"
                  className="neo-input pl-12 pr-12"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="h-1 bg-slate-800/50 rounded-full mt-2 overflow-hidden neo-inset mx-2">
                <div className={`h-full transition-all duration-300 ${
                  password.length === 0 ? 'w-0' :
                  password.length < 6 ? 'w-1/3 bg-red-500' :
                  password.length < 10 ? 'w-2/3 bg-amber-500' :
                  'w-full bg-emerald-500'
                }`} />
              </div>
              <p className="text-xs text-slate-500 ml-2 mt-1">Must contain 8+ characters</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-2">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-brand transition-colors" />
                </div>
                <input
                  type="password"
                  className="neo-input pl-12 pr-12"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 text-sm text-slate-400 cursor-pointer hover:text-white transition-colors">
                <div className="relative flex items-center">
                  <input type="checkbox" required className="peer appearance-none w-5 h-5 border border-slate-600 rounded bg-slate-800/50 checked:bg-brand checked:border-brand transition-all cursor-pointer" />
                  <svg className="absolute w-3 h-3 text-white left-1 pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                I agree to the Terms & Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="neo-button-primary mt-4 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <UserPlus className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-brand font-bold hover:underline transition-colors ml-1">
              Login
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
