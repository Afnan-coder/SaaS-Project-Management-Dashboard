import { useEffect, useState } from "react";

import { getUsers } from "../services/userService";

import UserCard from "../components/UserCard";
import { updateUserRole } from "../services/userService";
import UserModal from "../components/UserModal";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editingUser, setEditingUser] = useState(null);



    const fetchUsers = async () => {

        try {

            const response = await getUsers();

            setUsers(response);

        } catch (error) {

            console.log(error);

        }

    };

    const handleEditClick = (user) => {

        setEditingUser(user);

        setIsModalOpen(true);

    };

    const handleUpdateUser = async (data) => {

        try {

            await updateUserRole(
                editingUser._id,
                data.role
            );

            fetchUsers();

            setIsModalOpen(false);

            setEditingUser(null);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchUsers();

    }, []);

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Users
            </h1>

            <div className="grid gap-6">

                {
                    users.map((user) => (

                        <UserCard
                            key={user._id}
                            user={user}
                            onEdit={() => handleEditClick(user)}
                        />

                    ))
                }

            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => {

                    setIsModalOpen(false);

                    setEditingUser(null);

                }}
                onSubmit={handleUpdateUser}
                initialData={editingUser}
                buttonText="Update"
            />

        </div>

    );

};

export default Users;