import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaLock, FaLink } from "react-icons/fa";

interface ShareFileModalProps {
    fileUrl: string;
    show: boolean;
    onHide: () => void;
}

const ShareFileModal: React.FC<ShareFileModalProps> = ({ fileUrl, show, onHide }) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(fileUrl)
            .then(() => {
                console.log("Link copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy link: ", err);
            });
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>File Uploaded</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>General access</h6>
                <div className="d-flex align-items-center border rounded p-2">
                    <FaLock className="me-2" />
                    <div>
                        <div>Limited access</div>
                        <small className="text-muted">
                            Only users with access can follow this link
                        </small>
                    </div>
                </div>

                <Button
                    variant="light"
                    className="mt-3 w-100 d-flex align-items-center justify-content-center"
                    onClick={handleCopy}
                >
                    <FaLink className="me-2" />
                    Copy the link
                </Button>
            </Modal.Body>

        </Modal>
    );
};

export default ShareFileModal;
