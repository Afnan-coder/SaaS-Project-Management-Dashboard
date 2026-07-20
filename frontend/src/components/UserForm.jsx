import { useState } from "react";

const UserForm = ({
    onSubmit,
    initialData = {},
    buttonText,
}) => {

    const [role, setRole] = useState(
        initialData.role || "developer"
    );

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({
            role,
        });

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <div>

                <label className="block mb-2">
                    Role
                </label>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                >

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

            <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
                {buttonText}
            </button>

        </form>

    );

};

export default UserForm;