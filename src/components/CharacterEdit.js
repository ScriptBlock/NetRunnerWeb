/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

import { useRef, useState, useEffect } from 'react'
import CharacterAttribEdit from './CharacterAttribEdit'
import ProgramEditItem from './ProgramEditItem'
import Modal from "react-bootstrap/Modal"


const CharacterEdit = (props) => {
    const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS


    const [thisRunner, setThisRunner] = useState(props.myRunner)
    const [programSlots, setProgramSlots] = useState([])
    const [showInstallModal, setShowInstallModal] = useState(false)
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const programList = useRef([])
    const programToRemove = useRef()

    const dp = {method: "POST", headers: {'Content-Type': 'application/json'} }

    useEffect(() => {
        fetch(`http://${SERVER_ADDRESS}:3000/programs`)
        .then(response => response.json())
        .then(data => {
            programList.current = data
            //console.log("fetched room data")
            //console.log(data)
        })


    }, [])

    useEffect(() => {
//        console.log("updating program count listing")
        let installedProgramCount = props.myRunner.programs.length
        let remainingSlots = props.myRunner.slots - installedProgramCount

        let newSlotList = props.myRunner.programs
 //       console.log("added existing programs")
  //      console.log(newSlotList)
        for(let i=0;i<remainingSlots;i++) {
    //        console.log("pushing in null entry with remaining slots")
            newSlotList.push({"id": (i+5000), "name": null})
        }
        setProgramSlots(newSlotList)

    }, [props.myRunner])

    const doShowInstallModal = () => {
        setShowInstallModal(true)
    }

    const doShowRemoveModal = (id) => {
        setShowRemoveModal(true)
        programToRemove.current = id
    }    

    const changeCharType = (e) => {
        console.log(`Updating runner ${props.ownedCharacter} with new type ${e.target.value}`)
/*
        let newRunners = props.runners.map(r => (
            r.id == props.ownedCharacter ? {...r, type: e.target.value} : r
        ))
        console.log(newRunners)
*/
        setThisRunner({...thisRunner, type: e.target.value})
        fetch(`http://${SERVER_ADDRESS}:3000/netrunner/${props.ownedCharacter}`, {...dp, body: JSON.stringify({type: e.target.value}) })
        .then(response => response.json())
        .then(data => {
            console.log("updated character")
            props.refreshRunners()
            setThisRunner({...thisRunner, type: data.find(r => r.id == props.ownedCharacter).type})

        })    
    }

    const goHome = () => {
        console.log("going hmoe")
        props.setPage("home")
    }

    const removeProgram = (id) => {
        console.log(`removing program ${id} for player`)
        fetch(`http://${SERVER_ADDRESS}:3000/programs/remove/${id}`, {method: "DELETE", headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => {
            console.log("tried to remove program")
            props.refreshRunners()
            setShowRemoveModal(false)
            programToRemove.current = null
        })    
        

    }

    const installProgram = (progName) => {
        console.log(`installing program ${progName} for player`)
        fetch(`http://${SERVER_ADDRESS}:3000/programs/install/${props.ownedCharacter}`, {...dp, body: JSON.stringify({"programName": progName}) })
        .then(response => response.json())
        .then(data => {
            console.log("tried to add program")
            props.refreshRunners()
            setShowInstallModal(false)

        })    
        
    }

    const decreaseAttribute = (attrib) => {
        console.log(`decrease attribute ${attrib}`)
        let newValue = thisRunner[attrib] -= 1
        console.log(newValue)

        let param = {}
        param[attrib] = newValue
        fetch(`http://${SERVER_ADDRESS}:3000/netrunner/${props.ownedCharacter}`, {...dp, body: JSON.stringify(param) })
        .then(response => response.json())
        .then(data => {
            console.log("updated character")
            props.refreshRunners()
            let newRunner = thisRunner
            newRunner[attrib] = newValue
            setThisRunner(newRunner)
        })    

    }


    const increaseAttribute = (attrib) => {
        console.log(`increase attribute ${attrib}`)
        let newValue = thisRunner[attrib] += 1
        console.log(newValue)

        let param = {}
        param[attrib] = newValue
        fetch(`http://${SERVER_ADDRESS}:3000/netrunner/${props.ownedCharacter}`, {...dp, body: JSON.stringify(param) })
        .then(response => response.json())
        .then(data => {
            console.log("updated character")
            props.refreshRunners()
            let newRunner = thisRunner
            newRunner[attrib] = newValue
            setThisRunner(newRunner)
        })    
    }

    return (
        <div className="container bg-secondary" role="main"> 

            <div className="row text-center">
                <div className="col text-center justify-content-center ">
                    <div className="h3 m-2">---[{thisRunner.name}]---</div>
                </div>
            </div>                
            <div className="row">
                <div className="col text-center border bg-secondary"><h3>Character Settings</h3></div>
            </div>

            <div className="row border py-3 bg-light">
                <div className="col">Type (Runner/Nonrunner)</div>
                <div className="col-3">
                    <select name="chartype" onChange={changeCharType} style={{color:"#000"}} value={thisRunner.type}>
                            <option value="Netrunner">Netrunner</option>
                            <option value="Other">Other</option>
                        </select>     
                    </div>
                <div className="col-3">
                    <div>{thisRunner.type}</div>
                </div>
            </div>



            <CharacterAttribEdit attrib="Interface" decreaseAttribute={decreaseAttribute} increaseAttribute={increaseAttribute} thisRunner={thisRunner}/>
            { thisRunner.type == "Netrunner" && (<CharacterAttribEdit attrib="Slots" decreaseAttribute={decreaseAttribute} increaseAttribute={increaseAttribute} thisRunner={thisRunner}/> )}
            <CharacterAttribEdit attrib="Speed" decreaseAttribute={decreaseAttribute} increaseAttribute={increaseAttribute} thisRunner={thisRunner}/>
            <CharacterAttribEdit attrib="Reflex" decreaseAttribute={decreaseAttribute} increaseAttribute={increaseAttribute} thisRunner={thisRunner}/>
            <CharacterAttribEdit attrib="Damage" decreaseAttribute={decreaseAttribute} increaseAttribute={increaseAttribute} thisRunner={thisRunner}/>

            <div className="row">
                <div className="col text-center border bg-secondary"><h3>Programs</h3></div>
            </div>

            <div className="row">
                <div className="col text-center border bg-white">

            {
                programSlots.map(p => (

                  <ProgramEditItem key={p.id} program={p} doShowInstallModal={doShowInstallModal} doShowRemoveModal={doShowRemoveModal}/> 
                ))
            }
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <button onClick={() => (props.setPage("home"))} className="btn btn-primary btn-block py-3 border my-3">Home</button>
                </div>
            </div>

            <Modal id={"AddProgramModal"} show={showInstallModal} onHide={() => {setShowInstallModal(false)}} onClose={() => {setShowInstallModal(false)}}>
                <Modal.Header>
                    <h5 className="modal-title" id="exampleModalLongTitle">Install A Program</h5>
                    <button type="button" className="close" onClick={() => {setShowInstallModal(false)}}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    { 
                        programList.current.map(p => (
                            <div 
                                key={Math.random()} 
                                className="mb-2 p-1 bg-secondary progpicker" 
                                style={{border: "solid .2em black"}}
                                onClick={() => {installProgram(p.name)}}                            
                            >
                                <h4>{p.name}</h4>
                                <hr className="p-0 m-0 bg-warning"/>
                                <span>{p.effect}</span>
                            </div>
                            
                        ))
                        // add program listing here
                    }
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => {setShowInstallModal(false)}}>Close</button>
                </Modal.Footer>
            </Modal>


            <Modal id={"RemoveProgramModal"} show={showRemoveModal} onHide={() => {setShowRemoveModal(false)}} onClose={() => {setShowRemoveModal(false)}}>
                <Modal.Header>
                    <h5 className="modal-title" id="exampleModalLongTitle">Remove This Program</h5>
                    <button type="button" className="close" onClick={() => {setShowRemoveModal(false)}}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <button className="btn btn-block btn-danger" onClick={() => {removeProgram(programToRemove.current)}}>Remove</button>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => {setShowRemoveModal(false)}}>Close</button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default CharacterEdit


/*

            <Modal id={"AddProgramModal"} show={showInstallModal} onHide={() => resetModal()} onClose={() => resetModal()}>
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












<div className="row">
                <div className="col text-center bg-secondary border"><h3>Interface</h3><hr/></div>
            </div>
            <div className="row text-center d-flex justify-content-center py-2 bg-dark text-info">
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (decreaseAttribute("interface"))}>Less</button>
                </div>
                <div className="col-sm-3">
                    <div>Interface</div>
                    <div>{thisRunner.interface}</div>
                </div>
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (increaseAttribute("interface"))}>More</button>
                </div>
            </div>

            <div className="row text-center d-flex justify-content-center py-2 bg-dark text-info">
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (decreaseAttribute("totalSlots"))}>Less</button>
                </div>
                <div className="col-sm-3">
                    <div>Total Slots</div>
                    <div>{thisRunner.totalSlots}</div>
                </div>
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (increaseAttribute("totalSlots"))}>More</button>
                </div>
            </div>

            <div className="row text-center d-flex justify-content-center py-2 bg-dark text-info">
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (decreaseAttribute("speed"))}>Less</button>
                </div>
                <div className="col-sm-3">
                    <div>Speed</div>
                    <div>{thisRunner.speed}</div>
                </div>
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (increaseAttribute("speed"))}>More</button>
                </div>
            </div>

            <div className="row text-center d-flex justify-content-center py-2 bg-dark text-info">
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (decreaseAttribute("damage"))}>Less</button>
                </div>
                <div className="col-sm-3">
                    <div>Damage</div>
                    <div>{thisRunner.damage}</div>
                </div>
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (increaseAttribute("damage"))}>More</button>
                </div>
            </div>



*/