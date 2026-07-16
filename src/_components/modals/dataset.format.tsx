import { Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { AppJsonView } from "../app-jsonview";
import { datasetFormformat, prompt } from "../../_utils/constants";
import CopyBtn from "../copy-btn";

export default function DatasetFormatModal({modalState}:{modalState:ModalState}) {
    
    return (
        <Modal size="lg" show={modalState.isOpen} onHide={modalState.closeModal}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="position-relative">
                <CopyBtn onCopy={() => {
                    window.navigator.clipboard.writeText(`${prompt}\n\`\`\` Format \n${JSON.stringify(datasetFormformat, null, 2)}\`\`\``)
                }} className="position-absolute end-0 top-0"/>
                <label>Prompt</label>
                <textarea value={prompt} className="form-control mt-2 mb-2" rows={6}></textarea>
                <AppJsonView name="datasets" data={datasetFormformat} />
            </Modal.Body>
        </Modal>
    )
}