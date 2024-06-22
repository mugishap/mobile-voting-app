import { getData } from "@/utils/storage";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext({});

export const useGlobal = () => useContext<any>(GlobalContext);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getData("token").then((token) => {
            if (token) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        })
    }, []);

    useEffect(() => {
        if (!isLogged) {
            router.push("/")
        }
    }, [isLogged])

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user,
                setUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
