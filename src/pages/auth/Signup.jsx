import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { signupSchema } from "../../validation/authSchemas";
import { signup } from "../../services/authApi";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "", terms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError("");
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
      await signup({ email: form.email, password: form.password });
      navigate("/auth/login");
    } catch (err) {
      setApiError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {apiError ? (
          <div className="text-sm text-[var(--color-danger)]">{apiError}</div>
        ) : null}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-[var(--radius-md)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-soft-primary)]"
        />
        {errors.email ? <p className="text-xs text-[var(--color-danger)]">{errors.email}</p> : null}

        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-[var(--radius-md)] px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-soft-primary)]"
          />
          <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-gray-6)]">
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.password ? <p className="text-xs text-[var(--color-danger)]">{errors.password}</p> : null}

        <div className="relative">
          <input
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-[var(--radius-md)] px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-soft-primary)]"
          />
          <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-gray-6)]">
            {showConfirm ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.confirmPassword ? (
          <p className="text-xs text-[var(--color-danger)]">{errors.confirmPassword}</p>
        ) : null}

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
          <span>Accept all terms & Conditions</span>
        </label>
        {errors.terms ? <p className="text-xs text-[var(--color-danger)]">{errors.terms}</p> : null}

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button type="button" className="border rounded-[var(--radius-md)] py-2">Google</button>
          <button type="button" className="border rounded-[var(--radius-md)] py-2">Facebook</button>
        </div>
        <p className="text-center text-sm mt-2">
          Already have account <Link to="/auth/login" className="text-[var(--color-primary)] font-medium">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;


