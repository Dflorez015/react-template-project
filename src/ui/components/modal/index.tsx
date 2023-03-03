import Modal, { Props } from "react-modal"
import styled from "styled-components";
import { CloseModalbutton } from "./ModalContent";

export const StyleModal = styled(Modal)`
    width: clamp(400px, 35%, 900px);
    padding: 0.5rem 0.8rem;
    position: fixed;
  //  top: 50%;
    left: 50%;
   // transform: translate(-50%, -50%);
    border-radius: 5px;

    /*- custome ------------------------------------ */
    background-color: var(--component_bg);
    box-shadow: var(--shadow);

    /*- modal content ------------------------------------ */
    & .close__modal__button {
        position: absolute;
        right: .5rem;
        height: 1.2rem;
        width: 1.2rem;
        cursor: pointer;
        transition: background-color .2s ease-out;
        border-radius: 50%;
        padding: 2px;

        :hover {
            color: white;
            background-color: crimson;
        }
    }
`

StyleModal.setAppElement('#root');

interface ICustomeModal extends Props {
    closeButton?: boolean
}

export const CustomeModal = (props: ICustomeModal) => {
    const { closeButton, children, ...res } = props

    return (
        <StyleModal {...res} overlayClassName="modal__overlay" closeTimeoutMS={300} >
            {closeButton ? <CloseModalbutton onRequestClose={res.onRequestClose} /> : null}

            {children}
        </StyleModal>
    )
}