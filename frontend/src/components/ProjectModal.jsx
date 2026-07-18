import ProjectForm from "./ProjectForm";

const ProjectModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    buttonText,
    users,
}) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
                >
                    ✕
                </button>

                <ProjectForm
                    onSubmit={onSubmit}
                    initialData={initialData}
                    buttonText={buttonText}
                    users={users}
                />

            </div>

        </div>
    );
};

export default ProjectModal;