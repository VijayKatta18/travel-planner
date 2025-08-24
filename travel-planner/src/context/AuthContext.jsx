import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // hydrate from localstorage ( so refresh keeps you logged in )
    useEffect(() => {
        const raw = localStorage.getItem("tp_user");
        if (raw) setUser(JSON.parse(raw));
    }, []);

    useEffect(() => {
        if (user) localStorage.setItem("tp_user", JSON.stringify(user));
        else localStorage.removeItem("tp_user");
    }, [user]);

    const login = (username) => {
        setUser({ username, isAuthenticated: true });
    }
    const logout = () => {
        setUser(null);
    }

    const value = { user, login, logout, isLoggedIn: !!user };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export function useAuth(){
   return useContext(AuthContext);
}