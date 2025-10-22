// src/pages/auth/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { signupSchema } from "../../validation/authSchemas";
import { signup } from "../../services/authApi";
import { useAuth } from "../../contexts/AuthContext";
import FormInput from "../../components/auth/FormInput";
import PasswordInput from "../../components/auth/PasswordInput";
import SocialLogin from "../../components/auth/SocialLogin";
import ErrorMessage from "../../components/auth/ErrorMessage";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    email: "", 
    password: "", 
    confirmPassword: "", 
    terms: false 
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login: authLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    
    // امسح الخطأ الخاص بالحقل لما اليوزر يكتب
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError("");

    // التحقق من صحة البيانات
    const parsed = signupSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (key) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      // استدعاء API التسجيل
      const response = await signup({ 
        email: form.email, 
        password: form.password 
      });

      // لو الـ API بترجع user و token، سجل دخول تلقائي
      if (response.user && response.token) {
        authLogin(response.user, response.token);
        navigate('/'); // روح للصفحة الرئيسية
      } else {
        // لو الـ API مش بترجع token، روح لصفحة اللوجن
        navigate("/auth/login");
      }
    } catch (err) {
      setApiError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* رسالة خطأ عامة */}
        {apiError && <ErrorMessage message={apiError} />}

        {/* حقل البريد الإلكتروني */}
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* حقل كلمة المرور */}
        <PasswordInput
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        {/* حقل تأكيد كلمة المرور */}
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        {/* موافقة على الشروط */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer text-sm">
            <input 
              type="checkbox" 
              name="terms" 
              checked={form.terms} 
              onChange={handleChange}
              className="mt-1 cursor-pointer"
            />
            <span>
              Accept all{" "}
              <Link 
                to="/terms" 
                className="text-[var(--color-primary)] hover:underline"
              >
                terms & Conditions
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="text-xs text-[var(--color-danger)] mt-1">
              {errors.terms}
            </p>
          )}
        </div>

        {/* زر التسجيل */}
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>

        {/* تسجيل الدخول بالسوشيال ميديا */}
        <SocialLogin />

        {/* رابط تسجيل الدخول */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link 
            to="/auth/login" 
            className="text-[var(--color-primary)] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;