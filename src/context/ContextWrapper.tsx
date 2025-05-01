"use client";
import { iLoggedUser } from "@/src/interface/user/iLoggedUser";
import { getCookie, setCookie } from "cookies-next";
import React, { createContext, useContext, useState } from "react";
import ReactQueryClientProvider from "../components/createdComponents/ReactQueryClientProvider";

interface IUserContext {
    loggedUser: iLoggedUser | null;
    setLoggedUser: React.Dispatch<React.SetStateAction<iLoggedUser | null>>;
    setCookieLoggedUser: (user: iLoggedUser) => void;
    cookie: string | undefined;
}

const Context = createContext<IUserContext | null>(null);

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const [loggedUser, setLoggedUser] = useState<iLoggedUser | null>(null);

    function setCookieLoggedUser(user: iLoggedUser) {
        setLoggedUser(user);
        const expires = new Date(Date.now() + 1000 * 60 * 60);
        setCookie("UP", btoa(JSON.stringify(user.perfil)), {
            expires,
            sameSite: "strict",
            path: '/',
        });

        setCookie("UID", btoa(JSON.stringify(user.codigo)), {
            expires,
            sameSite: "strict",
            path: '/',
        });

        setCookie("UU", btoa(JSON.stringify(user.usuario)), {
            expires,
            sameSite: "strict",
            path: '/',
        });
    }

    return (
        <ReactQueryClientProvider>
            <Context.Provider
                value={{
                    loggedUser,
                    setLoggedUser,
                    setCookieLoggedUser,
                    cookie: typeof getCookie === "function" ? String(getCookie("UP") ?? "") : undefined,
                }}
            >
                {children}
            </Context.Provider>
        </ReactQueryClientProvider>
    );
};

export const useUser = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
