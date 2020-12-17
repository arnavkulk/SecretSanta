import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import firebase from "firebase";

interface State {
  currentUser: firebase.User;
}

const AuthContext = createContext<State>({ currentUser: null });

export const useAuth = (): State => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  let value: State = {
    currentUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {" "}
      {!loading && children}
    </AuthContext.Provider>
  );
};
