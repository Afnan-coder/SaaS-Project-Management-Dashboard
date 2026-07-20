import Modal from "./Modal";
import UserForm from "./UserForm";

const UserModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    buttonText,
}) => {

    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >

            <UserForm
                onSubmit={onSubmit}
                initialData={initialData}
                buttonText={buttonText}
            />

        </Modal>

    );

};

export default UserModal;