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
    <div className="container flex items-center justify-center min-h-screen">
      <div className="neo-card flex flex-col w-full" style={{ maxWidth: "450px" }}>
        <div className="text-center mb-6">
          <h1 className="text-brand mb-2">Welcome Back</h1>
          <p className="text-secondary text-sm">Sign in to Rhockstar Connect</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 flex items-start gap-2 text-danger text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary ml-2">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-tertiary w-5 h-5" />
              <input 
                type="email" 
                className="neo-input pl-10" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary ml-2">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-tertiary w-5 h-5" />
              <input 
                type="password" 
                className="neo-input pl-10" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-brand font-medium hover:underline">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="neo-button neo-button-primary w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-5 h-5" />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-secondary">
          Don't have an account?{" "}
          <Link href="/register" className="text-brand font-semibold hover:underline inline-flex items-center">
            Create one <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
