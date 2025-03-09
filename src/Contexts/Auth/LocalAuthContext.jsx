/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const reducer = (state, action) => {};

const initialState = {
  user: null,
  isLoading: false,
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

const useLocalAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context is used outside of the Provider");

  return context;
};

export { useLocalAuth, AuthContextProvider };
