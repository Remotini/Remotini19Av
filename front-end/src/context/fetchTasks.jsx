import React, { createContext } from "react";

// Create a new context
const FetchContext = createContext();

// Create a provider component to provide the fetch function
const FetchProvider = ({ children }) => {
  // Define your fetch function here
  const fetchFunction = async (url, options) => {
    // Perform the fetch operation
    const response = await fetch(url, options);
    // Process the response
    // ...
    return response;
  };

  // Provide the fetch function as a value to the context
  return (
    <FetchContext.Provider value={fetchFunction}>
      {children}
    </FetchContext.Provider>
  );
};

export { FetchContext, FetchProvider };
