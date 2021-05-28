const ModalModeButton = (props) => {
    console.log(props)
    return (
        <button className="btn btn-primary m-2" onClick={() => props.setModalMode(props.mode)}>{props.modeName}</button>
    )
}

export default ModalModeButton
