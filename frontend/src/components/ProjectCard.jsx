import {
    FaUser,
    FaUsers,
    FaCalendarAlt,
    FaUserTie,
} from "react-icons/fa";

const ProjectCard = ({
    project,
    onEdit,
    onDelete,
    user,
}) => {

    const getStatusStyle = (status) => {

        switch (status) {

            case "Planning":
                return "bg-blue-100 text-blue-700";

            case "In Progress":
                return "bg-yellow-100 text-yellow-700";

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
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold">
                    {project.name}
                </h2>

                <div className="flex gap-2">

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(project.status)}`}
                    >
                        {project.status}
                    </span>

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(project.priority)}`}
                    >
                        {project.priority}
                    </span>

                </div>

            </div>

            <p className="text-gray-500 mt-4 leading-7">
                {project.description}
            </p>

            <div className="mt-6 space-y-4 text-sm">

                <div className="flex items-center gap-2">

                    <FaUser className="text-blue-500" />

                    <span className="font-semibold">
                        Client:
                    </span>

                    <span>{project.client?.username}</span>

                </div>

                <div className="flex items-center gap-2">

                    <FaUserTie className="text-green-500" />

                    <span className="font-semibold">
                        Created By:
                    </span>

                    <span>{project.createdBy?.username}</span>

                </div>

                <div className="flex items-center gap-2">

                    <FaUsers className="text-purple-500" />

                    <span className="font-semibold">
                        Team:
                    </span>

                    <span>{project.teamMembers?.length}</span>

                </div>

                <div className="flex items-center gap-2">

                    <FaCalendarAlt className="text-red-500" />

                    <span className="font-semibold">
                        Deadline:
                    </span>

                    <span>{new Date(project.deadline).toLocaleDateString()}</span>

                </div>

            </div>

            <div className="flex gap-3 mt-6">

                {(user?.role === 'super_admin' || user?.role === 'manager') && (<button
                    onClick={() => {
                        console.log("Edit button clicked");
                        onEdit(project);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 transition text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                    Edit
                </button>)}

                {(user?.role === 'super_admin') && (<button
                    onClick={() => onDelete(project._id)}
                    className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                    Delete
                </button>)}

            </div>

        </div>
    );
};

export default ProjectCard;