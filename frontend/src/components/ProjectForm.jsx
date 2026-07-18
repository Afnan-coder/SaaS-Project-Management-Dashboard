import { useState } from "react";

const ProjectForm = ({ onSubmit, initialData = {}, buttonText, users }) => {

    const [formData, setFormData] = useState({

        name: initialData.name || "",

        description: initialData.description || "",

        status: initialData.status || "Planning",

        priority: initialData.priority || "Medium",

        deadline: initialData.deadline
            ? initialData.deadline.slice(0, 10)
            : "",

        client: initialData.client?._id || "",

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 space-y-5"
        >

            <h2 className="text-2xl font-bold">
                {buttonText === "Create"
                    ? "Create Project"
                    : "Edit Project"}
            </h2>

            <div>
                <label className="block mb-2 font-medium">
                    Project Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Description
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border rounded-lg px-4 py-2"
                    required
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Status
                </label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                >

                    <option value="Planning">
                        Planning
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                </select>
            </div>

            {/* priority */}

            <div>

                <label className="block mb-2">
                    Priority
                </label>

                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                >

                    <option value="Low">
                        Low
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="High">
                        High
                    </option>

                </select>

            </div>

            {/* client */}

            <div>

                <label className="block mb-2">
                    Client
                </label>

                <select
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                >

                    <option value="">
                        Select Client
                    </option>

                    {users.map((user) => (

                        <option
                            key={user._id}
                            value={user._id}
                        >
                            {user.username}
                        </option>

                    ))}

                </select>

            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Deadline
                </label>

                <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
                {buttonText}
            </button>

        </form>
    );
};

export default ProjectForm;