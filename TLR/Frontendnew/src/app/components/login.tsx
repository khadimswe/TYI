import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "./logo";
import { BackgroundCollage } from "./background-collage";
import { Link, useNavigate } from "react-router";
import { useTheme } from "../contexts/theme-context";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    
    // Simulate successful login - in a real app, this would verify credentials
    // For now, redirect to home after any login attempt
    navigate("/");
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundCollage />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-6">
              <Logo />
            </div>
            <h1 className={`text-4xl mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Tag You're <span className="text-yellow-400 font-bold">It</span>
            </h1>
            <p className={`text-sm mt-3 ${theme === "dark" ? "text-white" : "text-gray-500"}`}>Sign in to continue</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              >
                Sign In
              </Button>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Don't have an account?{" "}
              <Link 
                to="/sign-up" 
                className={`font-bold underline decoration-2 underline-offset-4 ${
                  theme === "dark" 
                    ? "text-yellow-400 hover:text-yellow-300" 
                    : "text-yellow-500 hover:text-yellow-600"
                }`}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}