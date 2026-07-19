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

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-lg w-full max-w-2xl p-6">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        {buttonText} Task
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl font-bold"
                    >
                        ×
                    </button>

                </div>

                <TaskForm
                    onSubmit={onSubmit}
                    initialData={initialData}
                    buttonText={buttonText}
                    users={users}
                    projects={projects}
                />

            </div>

        </div>

    );

};

export default TaskModal;