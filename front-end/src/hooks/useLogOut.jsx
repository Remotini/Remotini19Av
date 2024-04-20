import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user"); //like it is called when we add it in local storage
    //dispatch logout action
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
