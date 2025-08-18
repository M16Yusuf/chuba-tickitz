import { useEffect, useReducer } from "react";
import { authContext as AuthContext } from "./authContext.js";

// custom hook
import useLocalStorage from "../../hooks/useLocalStorage.js";

// initial data
const initialState = { currentUser: "", isLogin: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, currentUser: action.value.email, isLogin: true };
    case "logout":
      return { ...state, currentUser: "", isLogin: false };
  }
};

function AuthProvider({ children }) {
  const [persistedUser, setPersistedUser] = useLocalStorage(
    "koda3:curent-user",
    initialState,
  );

  const [state, dispatch] = useReducer(reducer, persistedUser);

  useEffect(() => {
    setPersistedUser(state);
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
