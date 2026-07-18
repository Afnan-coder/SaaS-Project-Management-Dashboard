import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Wait until authentication check is complete
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // User is not logged in
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // User is logged in
    return children;
};

export default ProtectedRoute;