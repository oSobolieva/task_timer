import modal from "../assets/styles/modal.css"

import { useEffect, useRef } from "react";

export default function Modal({ title, message, onClose, isOpen}) {
    const dialogRef = useRef(null);
    
    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }

        return () => {
            if (dialog.open) {
                dialog.close();
            }
        };
    }, [isOpen]);

    return (
        <dialog className = "modal" ref={dialogRef}>
            <h1>{title}</h1>
            <p>{message}</p>
            <button onClick={onClose}>close</button>
        </dialog>
    )
}