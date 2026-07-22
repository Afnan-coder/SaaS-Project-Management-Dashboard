import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

    const {user} = useAuth()

    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white">

            <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold">
                    Menu
                </h2>
            </div>

            <nav className="flex flex-col p-4 gap-2">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-gray-700"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-gray-700"
                        }`
                    }
                >
                    Projects
                </NavLink>

                <NavLink
                    to="/tasks"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-gray-700"
                        }`
                    }
                >
                    Tasks
                </NavLink>

               {(user?.role === 'super_admin') && (<NavLink
                    to="/users"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg transition ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-gray-700"
                        }`
                    }
                >
                    Users
                </NavLink>)}

            </nav>

        </aside>
    );
};

export default Sidebar;