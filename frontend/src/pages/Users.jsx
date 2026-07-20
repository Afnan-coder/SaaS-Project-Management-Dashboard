import { useEffect, useState } from "react";

import { getUsers } from "../services/userService";

import UserCard from "../components/UserCard";
import { updateUserRole } from "../services/userService";
import UserModal from "../components/UserModal";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editingUser, setEditingUser] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [role, setRole] = useState("");



    const fetchUsers = async () => {

        try {

            const response = await getUsers({
                page: currentPage,
                search,
                role
            });

            setUsers(response.data);

            setTotalPages(response.totalPages);

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

    }, [search, role]);

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Users
            </h1>

            <div className="flex gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-2"
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                >

                    <option value="">
                        All Roles
                    </option>

                    <option value="super_admin">
                        Super Admin
                    </option>

                    <option value="manager">
                        Manager
                    </option>

                    <option value="developer">
                        Developer
                    </option>

                    <option value="client">
                        Client
                    </option>

                </select>

            </div>

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