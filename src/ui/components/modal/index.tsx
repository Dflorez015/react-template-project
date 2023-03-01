import Modal, { Props } from "react-modal"
import styled from "styled-components";

const StyleModal = styled(Modal)`
    width: clamp(400px, 35%, 900px);
    background-color: var(--component_bg);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 11px;
    box-shadow: var(--shadow);
`

StyleModal.setAppElement('#root');

export const CustomeModal = (props: Props) => {
    const { isOpen } = props
    return (
        isOpen ? <StyleModal {...props} overlayClassName="modal__overlay"/> : null
    )
}
