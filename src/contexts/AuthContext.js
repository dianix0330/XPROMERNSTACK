import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
  }
};

const AuthContext = createContext({
  ...initialState,
  logIn: () => Promise.resolve(),
  registerUser: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const logIn = async (email, password) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/login?email=${email}&&password=${password}`
      );
      localStorage.setItem("token", res.data.token);
      console.log(res.data.user);
      dispatch({
        type: "LOGIN",
        payload: {
          user: res.data.user,
        },
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const registerUser = async (newUser) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(newUser);
    try {
      const res = await axios.post("http://localhost:5000/users/create", body, config);
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: "LOGIN",
        payload: {
          user: res.data.user,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logOut = async (name, email, password) => {
    try {
      localStorage.removeItem("token");
      dispatch({
        type: "LOGOUT",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, logIn, registerUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
