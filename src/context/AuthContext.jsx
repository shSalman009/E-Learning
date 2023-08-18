import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../components/Toast";
=======
import { toastSuccess } from "../components/Toast";
>>>>>>> shSalman009-patch-1
import "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // state
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> shSalman009-patch-1

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
<<<<<<< HEAD
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
=======
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: userName,
    });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
    toastSuccess("Account Create Successfully");
>>>>>>> shSalman009-patch-1
  };

  // login
  const login = async (email, password) => {
    const auth = getAuth();
<<<<<<< HEAD

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

=======
    toastSuccess("Login Successfully");
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // sign out
  const logOut = () => {
    const auth = getAuth();
    return signOut(auth);
  };

  const value = {
    currentUser,
    signUp,
    login,
    logOut,
  };

>>>>>>> shSalman009-patch-1
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
