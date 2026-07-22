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

            <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
            />

            <textarea
                name="description"
                placeholder="Task Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                rows="4"
                required
            />

            <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
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

            <select
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
            >
                <option value="">Select Assignee</option>

                {users.map((user) => (

                    <option
                        key={user._id}
                        value={user._id}
                    >
                        {user.username}
                    </option>

                ))}

            </select>

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
            >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Testing">Testing</option>
                <option value="Completed">Completed</option>
            </select>

            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <input
                type="number"
                name="estimatedHours"
                placeholder="Estimated Hours"
                value={formData.estimatedHours}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                min="1"
                required
            />

            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
            />

            <Button
                type="submit"
                disabled={loading}
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

        </form>

    );

};

export default TaskForm;