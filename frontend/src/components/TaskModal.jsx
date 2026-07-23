import TaskForm from "./TaskForm";

const TaskModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    buttonText,
    users,
    projects,
}) => {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">

            <div className="min-h-screen flex justify-center py-8 px-4">

                <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative">

                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-2xl font-bold text-gray-500 hover:text-red-500 transition"
                    >
                        ✕
                    </button>

                    <div className="p-8">

                        <TaskForm
                            onSubmit={onSubmit}
                            initialData={initialData}
                            buttonText={buttonText}
                            users={users}
                            projects={projects}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

};

export default TaskModal;