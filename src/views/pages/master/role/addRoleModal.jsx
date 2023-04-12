import { format } from "date-fns";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const AddRoleModal = ({ modal, setModal, value, setValue, handleAddClick, isFromUpdate }) => {
    const roles = useSelector(store => store.master.role.roles)
    const filtered = [
        '_id',
        'status',
        'updatedAt',
        'createdAt',
        '__v'
    ]
    return (
        <div>
            <Modal
                isOpen={modal}
                toggle={() => setModal(!modal)}
            >
                <ModalHeader>
                   {isFromUpdate ? "Update" : "Add"} 
                </ModalHeader>
                <ModalBody>
                    {
                        Object.keys(value).length > 0 ?
                            Object.keys(value).map((e) => {
                                if (!filtered.includes(e)) {
                                    return e !== 'role' ?
                                        <div className="form-group">
                                            <label>
                                                {e.charAt(0).toUpperCase() + e.slice(1)}
                                            </label>
                                            <input
                                                type={e === 'mobile' ? 'number' : "text"}
                                                className="form-control react-form-input"
                                                placeholder={e}
                                                id={e}
                                                onChange={(v) => setValue(e, v.target.value)}
                                                value={value[e]}
                                            />
                                        </div>
                                        :
                                        <div>
                                            <label>
                                                {e.charAt(0).toUpperCase() + e.slice(1)}
                                            </label>
                                            <select
                                                id={e}
                                                name={e}
                                                className="form-control form-control-lg react-form-input mb-5"
                                                value={typeof (value[e]) === 'string' ? value[e] : value[e]['name']}
                                                onChange={(v) => setValue(e, v.target.value)}
                                            >
                                                {roles.length > 0 ? (
                                                   roles.map(opt => (
                                                        <option>{opt.name}</option>
                                                    ))
                                                ) : (
                                                    <option>No data</option>
                                                )}
                                            </select>
                                        </div>
                                }
                            })
                            : ""
                    }
                    <div className="d-flex">
                    {
                        isFromUpdate ?
                            <Button
                                className="btn btn-blue w-100 border-0 mr-5"
                                type="button"
                                onClick={() => handleAddClick("update")}
                            >
                                Update
                            </Button> :
                            <Button
                                className="btn btn-blue w-100 border-0 mr-5"
                                type="button"
                                onClick={() => handleAddClick("add")}
                            >
                                Add
                            </Button>
                    }
                <Button
                    className="btn btn-blue w-100 border-0 mr-5"
                    type="button"
                    onClick={()=> setModal(!modal)}
                >
                 Cancel
                </Button>
                   </div>
                </ModalBody>
            </Modal>
        </div >
    );
}
export default AddRoleModal;