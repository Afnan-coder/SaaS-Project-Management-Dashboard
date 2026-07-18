import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="bg-white shadow-md h-16 flex items-center justify-between px-8">

            <h1 className="text-2xl font-bold text-blue-600">
                PMS Dashboard
            </h1>

            <div className="flex items-center gap-6">

                <div className="text-right">
                    <h3 className="font-semibold">
                        {user?.username}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {user?.role}
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>

            </div>

        </header>
    );
};

export default Navbar;