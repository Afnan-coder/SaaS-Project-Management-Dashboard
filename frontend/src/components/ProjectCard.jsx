const ProjectCard = ({
    project,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold">
                    {project.name}
                </h2>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {project.status}
                </span>

            </div>

            <p className="text-gray-600 mt-4">
                {project.description}
            </p>

            <div className="mt-6 space-y-2 text-sm">

                <p>
                    <span className="font-semibold">
                        Client:
                    </span>{" "}
                    {project.client?.username}
                </p>

                <p>
                    <span className="font-semibold">
                        Created By:
                    </span>{" "}
                    {project.createdBy?.username}
                </p>

                <p>
                    <span className="font-semibold">
                        Team Members:
                    </span>{" "}
                    {project.teamMembers?.length}
                </p>

                <p>
                    <span className="font-semibold">
                        Deadline:
                    </span>{" "}
                    {new Date(project.deadline).toLocaleDateString()}
                </p>

            </div>

            <div className="flex gap-3 mt-6">

                {/* <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                    Edit
                </button> */}
                <button
                    onClick={() => {
                        console.log("Edit button clicked");
                        onEdit(project);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(project._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Delete
                </button>

            </div>

        </div>
    );
};

export default ProjectCard;