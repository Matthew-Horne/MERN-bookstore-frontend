import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import { auth } from "../firebase/firebase.config";

interface AuthContextType {
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  registerUser: (email: string, password: string) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
}

type MinimalUser = {
  email: string | null;
  userName: string | null;
  photo: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

//google provider
const googleProvider = new GoogleAuthProvider();

//auth provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<MinimalUser | null>(null);
  const [loading, setLoading] = useState(true);

  //register user with  email
  const registerUser = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  //login user with email
  const loginUser = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //register user with google
  const loginWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  //logout the user
  const logout = () => {
    return signOut(auth);
  };

  //manager user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        const userData = {
          email: user.email,
          userName: user.displayName,
          photo: user.photoURL,
        };
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    loginUser,
    registerUser,
    loginWithGoogle,
    loading,
    setLoading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
