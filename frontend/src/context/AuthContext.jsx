import { createContext, useContext, useEffect, useState } from "react";
import {
    login as loginService,
    logout as logoutService,
    refreshToken as refreshTokenService,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Login
    const login = async (userData) => {
        try {

            const data = await loginService(userData);

            setUser(data.user);
            setAccessToken(data.accessToken);

            return {
                success: true,
                message: data.message,
            };

        } catch (error) {

            return {
                success: false,
                message:
                    error.response?.data?.message || "Login failed",
            };

        }
    };

    // Logout
    const logout = async () => {
        try {

            await logoutService();

            setUser(null);
            setAccessToken(null);

        } catch (error) {
            console.log(error);
        }
    };

    // Check Login when App Starts
    useEffect(() => {

        const checkLogin = async () => {

            try {

                const data = await refreshTokenService();

                setUser(data.user);
                setAccessToken(data.accessToken);

            } catch (error) {

                setUser(null);
                setAccessToken(null);

            } finally {

                setLoading(false);

            }

        };

        checkLogin();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                loading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};