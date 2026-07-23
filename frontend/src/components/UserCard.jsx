import { FaUserCircle, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const UserCard = ({
    user,
    onEdit,
    onDelete,
}) => {

    const { user: currentUser } = useAuth();

    const getRoleStyle = (role) => {

        switch (role) {

            case "super_admin":
                return "bg-red-100 text-red-700";

            case "manager":
                return "bg-blue-100 text-blue-700";

            case "developer":
                return "bg-green-100 text-green-700";

            case "client":
                return "bg-purple-100 text-purple-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };

    return (

        <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">

            <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">

                    {user.username.charAt(0).toUpperCase()}

                </div>

                <div>

                    <h2 className="text-xl font-bold text-gray-800">

                        {user.username}

                    </h2>

                    <div className="flex items-center gap-2 mt-1 text-gray-500">

                        <FaEnvelope />

                        <span>{user.email}</span>

                    </div>

                </div>

            </div>

            <div className="mt-6 flex items-center gap-3">

                <FaShieldAlt className="text-orange-500" />

                <span className="font-semibold">
                    Role:
                </span>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleStyle(user.role)}`}
                >
                    {user.role}
                </span>

            </div>

            <div className="flex gap-3 mt-6">

                {currentUser?.role === "super_admin" && (

                    <button
                        onClick={onEdit}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                        Edit
                    </button>

                )}

                {currentUser?.role === "super_admin" && (

                    <button
                        onClick={onDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                        Delete
                    </button>

                )}

            </div>

        </div>

    );

};

export default UserCard;