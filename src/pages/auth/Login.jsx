import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { loginSchema } from "../../validation/authSchemas";
import { login, seedMockUser } from "../../services/authApi";
import { useAuth } from "../../contexts/AuthContext";
import FormInput from "../../components/auth/FormInput";
import PasswordInput from "../../components/auth/PasswordInput";
import SocialLogin from "../../components/auth/SocialLogin";
import ErrorMessage from "../../components/auth/ErrorMessage";

seedMockUser();

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

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
    const parsed = loginSchema.safeParse(form);
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
      // استدعاء API تسجيل الدخول
      const response = await login({ 
        email: form.email, 
        password: form.password 
      });

      // حفظ بيانات المستخدم في الـ Context
      authLogin(response.user, response.token);

      // التوجيه للصفحة الرئيسية أو الداشبورد
      navigate('/');
    } catch (err) {
      setApiError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
      
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

        {/* تذكرني و نسيت كلمة المرور */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              name="remember" 
              checked={form.remember} 
              onChange={handleChange}
              className="cursor-pointer"
            />
            <span>Remember me</span>
          </label>
          <Link 
            to="/auth/forgot-password" 
            className="text-[var(--color-gray-6)] hover:text-[var(--color-primary)] transition"
          >
            Forget Password?
          </Link>
        </div>

        {/* زر تسجيل الدخول */}
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* تسجيل الدخول بالسوشيال ميديا */}
        <SocialLogin />

        {/* رابط التسجيل */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link 
            to="/auth/signup" 
            className="text-[var(--color-primary)] font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;