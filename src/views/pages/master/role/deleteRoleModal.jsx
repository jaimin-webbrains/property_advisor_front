import { format } from "date-fns";
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const DeleteRoleModal = ({ modal, setModal,handleAddClick }) => {
    return (
        <div>

            <Modal
                isOpen={modal}
                toggle={() => setModal(!modal)}
            >
                <ModalBody>
                    <div className="form-group">
                        <h3>Are you sure?</h3>
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
                 No
                </Button>
                   </div>
                </ModalBody>
            </Modal>
        </div>
    );
}
export default DeleteRoleModal;