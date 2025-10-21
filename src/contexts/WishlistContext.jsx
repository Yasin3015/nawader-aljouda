import React, { createContext, useContext, useReducer } from 'react';
import { useToast } from '../components/UI/ToastProvider';

const WishlistContext = createContext();

// Wishlist actions
const WISHLIST_ACTIONS = {
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST'
};

// Wishlist reducer
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
  const { addToast } = useToast();

  // Add item to wishlist
  const addToWishlist = (product) => {
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

    addToast(`${product.name} added to wishlist!`, 'success');
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    const item = state.items.find(item => item.id === productId);
    dispatch({
      type: WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST,
      payload: productId
    });

    if (item) {
      addToast(`${item.name} removed from wishlist!`, 'warning');
    }
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    dispatch({
      type: WISHLIST_ACTIONS.CLEAR_WISHLIST
    });
    addToast('Wishlist cleared!', 'info');
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Get total items count
  const totalItems = state.items.length;

  const value = {
    items: state.items,
    totalItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
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

