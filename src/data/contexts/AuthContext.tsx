"use client";

import { createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AuthContextProps from "@/lib/interfaces/AuthContextProps";
import { User } from "@/lib/models/User";
import axios from "axios";

const AuthContext = createContext<AuthContextProps>({});

function manageCookie(logged: boolean, token: string | null) {
  if (logged ) {
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

export function AuthProvider(props: AuthProviderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function confingSection(recivedUser: User) {
    if (recivedUser?.token) {
      setUser(recivedUser);
      manageCookie(true, recivedUser.token);
      setLoading(false);
      localStorage.setItem("uid", recivedUser.id + "");
      return recivedUser.id;
    } else {
      setUser(null);
      manageCookie(false, null);
      setLoading(false);
      return false;
    }
  }

  async function login(recivedUser: User) {
    setLoading(true);

    try {
      if (!recivedUser.username || !recivedUser.password) {
        throw new Error("Informe todos os valores.");
      }

      const response = await axios.post<User>(
        "http://localhost:8080/users/login",
        recivedUser
      );

      confingSection(response.data);
      //todo validar entrar na ultima tela salva localmente, senao na current line 1
      router.push("/dashboard/equipaments");
      return response.data.id;
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

  async function register(recivedUser: User) {
    setLoading(true);
    await axios.post<User>(
      "http://localhost:8080/users",
      recivedUser
    );
    return recivedUser.id;
  }

  useEffect(() => {

    const token = Cookies.get("elevate-token");

    if (!token) confingSection(null);
    setLoading(true);
    axios
      .post<User>(
        "http://localhost:8080/users/validate",
        { token: token }
      )
      .then((resp) => {
        confingSection(resp.data);
      })
      .catch((err) => {
        confingSection(null);
      });
    
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
