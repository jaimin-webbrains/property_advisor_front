import { format } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import { push } from "react-router-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const ModalExample = ({modal,setModal,data,isFromRRInput}) => {
    const dispatch = useDispatch()
    // const [modal, setModal] = useState(false);
        return (
            <div>
                {
                    Array.isArray(data) && data.length > 0 && data[0] !== undefined &&
                    <Modal
                    isOpen={modal}
                    toggle={() => setModal(!modal)}
                    // className={className}
                >
                    <ModalHeader toggle={() => setModal(!modal)}>Data exists!</ModalHeader>
                    <ModalBody>
                        Rera Number : {data[0].reraNumber}<br/>
                        Last modified date : {format(new Date(data[0].lastModifiedDate), 'dd/MM/yyyy')}<br/>
                        Version count : {data.length}<br/>
                        {!isFromRRInput ?
                        <p>Can not insert data with same rera number and last modified date more than one time.</p>
                        :""}
                    </ModalBody>
                    <ModalFooter>
                       {
                        isFromRRInput ?
                        <Button className="c-primary" onClick={() => setModal(!modal)}>
                        Create
                    </Button> : ""
                       }
                       {" "}
                        <Button className="c-secondary" onClick={() => dispatch(push("/project_listing")) }>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                }
            </div>
        );
    }
export default ModalExample;