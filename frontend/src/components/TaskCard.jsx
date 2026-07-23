import {
    FaFolder,
    FaUser,
    FaCalendarAlt,
    FaClock,
} from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete, user }) => {

    const getStatusStyle = (status) => {

    switch (status) {

        case "Todo":
            return "bg-gray-100 text-gray-700";

        case "In Progress":
            return "bg-yellow-100 text-yellow-700";

        case "Testing":
            return "bg-purple-100 text-purple-700";

        case "Completed":
            return "bg-green-100 text-green-700";

        default:
            return "bg-gray-100 text-gray-700";

    }

};

const getPriorityStyle = (priority) => {

    switch (priority) {

        case "High":
            return "bg-red-100 text-red-700";

        case "Medium":
            return "bg-orange-100 text-orange-700";

        case "Low":
            return "bg-green-100 text-green-700";

        default:
            return "bg-gray-100 text-gray-700";

    }

};


    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">

            <div className="flex justify-between items-start gap-4">

                <div className="flex-1">

                    <h2 className="text-xl font-bold text-gray-800">
                        {task.title}
                    </h2>

                    <p className="text-gray-500 mt-3 leading-7">
                        {task.description}
                    </p>

                </div>

                <div className="flex flex-col gap-2">

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-center ${getStatusStyle(task.status)}`}
                    >
                        {task.status}
                    </span>

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-center ${getPriorityStyle(task.priority)}`}
                    >
                        {task.priority}
                    </span>

                </div>

            </div>

            <div className="mt-6 space-y-4 text-sm">

                <div className="flex items-center gap-3">

                    <FaFolder className="text-blue-500" />

                    <span className="font-semibold">
                        Project:
                    </span>

                    <span className="text-gray-600">
                        {task.project?.name}
                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <FaUser className="text-green-500" />

                    <span className="font-semibold">
                        Assignee:
                    </span>

                    <span className="text-gray-600">
                        {task.assignee?.username}
                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <FaClock className="text-orange-500" />

                    <span className="font-semibold">
                        Estimated Hours:
                    </span>

                    <span className="text-gray-600">
                        {task.estimatedHours} hrs
                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <FaCalendarAlt className="text-red-500" />

                    <span className="font-semibold">
                        Due Date:
                    </span>

                    <span className="text-gray-600">
                        {new Date(task.dueDate).toLocaleDateString()}
                    </span>

                </div>

            </div>

            <div className="flex gap-3 mt-6">

                {(user?.role === "super_admin" || user?.role === "manager") && (

                    <button
                        onClick={() => onEdit(task)}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                        Edit
                    </button>

                )}

                {user?.role === "super_admin" && (

                    <button
                        onClick={() => onDelete(task._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                        Delete
                    </button>

                )}

            </div>

        </div>
    );

};

export default TaskCard;