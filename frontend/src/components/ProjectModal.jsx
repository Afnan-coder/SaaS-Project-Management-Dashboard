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
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">

            <div className="min-h-screen flex justify-center py-8 px-4">

                <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl relative">

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
                    >
                        ✕
                    </button>

                    <div className="p-6">

                        <ProjectForm
                            onSubmit={onSubmit}
                            initialData={initialData}
                            buttonText={buttonText}
                            users={users}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProjectModal;