import React from "react";
import { Modal } from "react-bootstrap";
import { BiErrorAlt } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";

interface NotifyModalProps {
    message: string;
    show: boolean;
    isError: boolean;
    onHide: () => void;
}

const NotifyModal: React.FC<NotifyModalProps> = ({ message, show, isError, onHide }) => {

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex align-items-center border rounded p-2">
                    {isError ? <BiErrorAlt className="me-2 fs-3" /> : <GrStatusGood className="me-2 fs-3" />}

                    <div className="fs-5">{message}</div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default NotifyModal;