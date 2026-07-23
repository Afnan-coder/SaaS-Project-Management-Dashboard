import { createContext, useContext, useEffect, useState, useRef } from "react";
import {
    login as loginService,
    logout as logoutService,
    refreshToken as refreshTokenService,
    register as registerService,
} from "../services/authService";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const refreshIntervalId = useRef(null); // Track refresh interval

    // Login
    const login = async (userData) => {
        try {
            const data = await loginService({
                email: userData.email,
                password: userData.password,
            });

            setUser(data.user);
            setAccessToken(data.accessToken);
            localStorage.setItem("accessToken", data.accessToken);

            // Start auto-refresh (refresh 1 minute before expiration)
            startAutoRefresh();

            return {
                success: true,
                message: data.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };

    // Register
    const register = async (userData) => {
        try {
            const data = await registerService(userData);
            return {
                success: true,
                message: data.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed",
            };
        }
    };

    // Logout
    const logout = async () => {
        try {
            await logoutService();
            localStorage.removeItem("accessToken");
            setUser(null);
            setAccessToken(null);
            stopAutoRefresh(); // Stop auto-refresh on logout
        } catch (error) {
            console.log(error);
        }
    };

    // Auto-refresh token before expiration
    const startAutoRefresh = () => {
        // Refresh every 14 minutes (token expires in 15 min, so refresh 1 min before)
        refreshIntervalId.current = setInterval(async () => {
            try {
                const data = await refreshTokenService();
                setAccessToken(data.accessToken);
                localStorage.setItem("accessToken", data.accessToken);
            } catch (error) {
                // If refresh fails, logout user
                logout();
            }
        }, 14 * 60 * 1000); // 14 minutes
    };

    const stopAutoRefresh = () => {
        if (refreshIntervalId.current) {
            clearInterval(refreshIntervalId.current);
            refreshIntervalId.current = null;
        }
    };

    // Check Login when App Starts
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const data = await refreshTokenService();
                setUser(data.user);
                setAccessToken(data.accessToken);
                localStorage.setItem("accessToken", data.accessToken);
                startAutoRefresh();
            } catch (error) {
                setUser(null);
                setAccessToken(null);
            } finally {
                setLoading(false);
            }
        };

        checkLogin();

        // Cleanup on unmount
        return () => {
            stopAutoRefresh();
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                loading,
                login,
                logout,
                register,
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