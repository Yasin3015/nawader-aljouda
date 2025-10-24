import AppRouter from "./routes/AppRouter";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { ToastProvider } from "./components/UI/ToastProvider";
import ScrollToTop from "./components/Common/ScrollToTop";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={AppRouter} />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default App;
