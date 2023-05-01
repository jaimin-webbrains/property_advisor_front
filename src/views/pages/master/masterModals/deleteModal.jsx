import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
const DeleteRoleModal = ({ modal, setModal,handleAddClick,name }) => {
    return (
        <div>

            <Modal
                isOpen={modal}
                toggle={() => setModal(!modal)}
            >
                <ModalHeader>
                    {`Delete ${name}`}
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <b>Are you sure?</b>
                    </div>
                   <div className="d-flex">
                   <Button
                    className="btn btn-blue w-100 border-0 mr-5"
                    type="button"
                    onClick={() => handleAddClick("delete")}
                >
                 Yes
                </Button>
                <Button
                    className="btn btn-blue w-100 border-0"
                    type="button"
                    onClick={()=> setModal(!modal)}
                >
                 Cancel
                </Button>
                   </div>
                </ModalBody>
            </Modal>
        </div>
    );
}
export default DeleteRoleModal;