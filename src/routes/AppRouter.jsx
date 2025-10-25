import React, { Suspense, lazy } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ProtectedRoute, GuestRoute } from "../components/Common/ProtecteRout";

const UserLayout = lazy(() => import("../Layouts/UserLayout"));
const AuthLayout = lazy(() => import("../Layouts/AuthLayout"));
const DashboardLayout = lazy(()=>import('../Layouts/DashboardLayout'))

// 📄 User Pages
const Home = lazy(() => import("../pages/user/Home"));
const About = lazy(() => import("../pages/user/About"));
const Contact = lazy(() => import("../pages/user/Contact"));
const Browse = lazy(() => import("../pages/user/Browse"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const Profile = lazy(() => import("../pages/Profile"));
const ProductInfo = lazy(() => import("../pages/ProductInfo"));
const WishList = lazy(() => import('../pages/user/WishList'));
const FAQ = lazy(() => import("../pages/FAQ"));

// 🔐 Auth Pages
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));

// 📁 Not Found Page
const NotFound = lazy(() => import("../pages/NotFound"));

//DASHBOARD PAGES
const DashboardPage = lazy(()=> import('../pages/dashboard/DashboardPage'))

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
        {/* صفحات عامة - متاحة للجميع */}
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
        <Route
          path="product/:productId"
          element={
            <Suspense fallback={<Loading />}>
              <ProductInfo />
            </Suspense>
          }
        />

        {/* صفحات محمية - محتاجة تسجيل دخول */}
        <Route
          path="wishlist"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <WishList />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <CartPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <CheckoutPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ======================== */}
      {/* 🔐 Auth Routes - للزوار فقط */}
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
            <GuestRoute>
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            </GuestRoute>
          }
        />
        <Route
          path="signup"
          element={
            <GuestRoute>
              <Suspense fallback={<Loading />}>
                <Signup />
              </Suspense>
            </GuestRoute>
          }
        />
      </Route>

      {/* ======================== */}
      {/* 🔐 Dashboard Pages ==== */}
      {/* ======================== */}
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loading />}>
            <DashboardLayout />
          </Suspense>
        }
      >
        <Route
          path="home"
          element={
            
              <Suspense fallback={<Loading />}>
                <DashboardPage />
              </Suspense>
          }
        />
        {/* <Route
          path="signup"
          element={
            <GuestRoute>
              <Suspense fallback={<Loading />}>
                <Signup />
              </Suspense>
            </GuestRoute>
          }
        /> */}
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