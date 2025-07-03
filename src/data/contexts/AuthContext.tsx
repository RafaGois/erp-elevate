"use client";

import { createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import router from "next/router";
import AuthContextProps from "../../interfaces/AuthContextProps";

const AuthContext = createContext<AuthContextProps>({});

function manageCookie(logged: boolean, token: string | null) {
  if (logged) {
    Cookies.set("mmm-frameport-v2-auth", logged + "", { expires: 1 });
    if (token) Cookies.set("mmm-frameport-v2-token", token, { expires: 1 });
  } else {
    Cookies.remove("mmm-frameport-v2-auth");
    Cookies.remove("mmm-frameport-v2-token");
    localStorage.setItem("selectedTab", "/Current/Line1");
  }
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState/* <User> */(null);

  async function confingSection(recivedUser: any/* : User */) {
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
  async function login(recivedUser: any/* : User */) {
    setLoading(true);
    try {
      if (!recivedUser.username || !recivedUser.password) {
        throw new Error("Informe todos os valores.");
      }

      const response = await axios.post/*< : User>*/(
        "https://mmm-frameport-production.up.railway.app/screen/users/login",
        recivedUser
      );
      confingSection(response.data);
      //todo validar entrar na ultima tela salva localmente, senao na current line 1
      router.push("/Current/Line1");
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

  async function register(recivedUser: any/* : User */) {
    try {
      if (!recivedUser.name || !recivedUser.username || !recivedUser.password) {
        throw new Error("Informe todos os valores.");
      }

      setLoading(true);
      await axios.post/*< : User>*/(
        "https://mmm-frameport-production.up.railway.app/screen/users",
        recivedUser
      );
    } catch (err: any) {
      throw new Error(err?.response?.data[0] ?? err?.message?? "Erro ao executar operação.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = Cookies.get("mmm-frameport-v2-token");

    if (!token) confingSection(null);
    setLoading(true);
    axios
      .post/*< : User>*/(
        "https://mmm-frameport-production.up.railway.app/screen/users/validate",
        { token: token }
      )
      .then((resp) => {
        confingSection(resp.data);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => {
        confingSection(null);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
