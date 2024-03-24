import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (
    nom,
    prenom,
    email,
    cin,
    password,
    confPass,
    cdequipe
  ) => {
    setIsLoading(true);
    setError(null);
    //there is an error i could not find it
    const response = await fetch("http://localhost:5001/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom,
        prenom,
        email,
        cin,
        password,
        confPass,
        cdequipe,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      //save the user to local storage ,whenever the user close the browser the user will be logged in
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return { signup, isLoading, error };
};
