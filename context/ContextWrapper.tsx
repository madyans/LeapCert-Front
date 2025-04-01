"use client";
import ReactQueryClientProvider from "@/components/createdComponents/ReactQueryClientProvider";
import { iLoggedUser } from "@/interface/user/iLoggedUser";
import { getCookie, setCookie } from "cookies-next";
import React, { createContext, useContext, useState } from "react";

const Context = createContext<any>(null);

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const [loggedUser, setLoggedUser] = useState<iLoggedUser | null>(null);

    function setCookieLoggedUser(user: iLoggedUser) {
        setLoggedUser(user);
        setCookie("UC", btoa(JSON.stringify(user.segmento)), {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            sameSite: "strict",
        });
        setCookie("UP", btoa(JSON.stringify(user.perfil)), {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            sameSite: "strict",
        });
        setCookie("UID", btoa(JSON.stringify(user.codigo)), {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            sameSite: "strict",
        });
    }

    return (
        <ReactQueryClientProvider>
            <Context.Provider
                value={{
                    loggedUser,
                    setLoggedUser,
                    setCookieLoggedUser,
                    cookie: getCookie("UP"),
                }}
            >
                {children}
            </Context.Provider>
        </ReactQueryClientProvider>
    );
};

export const useUser = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
