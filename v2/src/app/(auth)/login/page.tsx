"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, ArrowRight, AlertCircle } from "lucide-react";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { user, error } = await loginUser(email, password);

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
      <div className="neo-glow bg-brand/20 w-[500px] h-[500px] top-[-150px] left-[-150px]" />
      <div className="neo-glow bg-brand-purple/20 w-[400px] h-[400px] bottom-[-100px] right-[-100px]" style={{ animationDelay: '2s' }} />

      {/* NAV */}
      <nav className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-50">
        <Link href="/" className="text-xl font-bold font-outfit text-brand flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-purple flex items-center justify-center neo-card shadow-brand/30 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-white text-lg">R</span>
          </div>
          Rhockstar Connect
        </Link>
        <Link href="/register" className="neo-button-secondary text-sm px-6 py-2">
          Create Account
        </Link>
      </nav>

      {/* AUTH WRAPPER */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <section className="w-full max-w-md neo-card p-10">
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold mb-3 text-white">Welcome Back</h2>
            <p className="text-slate-400">Login to continue to Rhockstar Connect</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
              <span className="mt-0.5">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
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
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-3 text-sm text-slate-400 cursor-pointer hover:text-white transition-colors">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer appearance-none w-5 h-5 border border-slate-600 rounded bg-slate-800/50 checked:bg-brand checked:border-brand transition-all cursor-pointer" />
                  <svg className="absolute w-3 h-3 text-white left-1 pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Remember me
              </label>
              <Link href="#" className="text-sm text-brand hover:text-brand-light font-medium transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="neo-button-primary mt-4 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-brand font-bold hover:underline transition-colors ml-1">
              Create account
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
