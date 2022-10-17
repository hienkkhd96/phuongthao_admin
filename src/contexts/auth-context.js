import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};
let isAuthenticated = false;
let user = {};
if (typeof window !== "undefined") {
  isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  user = JSON.parse(localStorage.getItem("user")) || {};
}
const initialState = {
  isAuthenticated: isAuthenticated,
  isLoading: true,
  user: user,
  token: "",
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: isAuthenticated,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const { user, token } = action.payload;
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    localStorage.setItem("isAuthenticated", false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return {
      ...state,
      isAuthenticated: false,
      user: {},
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;
    try {
      // Get user from your database
      const user = JSON.parse(localStorage.getItem("user")) || {};
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    initialize().catch(console.error);
  }, []);

  const signIn = (user) => {
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
      }}
    >
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
