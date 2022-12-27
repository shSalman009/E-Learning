import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../components/Toast";
import "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // state
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // signUp
  const signUp = async (userName, email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: userName,
        });
        setCurrentUser({
          ...user,
        });
        toastSuccess("Account Create Successfully");
        navigate("/");
      })
      .catch((error) => {
        toastError("account creation failed");
      });
  };

  // login
  const login = async (email, password) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toastSuccess("Login Successfully");
        navigate("/");
      })
      .catch((error) => {
        toastError("email or password is incorrect");
      });
  };

  // sign out
  const logOut = () => {
    const auth = getAuth();
    return signOut(auth);
  };

  const value = {
    loading,
    currentUser,
    signUp,
    login,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
