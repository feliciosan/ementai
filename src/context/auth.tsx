import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  AuthErrorCodes,
  AuthError,
  onAuthStateChanged,
  beforeAuthStateChanged,
} from "firebase/auth";
import { app } from "@/config/firebase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TCompanyResponse } from "@/app/actions/company.types";
import CompanyService from "@/app/actions/company";

interface IAuthContext {
  currentCompany: TCompanyResponse | null;
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const firebaseAuth = getAuth(app);

  const { data: currentCompany, isFetched: isCurrentCompanyFetched } = useQuery(
    {
      queryKey: ["get-company-by-id", companyId],
      queryFn: async () => CompanyService.getCompanyById(companyId || ""),
      initialData: null,
      enabled: !!companyId,
    }
  );

  const { mutateAsync: setCompanyInfo } = useMutation({
    mutationKey: ["set-company-info"],
    mutationFn: async (params: {
      uid: string;
      data: Partial<TCompanyResponse>;
    }) => CompanyService.setCompanyInfo(params.uid, params.data),
  });

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const unsubscribeBefore = beforeAuthStateChanged(
        firebaseAuth,
        async (user) => {
          if (!!user) {
            await setCompanyInfo({
              uid: user.uid,
              data: { email: user.email || "" },
            });
          }
        }
      );

      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      unsubscribeBefore();
    } catch (error: unknown) {
      const authError = error as AuthError;

      if (authError.code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Email não disponível! Por favor, tente outro.");
      } else {
        alert("Algo deu errado! Por favor, tente novamente.");
      }
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error: unknown) {
      alert("Login inválido! Por favor, verifique seu email e senha.");
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const unsubscribeSigninWithGoogle = beforeAuthStateChanged(
        firebaseAuth,
        async (user) => {
          if (!!user) {
            await setCompanyInfo({
              uid: user.uid,
              data: { email: user.email || "" },
            });
          }
        }
      );

      await signInWithPopup(firebaseAuth, provider);
      unsubscribeSigninWithGoogle();
    } catch (error) {
      alert("Não foi possível entrar! Por favor, tente novamente.");
    }
  };

  const logout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      alert("Não foi possível sair! Por favor, tente novamente.");
    }
  };

  useEffect(() => {
    const unsubscribeStateChanged = onAuthStateChanged(
      firebaseAuth,
      async (user) => {
        if (user) {
          setCompanyId(user.uid);
        } else {
          setCompanyId(null);
          setIsAuthLoading(false);
        }
      }
    );

    return unsubscribeStateChanged;
  }, [firebaseAuth, setIsAuthLoading]);

  useEffect(() => {
    if (isCurrentCompanyFetched) {
      setIsAuthLoading(false);
    }
  }, [isCurrentCompanyFetched]);

  return (
    <AuthContext.Provider
      value={{
        currentCompany,
        signInWithGoogle,
        signUp,
        signIn,
        logout,
        isAuthLoading,
        isAuthenticated: !!currentCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
