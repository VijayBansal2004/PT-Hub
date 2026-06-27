"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";
import Logo from "@/components/Logo";
import { Toaster, toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email === "admin" && password === "Admin@123") {
        localStorage.setItem("pt-hub-admin-logged-in", "true");
        toast.success("Welcome back, Administrator!", {
          description: "Redirecting to admin panel...",
          icon: "🔐",
        });
        setTimeout(() => {
          router.push("/admin");
        }, 800);
      } else {
        toast.error("Invalid Credentials", {
          description: "Please check your login ID and password and try again.",
          icon: <ShieldAlert className="h-5 w-5 text-red-500" />,
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-25 blur-3xl">
        <div className="h-80 w-80 rounded-full bg-sky-300 animate-pulse" />
        <div className="h-96 w-96 rounded-full bg-blue-600 ml-16 animate-bounce duration-10000" />
      </div>

      {/* Header */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center w-full">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      {/* Main card */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/75 backdrop-blur-xl border border-zinc-200/80 rounded-3xl p-8 shadow-2xl relative">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              Admin Access
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Sign in to manage the PT Hub store and add products.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Login ID Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                Username / Login ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-full border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <Lock className="h-4.5 w-4.5" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-full border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none mt-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Login credentials helper */}
          <div className="mt-8 pt-6 border-t border-zinc-100 text-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
            <span className="text-xs font-bold text-blue-800 block mb-1">
              Demo Credentials
            </span>
            <code className="text-xs text-zinc-600 block">
              Login ID: admin
            </code>
            <code className="text-xs text-zinc-600 block mt-0.5">
              Password: Admin@123
            </code>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-zinc-400 text-xs w-full">
        &copy; {new Date().getFullYear()} PT Hub. All rights reserved.
      </footer>

      {/* Shadcn Sonner Toaster */}
      <Toaster richColors position="bottom-right" theme="light" />
    </div>
  );
}
