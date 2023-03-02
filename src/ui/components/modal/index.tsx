import Modal, { Props } from "react-modal"
import styled from "styled-components";

export const StyleModal = styled(Modal)`
    width: clamp(400px, 35%, 900px);
    padding: 0.5rem 0.8rem;
    position: fixed;
  //  top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

interface ICustomeModal extends Props {
    closeButton?: boolean
}

export const CustomeModal = (props: ICustomeModal) => {
    const { closeButton, children, ...res } = props

    return (
        <StyleModal {...res} overlayClassName="modal__overlay" closeTimeoutMS={200} >
            {closeButton ? <CloseModalbutton onRequestClose={res.onRequestClose} /> : null}

            {children}
        </StyleModal>
    )
}



interface CloseModalType {
    onRequestClose: ((event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void) | undefined
}

const CloseModalbutton = ({ onRequestClose }: CloseModalType) => {
    return (
        <svg className="close__modal__button" stroke="currentColor"
            fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em"
            xmlns="http://www.w3.org/2000/svg" onClick={onRequestClose}>
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z">
            </path>
        </svg>
    )
}