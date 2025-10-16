import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import { loginSchema } from "../../validation/authSchemas";
import { login, seedMockUser } from "../../services/authApi";

seedMockUser();

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
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
      await login({ email: form.email, password: form.password });
      // For now, just show a simple success; dashboard integration later
      alert("Logged in! (Mock)");
    } catch (err) {
      setApiError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
            <span>Remember me</span>
          </label>
          <button type="button" className="text-[var(--color-gray-6)]">Forget Password</button>
        </div>

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Logging..." : "Login"}
        </Button>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button type="button" className="border rounded-[var(--radius-md)] py-2">Google</button>
          <button type="button" className="border rounded-[var(--radius-md)] py-2">Facebook</button>
        </div>
        <p className="text-center text-sm mt-2">
          Don’t have account? <Link to="/auth/signup" className="text-[var(--color-primary)] font-medium">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;


