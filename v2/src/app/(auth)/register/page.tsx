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

    const { user, error } = await registerUser(email, password, fullName, username);

    if (error) {
      setError(error);
      setLoading(false);
    } else if (user) {
      router.push("/feed");
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <div className="neo-card flex flex-col w-full" style={{ maxWidth: "500px" }}>
        <div className="text-center mb-6">
          <h1 className="text-brand mb-2">Create Account</h1>
          <p className="text-secondary text-sm">Join Rhockstar Connect today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 flex items-start gap-2 text-danger text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary ml-2">Full Name</label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-tertiary w-5 h-5" />
              <input 
                type="text" 
                className="neo-input pl-10" 
                placeholder="Elijah Peter"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary ml-2">Username</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-tertiary font-bold">@</span>
              <input 
                type="text" 
                className="neo-input pl-10" 
                placeholder="elijah_p"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

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
            <p className="text-xs text-tertiary ml-2 mt-1">Must be at least 8 characters</p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="neo-button neo-button-primary w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <UserPlus className="w-5 h-5" />
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="text-brand font-semibold hover:underline inline-flex items-center">
            Sign In <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
