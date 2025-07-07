"use client";

import AppContextProps from "../../interfaces/AppContextProps"
import { createContext, useEffect, useState} from "react"

const AppContext = createContext<AppContextProps>({});

interface AppProviderProps {
    children: React.ReactNode
}

export function AppProvider(props: AppProviderProps) {
    const [navbarVisibility, setNavbarVisibility] = useState(false);
    const [selectedMenuTab, setSelectedMenuTab] = useState("/Current/Line1");
    const [loading, setLoading] = useState(false);
    const [reloading, setReloading] = useState(false);

    function changeSelectedMenuTab(newTab: string) {
        setSelectedMenuTab(newTab);
        localStorage.setItem("selectedMenuTab", newTab);
    }

    useEffect(() => {
        setSelectedMenuTab(localStorage.getItem("selectedMenuTab") ?? "/Current/Line1");
    }, []);

    return (
        <AppContext.Provider
            value={{
                navbarVisibility,
                loading,
                reloading,
                selectedMenuTab,
                setNavbarVisibility,
                setLoading,
                setReloading,
                changeSelectedMenuTab,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;