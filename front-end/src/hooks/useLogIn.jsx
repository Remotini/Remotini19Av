import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const handleLogIn = async (email, password) => {
    setError(null);
    setIsLoading(true);
    const response = await fetch("http://localhost:5001/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      setError(null);
      setIsLoading(false);
      //save the user to local storage ,whenever the user close the browser the user will be logged in
      localStorage.setItem("user", JSON.stringify(json));
      //update the auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return { handleLogIn, error, isLoading };
};
