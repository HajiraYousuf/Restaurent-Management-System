import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import CartReducer, { initialState } from "./CartReducer";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Save data in LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "cart_items",
      JSON.stringify({
        total: state.total,
        foods: state.foods,
      })
    );
  }, [state]);

  // Calculate Total Price
  const calculateTotalPrice = (foods) => {
    let total = 0;

    foods.forEach((food) => {
      total += Number(food.price) * food.quantity;
    });

    dispatch({
      type: "CALCULATE_TOTAL_PRICE",
      payload: {
        total,
      },
    });
  };

  // Add Food
  const addToCart = (food) => {
    const foodIndex = state.foods.findIndex(
      (f) => f.id === food.id
    );

    let updatedFoods = [...state.foods];

    if (foodIndex === -1) {
      updatedFoods = [
        ...updatedFoods,
        {
          ...food,
          quantity: 1,
        },
      ];
    } else {
      updatedFoods[foodIndex] = {
        ...updatedFoods[foodIndex],
        quantity: updatedFoods[foodIndex].quantity + 1,
      };
    }

    calculateTotalPrice(updatedFoods);

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        foods: updatedFoods,
      },
    });
  };

  // Update Food Quantity
  const updateFoodQuantity = (food, newQuantity) => {
    const foodIndex = state.foods.findIndex(
      (f) => f.id === food.id
    );

    let updatedFoods = [...state.foods];

    if (newQuantity <= 0) {
      updatedFoods = updatedFoods.filter(
        (f) => f.id !== food.id
      );
    } else {
      updatedFoods[foodIndex] = {
        ...updatedFoods[foodIndex],
        quantity: newQuantity,
      };
    }

    calculateTotalPrice(updatedFoods);

    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: {
        foods: updatedFoods,
      },
    });
  };

  // Remove Food
  const removeFromCart = (food) => {
    const updatedFoods = state.foods.filter(
      (f) => f.id !== food.id
    );

    calculateTotalPrice(updatedFoods);

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        foods: updatedFoods,
      },
    });
  };

  // Clear Cart
  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
      payload: {},
    });
  };

  const values = {
    foods: state.foods,
    total: state.total,
    addToCart,
    updateFoodQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("context must be inside CartContext");
  }

  return context;
};

export default useCart;