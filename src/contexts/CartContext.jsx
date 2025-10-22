import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from '../components/UI/ToastProvider';

// Cart context for managing shopping cart state
const CartContext = createContext();

// Cart reducer for managing cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || [],
      };

    default:
      return state;
  }
};

// Initial cart state
const initialState = {
  items: [],
  isOpen: false,
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  // تحميل الكارت من sessionStorage عند تسجيل الدخول
  useEffect(() => {
    if (isAuthenticated()) {
      try {
        const savedCart = sessionStorage.getItem('cart');
        if (savedCart) {
          const cartItems = JSON.parse(savedCart);
          dispatch({ type: 'LOAD_CART', payload: cartItems });
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    } else {
      // لو مش مسجل، امسح الكارت
      dispatch({ type: 'CLEAR_CART' });
      sessionStorage.removeItem('cart');
    }
  }, [isAuthenticated]);

  // حفظ الكارت في sessionStorage كل ما يتغير
  useEffect(() => {
    if (isAuthenticated() && state.items.length >= 0) {
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, isAuthenticated]);

  // Calculate total items count
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // 🔥 إضافة منتج مع التحقق من تسجيل الدخول
  const addToCart = (product, quantity = 1) => {
    // التحقق من تسجيل الدخول
    if (!isAuthenticated()) {
      addToast('Please login to add items to cart', {
        appearance: 'warning',
        autoDismiss: true,
      });
      return false;
    }

    // التحقق من وجود المنتج
    const existingItem = state.items.find(item => item.id === product.id);
    
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...product, quantity } 
    });

    // رسالة نجاح مختلفة حسب الحالة
    if (existingItem) {
      addToast('Quantity updated successfully!', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      addToast('Added to cart successfully!', {
        appearance: 'success',
        autoDismiss: true,
      });
    }

    return true;
  };

  // 🔥 إزالة منتج مع رسالة
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    addToast('Item removed from cart', {
      appearance: 'info',
      autoDismiss: true,
    });
  };

  // 🔥 تحديث الكمية مع التحقق
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  // 🔥 مسح الكارت
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    sessionStorage.removeItem('cart');
    addToast('Cart cleared', {
      appearance: 'info',
      autoDismiss: true,
    });
  };

  const value = {
    ...state,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;