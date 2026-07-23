import { useEffect, useState } from "react";
import Button from "./Button";

const TaskForm = ({
    onSubmit,
    initialData = {},
    buttonText,
    users = [],
    projects = [],
}) => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        project: "",
        assignee: "",
        status: "Todo",
        priority: "Medium",
        dueDate: "",
        estimatedHours: "",
    });

    useEffect(() => {

        if (initialData && Object.keys(initialData).length > 0) {

            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                project: initialData.project?._id || "",
                assignee: initialData.assignee?._id || "",
                status: initialData.status || "Todo",
                priority: initialData.priority || "Medium",
                dueDate: initialData.dueDate
                    ? initialData.dueDate.slice(0, 10)
                    : "",
                estimatedHours: initialData.estimatedHours || "",
            });

        }

    }, [initialData]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await onSubmit(formData);

        } finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {buttonText === "Create" ? "Create Task" : "Edit Task"}
            </h2>

            <p className="text-gray-500 mb-8">
                Fill in the task details below.
            </p>

            <div className="space-y-6">

                <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Task Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter task title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Description
                    </label>

                    <textarea
                        name="description"
                        placeholder="Describe the task..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Project
                        </label>

                        <select
                            name="project"
                            value={formData.project}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        >
                            <option value="">Select Project</option>

                            {projects.map((project) => (

                                <option
                                    key={project._id}
                                    value={project._id}
                                >
                                    {project.name}
                                </option>

                            ))}

                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Assignee
                        </label>

                        <select
                            name="assignee"
                            value={formData.assignee}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        >
                            <option value="">Select Developer</option>

                            {users
                                .filter((user) => user.role === "developer")
                                .map((user) => (

                                    <option
                                        key={user._id}
                                        value={user._id}
                                    >
                                        {user.username}
                                    </option>

                                ))}

                        </select>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Testing">Testing</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Estimated Hours
                        </label>

                        <input
                            type="number"
                            name="estimatedHours"
                            placeholder="Estimated hours"
                            value={formData.estimatedHours}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            min="1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Due Date
                        </label>

                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2"
                >
                    {
                        loading
                            ? (
                                buttonText === "Create"
                                    ? "Creating..."
                                    : "Updating..."
                            )
                            : buttonText
                    }
                </Button>

            </div>

        </form>

    );

};

export default TaskForm;