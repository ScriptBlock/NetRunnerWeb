/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

import { useEffect, useState, useRef } from 'react'
import Modal from "react-bootstrap/Modal";
import ModalModeButton from './ModalModeButton'

const MapRoomModal = (props) => {

    const [modalPanel, setModalPanel] = useState(null)
    const enteredDC = useRef()
    const enteredPWD = useRef()
    const [modalMode, setModalMode] = useState("buttons")

/*
var abilities = [
    "Scanner",
    "Backdoor",
    "Cloak",
    "Control",
    "Eye-Dee",
    "Pathfinder",
    "Slide",
    "Virus",
    "Zap",
    "Password"
]
*/

    useEffect(() => {
        let retVal = null
        if(modalMode == "buttons") {
            if(props.distanceFromRunner > 0) {
                retVal = <>
                            <button className="btn btn-primary btn-block" onClick={() => { resetModal(); props.doModalAction({"modalAction":"move", "targetroom":props.room.id})}}>Move Here</button>
                        </>
            } else {
                console.log(props.runner)
                let showMoveDown = false
                if(props.room.hasexits != null && props.room.hasexits == true) {
                    showMoveDown = true
                    if(props.room.contents != null && props.room.contents.type == "password" && props.room.roomopen == false) {
                        showMoveDown = false
                    }
                    if(props.rooms.filter(r => r.sourceroom == props.room.id).length > 0)  {
                        showMoveDown = false
                    }
                }

                retVal = <>
                        <ModalModeButton mode="pathfind" modeName="Pathfinder" setModalMode={setModalMode}/>
                        {props.room.contents != null && props.room.contents.type == "password" && props.room.roomopen != true && <ModalModeButton mode="backdoor" modeName="Backdoor" setModalMode={setModalMode}/>}
                        {props.room.contents != null && props.room.contents.type == "password" && props.room.roomopen != true && <ModalModeButton mode="password" modeName="Enter Password" setModalMode={setModalMode}/>}
                        {props.room.contents != null && props.room.contents.type == "file" && !props.runner.ids.includes(props.room.contents.id) && <ModalModeButton mode="eyedee" modeName="Eye Dee File" setModalMode={setModalMode}/>}
                        {showMoveDown && <ModalModeButton mode="movedown" modeName="Move Down" setModalMode={setModalMode}/>}
                    </>
            }
        } else {
            if(modalMode == "movedown") {
                props.doModalAction({"modalAction": modalMode, "fromroom": props.room.id})
                resetModal()
            }
            if(modalMode == "pathfind") {
                retVal = (
                    <>
                        <form onSubmit={(f) => {f.preventDefault()}}>
                            <div className="form-group">
                                <label htmlFor="dc">Rolled DC</label>
                                <input className="form-control input" type="text" name="dc" id="dc" onChange={(e) => enteredDC.current = e.target.value}></input>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                props.doModalAction({"dv":enteredDC.current, "modalAction": modalMode, "startingroom": props.room.id})
                                resetModal()
                            }}>Execute</button>
                        </form>                        
                    </>
                )
            }

            if(modalMode == "backdoor") {
                retVal = (
                    <>
                        <form onSubmit={(f) => {f.preventDefault()}}>
                            <div className="form-group">
                                <label htmlFor="dc">Rolled DC</label>
                                <input className="form-control input" type="text" name="dc" id="dc" onChange={(e) => enteredDC.current = e.target.value}></input>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={(e) => {
                                e.preventDefault()
                                console.log(`submitting backdoor modal action ${props.room.id}`)
                                props.doModalAction({"dv":enteredDC.current, "modalAction": modalMode, "roomid": props.room.id})
                                resetModal()
                            }}>Execute</button>
                        </form>                        
                    </>
                )
            }

            if(modalMode == "password") {
                retVal = (
                    <>
                        <form onSubmit={(f) => {f.preventDefault()}}>
                            <div className="form-group">
                                <label htmlFor="pwd">Enter the password</label>
                                <input className="form-control input" type="text" name="pwd" id="pwd" onChange={(e) => enteredPWD.current = e.target.value}></input>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={(e) => {
                                e.preventDefault()
                                console.log(`submitting password for room  ${props.room.id}`)
                                props.doModalAction({"pwd":enteredPWD.current, "modalAction": modalMode, "roomid": props.room.id})
                                resetModal()
                            }}>Execute</button>
                        </form>                        
                    </>
                )
            }

            if(modalMode == "eyedee") {
                retVal = (
                    <>
                        <form onSubmit={(f) => {f.preventDefault()}}>
                            <div className="form-group">
                                <label htmlFor="dc">Rolled DC for EyeDee</label>
                                <input className="form-control input" type="text" name="dc" id="dc" onChange={(e) => enteredDC.current = e.target.value}></input>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={(e) => {
                                e.preventDefault()
                                console.log(`submitting eyedee modal action ${props.room.id}`)
                                props.doModalAction({"dv":enteredDC.current, "modalAction": modalMode, "roomid": props.room.id})
                                resetModal()
                            }}>Execute</button>
                        </form>                        
                    </>
                )
            }

        }

        setModalPanel(retVal)
        // return () => {
        //     cleanup
        // }
    }, [props.room, modalMode, props.distanceFromRunner, props.runner])

    const resetModal = () => {
        console.log("resetting modal")
        setModalMode("buttons")
        props.setModalVisibility(false)
    }

    return (
        <Modal id={"modal"+props.room.id} show={props.showModal} onHide={() => resetModal()} onClose={() => resetModal()}>
            <Modal.Header>
                <h5 className="modal-title" id="exampleModalLongTitle">Room Actions ({props.room.name})</h5>
                <button type="button" className="close" onClick={() => resetModal()}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                { modalPanel }
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={() => resetModal()}>Close</button>
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
