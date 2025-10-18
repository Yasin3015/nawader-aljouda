import React, { Suspense, lazy } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

// 🧱 Layouts
const UserLayout = lazy(() => import("../Layouts/UserLayout"));
const AuthLayout = lazy(() => import("../Layouts/AuthLayout"));

// 📄 User Pages
const Home = lazy(() => import("../pages/user/Home"));
const About = lazy(() => import("../pages/user/About"));
const Contact = lazy(() => import("../pages/user/Contact"));
const Browse = lazy(() => import("../pages/user/Browse"));
const FAQ = lazy(() => import("../pages/FAQ"));

// 🔐 Auth Pages
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));

// 📁 Not Found Page
const NotFound = lazy(() => import("../pages/NotFound"));

// 🌀 Loading Spinner
const Loading = () => (
  <div className="flex justify-center items-center min-h-screen text-[var(--color-primary)]">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-primary)]"></div>
  </div>
);

// 🧭 Router Config
const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ======================== */}
      {/* 🏠 User Routes */}
      {/* ======================== */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <UserLayout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<Loading />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="FAQ"
          element={
            <Suspense fallback={<Loading />}>
              <FAQ />
            </Suspense>
          }
        />
        <Route
          path="browse"
          element={
            <Suspense fallback={<Loading />}>
              <Browse />
            </Suspense>
          }
        />
      </Route>

      {/* ======================== */}
      {/* 🔐 Auth Routes */}
      {/* ======================== */}
      <Route
        path="/auth"
        element={
          <Suspense fallback={<Loading />}>
            <AuthLayout />
          </Suspense>
        }
      >
        <Route
          path="login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="signup"
          element={
            <Suspense fallback={<Loading />}>
              <Signup />
            </Suspense>
          }
        />
      </Route>

      {/* ======================== */}
      {/* 🚫 404 Redirect */}
      {/* ======================== */}
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </>
  )
);

export default AppRouter;