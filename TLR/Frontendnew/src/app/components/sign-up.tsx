import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Logo } from "./logo";
import { BackgroundCollage } from "./background-collage";
import { Link, useNavigate } from "react-router";
import { useTheme } from "../contexts/theme-context";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gradeLevel: string;
  studentId?: string;
  termsAccepted: boolean;
  parentalConsent: boolean;
};

const gradeLevels = [
  "College Freshman",
  "College Sophomore",
  "College Junior",
  "College Senior",
  "Graduate Student",
];

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");
  const termsAccepted = watch("termsAccepted", false);
  const parentalConsent = watch("parentalConsent", false);

  // Auto-focus on first field
  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  // Calculate password strength
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 3) return { strength, label: "Fair", color: "bg-yellow-500" };
    if (strength <= 4) return { strength, label: "Good", color: "bg-blue-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log("Sign up data:", data);
    setIsLoading(false);
    setIsSuccess(true);
    
    // After showing success, redirect to sign-in page
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundCollage />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-4">
              <Logo />
            </div>
            <h1 className={`text-4xl mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Tag You're <span className="text-yellow-400 font-bold">It</span>
            </h1>
            <p className={`mt-3 font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Create your account to get started</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Personal Information
                </h2>
                
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="h-11"
                      autoFocus
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "At least 2 characters",
                        },
                      })}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <XCircle className="w-3 h-3" />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="h-11"
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "At least 2 characters",
                        },
                      })}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <XCircle className="w-3 h-3" />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@university.edu"
                    className="h-11"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <XCircle className="w-3 h-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Date of Birth & Grade Level */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      className="h-11"
                      max={new Date().toISOString().split('T')[0]}
                      min="1950-01-01"
                      {...register("dateOfBirth", {
                        required: "Date of birth is required",
                        validate: (value) => {
                          const date = new Date(value);
                          const today = new Date();
                          const age = today.getFullYear() - date.getFullYear();
                          return age >= 16 || "Must be at least 16 years old";
                        },
                      })}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <XCircle className="w-3 h-3" />
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gradeLevel">Year Level</Label>
                    <Select
                      onValueChange={(value) => setValue("gradeLevel", value)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeLevels.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input
                      type="hidden"
                      {...register("gradeLevel", {
                        required: "Year level is required",
                      })}
                    />
                    {errors.gradeLevel && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <XCircle className="w-3 h-3" />
                        {errors.gradeLevel.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Student ID (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="studentId">
                    Student ID <span className="text-gray-400 font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="Enter your student ID"
                    className="h-11"
                    {...register("studentId")}
                  />
                </div>
              </div>

              {/* Account Security Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Account Security
                </h2>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="h-11 pr-12"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message: "Must include uppercase, lowercase, and number",
                        },
                      })}
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
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-2 mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              level <= passwordStrength.strength
                                ? passwordStrength.color
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-xs font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                        {passwordStrength.label} password
                      </p>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <XCircle className="w-3 h-3" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="h-11 pr-12"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && password === confirmPassword && (
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Passwords match
                    </p>
                  )}
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <XCircle className="w-3 h-3" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms & Conditions Section */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="termsAccepted"
                    checked={termsAccepted}
                    onCheckedChange={(checked) =>
                      setValue("termsAccepted", checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="termsAccepted"
                      className="text-sm font-normal cursor-pointer leading-relaxed"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-yellow-600 hover:text-yellow-700 font-medium underline"
                      >
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-yellow-600 hover:text-yellow-700 font-medium underline"
                      >
                        Privacy Policy
                      </a>
                    </Label>
                    <input
                      type="hidden"
                      {...register("termsAccepted", {
                        required: "You must accept the terms & conditions",
                      })}
                    />
                    {errors.termsAccepted && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
                        <XCircle className="w-3 h-3" />
                        {errors.termsAccepted.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="parentalConsent"
                    checked={parentalConsent}
                    onCheckedChange={(checked) =>
                      setValue("parentalConsent", checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="parentalConsent"
                      className="text-sm font-normal cursor-pointer leading-relaxed"
                    >
                      I have parental/guardian consent (if under 18)
                    </Label>
                    <input
                      type="hidden"
                      {...register("parentalConsent", {
                        required: "Parental consent is required for minors",
                      })}
                    />
                    {errors.parentalConsent && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
                        <XCircle className="w-3 h-3" />
                        {errors.parentalConsent.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Account Created!
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Already have an account?{" "}
              <Link
                to="/"
                className={`font-bold underline decoration-2 underline-offset-4 ${
                  theme === "dark" 
                    ? "text-yellow-400 hover:text-yellow-300" 
                    : "text-yellow-500 hover:text-yellow-600"
                }`}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}