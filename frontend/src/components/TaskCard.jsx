const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-5 border">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-bold">
                        {task.title}
                    </h2>

                    <p className="text-gray-600 mt-2">
                        {task.description}
                    </p>

                </div>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {task.status}
                </span>

            </div>

            <div className="mt-4 space-y-2">

                <p>
                    <strong>Priority:</strong> {task.priority}
                </p>

                <p>
                    <strong>Project:</strong> {task.project?.name}
                </p>

                <p>
                    <strong>Assignee:</strong> {task.assignee?.username}
                </p>

                <p>
                    <strong>Estimated Hours:</strong> {task.estimatedHours}
                </p>

                <p>
                    <strong>Due Date:</strong>{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                </p>

            </div>

            <div className="flex gap-3 mt-5">

                <button
                    onClick={() => onEdit(task)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(task._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Delete
                </button>

            </div>

        </div>
    );
};

export default TaskCard;