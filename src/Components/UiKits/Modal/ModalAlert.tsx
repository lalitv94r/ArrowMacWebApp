import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { RiDeleteBin6Line } from "react-icons/ri";
import { ModalAlertPropType } from '@/Type/ModalAlertTypes';

const ModalAlert = ({
    type = "delete",
    onActionClick
}: ModalAlertPropType) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const toggle = () => setShowAlert(!showAlert);

    const handleActionClick = async () => {
        onActionClick();
        toggle();
    }

    return (
        <div>
            <RiDeleteBin6Line
                size={20}
                className='bg-danger text-white'
                onClick={toggle}
            />
            <Modal isOpen={showAlert} toggle={toggle}>
                <ModalBody>
                    <div className="modal-img">
                    </div>
                    <div className="d-flex align-items-center justify-content-md-start">
                        <div className='bg-light p-3 rounded-circle'>
                            <RiDeleteBin6Line
                                className='text-danger'
                                size={40}
                            />
                        </div>
                        <h4 className='ps-2'>Are you sure you want to delete this item?</h4>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex align-items-center gap-2 text-light justify-content-md-end">
                        <Button color="warning" onClick={toggle}>
                            No
                        </Button>
                        <Button color="danger"
                            onClick={() => handleActionClick()}
                        >
                            Yes
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalAlert