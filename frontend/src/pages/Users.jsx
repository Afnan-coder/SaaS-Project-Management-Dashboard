import { useEffect, useState } from "react";

import { getUsers } from "../services/userService";

import UserCard from "../components/UserCard";

const Users = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {

        try {

            const response = await getUsers();

            setUsers(response);

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
                        />

                    ))
                }

            </div>

        </div>

    );

};

export default Users;