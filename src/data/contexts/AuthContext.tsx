"use client";

import { createContext, useEffect, useState } from "react";
import { app } from "../../firebase/config";
import { getAuth } from "firebase/auth";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AuthContextProps from "@/lib/interfaces/AuthContextProps";
import { User } from "@/lib/models/User";

import { User as FirebaseUser } from "firebase/auth";
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
} from "../../firebase/authentications";

const AuthContext = createContext<AuthContextProps>({});

function manageCookie(logged: boolean, token: string | null) {
  if (logged) {
    Cookies.set("elevate-auth", logged + "", { expires: 1 });
    if (token) Cookies.set("elevate-token", token, { expires: 1 });
  } else {
    Cookies.remove("elevate-auth");
    Cookies.remove("elevate-token");
    localStorage.setItem("selectedTab", "/Current/Line1");
  }
}

interface AuthProviderProps {
  children: React.ReactNode;
}

async function standardizedUser(firebaseUser: FirebaseUser): Promise<User> {
  const token = await firebaseUser.getIdToken();
  return new User(
    firebaseUser?.uid,
    firebaseUser?.displayName ?? "",
    firebaseUser?.email ?? "",
    "",
    token,
    firebaseUser.providerId
  );
}

export function AuthProvider(props: AuthProviderProps) {
  const auth = getAuth(app);

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function confingSection(recivedUser: User | FirebaseUser | null) {
    if (recivedUser?.email) {
      const firebaseUser = await standardizedUser(recivedUser as FirebaseUser);
      setUser(firebaseUser);
      manageCookie(true, firebaseUser?.token ?? null);
      setLoading(false);
      localStorage.setItem("uid", recivedUser.uid + "");
      return recivedUser.uid;
    } else {
      setUser(null);
      manageCookie(false, null);
      setLoading(false);
      return false;
    }
  }
  async function login(recivedUser: User) {
    try {
      setLoading(true);
      const resp = await loginWithEmailAndPassword(
        recivedUser.email,
        recivedUser.password
      );
      await confingSection(resp?.user);
      router.push("/equipaments");
      return resp?.user?.uid;
    } finally {
      setLoading(false);
    }
  }

  async function loginGoogle() {
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      await confingSection(user);
      router.push("/equipaments");
      return user?.uid;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      confingSection(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("elevate-auth")) {
      const cancelar = auth.onIdTokenChanged(confingSection);
      return () => cancelar();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginGoogle,
        logout,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
