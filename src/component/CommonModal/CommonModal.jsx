import { Modal } from "antd";

const CommonModal = (props) => {
    return (
        <>
            <Modal title={props.title} visible={props.visible} onOk={props.onOk} onCancel={props.onCancel}>
                {props.children}
            </Modal>
        </>
    )
}

export default CommonModal;