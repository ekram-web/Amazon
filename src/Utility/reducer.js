import { Type } from "./action.type";

export const initialState = {
  // Initial state of the application

  basket: [],
  user: null, // 
  // An empty array to hold items in the basket
};

export const reducer = (state, action) => {
  switch (action.type) {
    //CASE 1
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        // Check if the item already exists in the basket and return a boolean value
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        // If the item does not exist in the basket, add it with an amount of 1
        return {
          ...state, // Spread the current state to keep other properties intact // copy the current state
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        // If the item already exists, increment its amount by 1
        // This is done by mapping through the existing basket and updating the amount of the existing item
        const updatedBasket = state.basket.map((item) => {
          // Check if the current item matches the item being added
          // If it matches, increment the amount; otherwise, return the item unchanged
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return {
          // Return the updated state with the modified basket
          ...state,
          basket: updatedBasket,
        };
      }

    //CASE 2
    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(
        // Find the index of the item to be removed from the basket

        (item) => item.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        // If the item is found in the basket, check its amount
        // If the amount is greater than 1, decrement the amount by 1
        // If the amount is 1, remove the item from the basket
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }
      return {
        // Return the updated state with the modified basket
        ...state,
        basket: newBasket,
      };

    // CASE 3
    case Type.EMPTY_BASKET:
      // When the basket is emptied, return a new state with an empty basket
      return {
        // Spread the current state and set the basket to an empty array
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      // this code 
      return {
        ...state,
        user: action.user,
      };
    // Default case to return the current state if no action matches
    default:
      return state;
  }
  
};
// This code defines a reducer function for managing the state of a shopping basket in a React application. It handles actions to add items to the basket, remove items, and empty the basket, updating the state accordingly. The initial state is defined with an empty basket array.
