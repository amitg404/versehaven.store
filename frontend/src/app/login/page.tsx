"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [useEmail, setUseEmail] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...(useEmail ? { email: formData.email } : { mobile: formData.mobile }),
        password: formData.password,
        ...(mode === "register" && { name: formData.name }),
      };

      const response =
        mode === "login"
          ? await authApi.login(payload)
          : await authApi.register(payload);

      setAuth(response.data.user, response.data.token);
      toast.success(mode === "login" ? "Welcome back!" : "Account created!");
      router.push("/");
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[var(--text)]"
            >
              VerseHaven
            </Link>
            <p className="text-[var(--text-muted)] mt-2">
              {mode === "login"
                ? "Welcome back! Sign in to continue."
                : "Create an account to get started."}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex p-1 bg-[var(--bg-light)] rounded-lg mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === "login"
                  ? "bg-white shadow-sm text-[var(--text)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === "register"
                  ? "bg-white shadow-sm text-[var(--text)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-[var(--border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>
              </div>
            )}

            {/* Email/Mobile Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-[var(--text)]">
                  {useEmail ? "Email" : "Mobile"}
                </label>
                <button
                  type="button"
                  onClick={() => setUseEmail(!useEmail)}
                  className="text-xs text-[var(--accent)] hover:underline"
                >
                  Use {useEmail ? "mobile" : "email"} instead
                </button>
              </div>
              <div className="relative">
                {useEmail ? (
                  <>
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-[var(--border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </>
                ) : (
                  <>
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="9876543210"
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-[var(--border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-11 pr-12 py-3 rounded-lg border border-[var(--border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-[var(--text-muted)]" />
                  ) : (
                    <Eye className="w-5 h-5 text-[var(--text-muted)]" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-4 text-lg"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--text-muted)] mt-6">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-[var(--accent)] hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[var(--accent)] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}
