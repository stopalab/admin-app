import { ComponentDefaultProps, useToast } from "@chakra-ui/react";
import { setCookie } from "nookies";
import { useState } from "react";
import { createContext } from "react";
import { api } from "../services/api";

import Router from 'next/router'

type SignInData = {
  email: string;
  password: string;
}
type User = {
  name: string;
  email: string;
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType )
export function AuthProvider({ children }: ComponentDefaultProps) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user;

  const toast = useToast()

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await api.post("/sessions", {
        email,
        password
      })

      setCookie(undefined, 'stopalabAdminToken', response.data.accessToken, {
        maxAge: 60 * 60 * 24
      })

      api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`

      Router.push('/dashboard')

    } catch (e) {

      if(e.response.status) {
        toast({
          title: "Algo seu errado",
          description: "Usuário ou senha inválidos, cheque suas credenciais e tente novamente",
          status: "error",
          position: "top-right",
          isClosable: true
        })
      } else {
        toast({
          title: "Algo seu errado",
          description: "Ocorreu um erro inesperado, tente novamente mais tarde.",
          status: "error",
          position: "top-right",
          isClosable: true
        })
      }

      

    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}