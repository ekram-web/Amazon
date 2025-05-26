import React, { useReducer, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  return (

    // const [state, dispatch] = useReducer(reducer, initialState);
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};
// defines a DataProvider component that uses React's Context API to provide a global state management solution.

//  It creates a context called DataContext and uses the useReducer hook to manage state based on the provided reducer and initialState.

// The children components can access this context to share state across the application.

//--------//----------//

// creates a context object we can use across components and it gives .provider and .consumer
//Any component can now useContext(DataContext) to access the state and dispatch actions defined in the reducer.(like basket, amount, etc.)and update global state
