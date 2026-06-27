import { useState } from "react";

export type ModalState = {
    isOpen:boolean,
    openModal:() => void,
    closeModal:() => void,
}

export function useModals():ModalState {
    const [show, setShow] = useState(false)
    const openModal = () => setShow(true)
    const closeModal = () => setShow(false)
    return {isOpen: show, openModal, closeModal}
}