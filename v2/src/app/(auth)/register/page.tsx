"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register with", { fullName, username, email, password });
    // TODO: Implement Firebase Auth & User Creation
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <div className="neo-card flex flex-col w-full" style={{ maxWidth: "500px" }}>
        <div className="text-center mb-6">
          <h1 className="text-brand mb-2">Create Account</h1>
          <p className="text-secondary text-sm">Join Rhockstar Connect today</p>
        </div>

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

          <button type="submit" className="neo-button neo-button-primary w-full mt-4 flex items-center justify-center gap-2">
            <UserPlus className="w-5 h-5" />
            Create Account
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
