import { useEffect, useState, useRef } from 'react'
import Modal from "react-bootstrap/Modal";


const MapRoomModal = (props) => {

    const [modalPanel, setModalPanel] = useState(null)
    const enteredDC = useRef()
    const [modalMode, setModalMode] = useState("buttons")

    useEffect(() => {
        let retVal = null
        if(modalMode == "buttons") {
            let pfb = <button className="btn btn-primary" onClick={() => setModalMode("pathfind")}>Pathfinder</button>        
            let bdb = <button className="btn btn-primary" onClick={() => setModalMode("backdoor")}>Backdoor</button>        

            retVal = <>{pfb}{props.room.contents != null && props.room.contents.type == "password" && bdb}</>
        } else {
            if(modalMode == "pathfind") {
                retVal = (
                    <>
                        <input type="text" name="dc" id="dc" className="input" onChange={(e) => enteredDC.current = e.target.value}></input>
                        <button className="btn btn-primary" onClick={() => props.doModalAction(enteredDC.current, modalMode)}>Execute</button>
                    </>
                )
            }
        }
        setModalPanel(retVal)
        // return () => {
        //     cleanup
        // }
    }, [props.room, modalMode])

    const resetModal = () => {
        setModalMode("buttons")
        props.setModalVisibility(false)
    }

    return (
        <Modal id={"modal"+props.room.id} show={props.showModal} onHide={() => resetModal()}>
            <Modal.Header>
                <h5 className="modal-title" id="exampleModalLongTitle">Room Actions ({props.room.name})</h5>
                <button type="button" className="close" onClick={() => props.setModalVisibility(false)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                { modalPanel }
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={() => props.setModalVisibility(false)}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}
// return (
//     <div className="modal fade" id={"modal"+props.room.id} tabIndex="-1" role="dialog"  aria-hidden="true" ref={modalRef} onHide={() => alert('close!')}>
//         <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h5 className="modal-title" id="exampleModalLongTitle">Room Actions ({props.room.name})</h5>
//                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                     </button>
//                 </div>
//                 <div className="modal-body bg-secondary">
//                     { modalPanel
//                     /* <button className="btn btn-primary">Pathfind</button>
//                     <button className="btn btn-primary">Backdoor</button>
//                     <button className="btn btn-primary">Enter Password</button>
//                     <button className="btn btn-primary">Leave Virus</button>
//                     <button className="btn btn-primary">Control</button>
//                     <button className="btn btn-primary">Cloak</button>
//                     <button className="btn btn-primary">Scanner</button> */}
//                 </div>
//                 <div className="modal-footer">
//                     <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// )

export default MapRoomModal
