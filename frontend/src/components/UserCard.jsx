import { useAuth } from "../context/AuthContext";

const UserCard = ({
    user,
    onEdit,
}) => {
    
    const {user: currentUser} = useAuth()
    return (
        
        <div className="bg-white shadow rounded-lg p-5">
                
            <h2 className="text-xl font-semibold">
                {user.username}
            </h2>

            <p className="text-gray-600">
                {user.email}
            </p>

            <p className="mt-2">

                Role:

                <span className="font-semibold ml-2">

                    {user.role}

                </span>

            </p>

            <div className="flex gap-3 mt-5">

                {(currentUser?.role === 'super_admin')&&(<button
                    onClick={onEdit}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    Edit
                </button>)}

            </div>

        </div>

    );

};

export default UserCard;