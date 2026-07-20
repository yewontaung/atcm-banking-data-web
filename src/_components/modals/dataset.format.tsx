import { Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { AppJsonView } from "../app-jsonview";
import { datasetFormformat, prompt } from "../../_utils/constants";
import CopyBtn from "../copy-btn";
import { useState } from "react";

export default function DatasetFormatModal({ modalState }: { modalState: ModalState }) {

    const [promptState, setPromptState] = useState<string>(prompt ?? "")
    
    return (
        <Modal size="lg" show={modalState.isOpen} onHide={modalState.closeModal}>
            <Modal.Header closeButton>Dataset Format Preview</Modal.Header>
            <Modal.Body className="position-relative">
                <CopyBtn onCopy={() => {
                    window.navigator.clipboard.writeText(`${promptState}\n\`\`\` \n${JSON.stringify(datasetFormformat, null, 2)}\n\`\`\``)
                }} className="position-absolute end-0 top-0" />
                <div className="mb-2 py-2 px-3">
                    <textarea onChange={e => {
                        if (!e.target.value) return
                        setPromptState(e.target.value)
                    }} value={promptState} className="form-control" rows={6}></textarea>
                </div>
                <AppJsonView name="datasets" data={datasetFormformat} />
            </Modal.Body>
        </Modal>
    )
}