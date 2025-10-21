import React from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CartPage = () => {
  const { t } = useTranslation();
  const { items, totalPrice } = useCart();

  return (
    <div className="min-h-scree py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            {t("cart")}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some products to get started!
            </p>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-hard-primary)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-sm border-1 border-gray-200 overflow-hidden">
                <table className="min-w-full border-collapse">
                  <thead className=" border-b border-gray-200">
                    <tr>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wide w-5/12">
                        Product
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wide w-2/12">
                        Price
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wide w-3/12">
                        Quantity
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wide w-2/12">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} asRow />
                    ))}
                  </tbody>
                </table>
                <div className="p-4 text-center">
                  <Link
                    to="/browse"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gray-1)] text-[var(--color-gray-7)] py-3 px-5 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Return to shop
                  </Link>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
