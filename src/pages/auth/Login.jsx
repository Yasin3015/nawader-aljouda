import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../components/UI/Button";
import { loginSchema } from "../../validation/authSchemas";
import { useAuth } from "../../contexts/AuthContext";
import FormInput from "../../components/auth/FormInput";
import PasswordInput from "../../components/auth/PasswordInput";
import SocialLogin from "../../components/auth/SocialLogin";
import ErrorMessage from "../../components/auth/ErrorMessage";

const Login = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError("");

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
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // بيانات وهمية للتجربة
        const mockUser = {
          id: 1,
          name: "أحمد محمد",
          email: form.email,
          phone: "01234567890",
          avatar: "https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=10b981&color=fff",
          role: "user"
        };

        // حفظ بيانات المستخدم في الـ Context
        authLogin(mockUser);

        // التوجيه للصفحة الرئيسية
        navigate('/');
      } catch (err) {
        setApiError(err.message || t('auth.login.error'));
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {t('auth.login.title')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* رسالة خطأ عامة */}
        {apiError && <ErrorMessage message={apiError} />}

        {/* حقل البريد الإلكتروني */}
        <FormInput
          name="email"
          type="email"
          placeholder={t('auth.login.email')}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* حقل كلمة المرور */}
        <PasswordInput
          name="password"
          placeholder={t('auth.login.password')}
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
            <span>{t('auth.login.remember')}</span>
          </label>
          <Link 
            to="/auth/forgot-password" 
            className="text-gray-600 hover:text-green-600 transition"
          >
            {t('auth.login.forgotPassword')}
          </Link>
        </div>

        {/* زر تسجيل الدخول */}
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? t('auth.login.loading') : t('auth.login.submit')}
        </Button>

        {/* تسجيل الدخول بالسوشيال ميديا */}
        <SocialLogin />

        {/* رابط التسجيل */}
        <p className="text-center text-sm mt-4">
          {t('auth.login.noAccount')}{" "}
          <Link 
            to="/auth/signup" 
            className="text-green-600 font-medium hover:underline"
          >
            {t('auth.login.register')}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;