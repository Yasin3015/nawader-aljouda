import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useToast } from '../components/UI/ToastProvider';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

// Wishlist actions
const WISHLIST_ACTIONS = {
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST',
  LOAD_WISHLIST: 'LOAD_WISHLIST'
};

// Wishlist reducer (بدون useAuth و useToast هنا - ممنوع استخدام hooks في reducer)
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_TO_WISHLIST:
      // Check if item already exists in wishlist
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Don't add duplicate items
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return {
        ...state,
        items: []
      };

    case WISHLIST_ACTIONS.LOAD_WISHLIST:
      return {
        ...state,
        items: action.payload || []
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: []
};

// Wishlist provider component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  // تحميل الـ Wishlist من sessionStorage عند تسجيل الدخول
  useEffect(() => {
    if (isAuthenticated()) {
      try {
        const savedWishlist = sessionStorage.getItem('wishlist');
        if (savedWishlist) {
          const wishlistItems = JSON.parse(savedWishlist);
          dispatch({ type: WISHLIST_ACTIONS.LOAD_WISHLIST, payload: wishlistItems });
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    } else {
      // لو مش مسجل، امسح الـ Wishlist
      dispatch({ type: WISHLIST_ACTIONS.CLEAR_WISHLIST });
      sessionStorage.removeItem('wishlist');
    }
  }, [isAuthenticated]);

  // حفظ الـ Wishlist في sessionStorage كل ما يتغير
  useEffect(() => {
    if (isAuthenticated() && state.items.length >= 0) {
      sessionStorage.setItem('wishlist', JSON.stringify(state.items));
    }
  }, [state.items, isAuthenticated]);

  // 🔥 Add item to wishlist مع التحقق من تسجيل الدخول
  const addToWishlist = (product) => {
    // التحقق من تسجيل الدخول
    if (!isAuthenticated()) {
      addToast('Please login to add items to wishlist', {
        appearance: 'warning',
        autoDismiss: true,
      });
      return false;
    }

    // التحقق من وجود المنتج في الـ Wishlist
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      addToast(`${product.name} is already in your wishlist!`, {
        appearance: 'info',
        autoDismiss: true,
      });
      return false;
    }

    const wishlistItem = {
      id: product.id || Date.now(),
      name: product.name,
      price: product.price,
      image: product.image,
      rating: product.rating || 0,
      flag: product.flag || 'new'
    };

    dispatch({
      type: WISHLIST_ACTIONS.ADD_TO_WISHLIST,
      payload: wishlistItem
    });

    addToast(`${product.name} added to wishlist!`, {
      appearance: 'success',
      autoDismiss: true,
    });

    return true;
  };

  // 🔥 Remove item from wishlist
  const removeFromWishlist = (productId) => {
    const item = state.items.find(item => item.id === productId);
    
    dispatch({
      type: WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST,
      payload: productId
    });

    if (item) {
      addToast(`${item.name} removed from wishlist!`, {
        appearance: 'info',
        autoDismiss: true,
      });
    }
  };

  // 🔥 Clear entire wishlist
  const clearWishlist = () => {
    dispatch({
      type: WISHLIST_ACTIONS.CLEAR_WISHLIST
    });
    
    sessionStorage.removeItem('wishlist');
    
    addToast('Wishlist cleared!', {
      appearance: 'info',
      autoDismiss: true,
    });
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Toggle wishlist (add if not exists, remove if exists)
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false;
    } else {
      return addToWishlist(product);
    }
  };

  // Get total items count
  const totalItems = state.items.length;

  const value = {
    items: state.items,
    totalItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    toggleWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;