import React, { createContext, useContext, useReducer } from 'react';

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
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
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

  // Calculate total items count
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value = {
    ...state,
    totalItems,
    totalPrice,
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    removeFromCart: (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),
    updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
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
