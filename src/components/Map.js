/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */


import { useState, useEffect } from 'react'

import MapLayer from './MapLayer'
import ProgramItem from './ProgramItem'
// import MapRoomModal from './MapRoomModal'


const Map = (props) => {
    const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS
    const dp = {method: "POST", headers: {'Content-Type': 'application/json'} }


    const [roomData, setRoomData] = useState([])
    const [activeMap, setActiveMap] = useState(-1)
    // const [mapContents, setMapContents] = useState([])

    const refreshRoomData = (mapID) => {
        console.log(`refreshing room data for ${mapID}`)
        // localhost:3000/room/1?gathercontext=true&ownedCharacter=1        

        fetch(`http://${SERVER_ADDRESS}:3000/room/${mapID}?gathercontext=true&ownedcharacter=${props.ownedCharacter}`)
        .then(response => response.json())
        .then(data => {
            setRoomData(data)
            //console.log("fetched room data")
            //console.log(data)
        })

        // fetch(`http://${SERVER_ADDRESS}:3000/mapcontents/${mapID}`)
        // .then(response => response.json())
        // .then(data => {
        //     setMapContents(data)
        // })

    }

    const doModalAction = (details) => {
        // alert(`modal action clicked ${modalAction} with a rollDC of ${rolledDC}`)
        console.log(details)
        switch(details.modalAction) {
            case "control": 
                // app.post("/action/id/:netrunnerid", (req, res, next) => {
                fetch(`http://${SERVER_ADDRESS}:3000/action/control/${props.ownedCharacter}`, {...dp, body: JSON.stringify({"dv": details.dv, "roomid": details.roomid}) })
                .then(response => response.json())
                .then(data => {
                    console.log("control action")
                    refreshRoomData(activeMap)
                })    
                break

            case "eyedee": 
                // app.post("/action/id/:netrunnerid", (req, res, next) => {
                fetch(`http://${SERVER_ADDRESS}:3000/action/id/${props.ownedCharacter}`, {...dp, body: JSON.stringify({"dv": details.dv, "roomid": details.roomid}) })
                .then(response => response.json())
                .then(data => {
                    console.log("eyedee action")
                    refreshRoomData(activeMap)
                })    
                break

            case "backdoor": 
                fetch(`http://${SERVER_ADDRESS}:3000/backdoor/${details.roomid}/${props.ownedCharacter}`, {...dp, body: JSON.stringify({"dv": details.dv}) })
                .then(response => response.json())
                .then(data => {
                    console.log("backdoor action")
                    refreshRoomData(activeMap)
                })    
                break
            
            case "password": 
                fetch(`http://${SERVER_ADDRESS}:3000/enterpassword/${details.roomid}/${props.ownedCharacter}`, {...dp, body: JSON.stringify({"pwd": details.pwd}) })
                .then(response => response.json())
                .then(data => {
                    console.log("password action")
                    refreshRoomData(activeMap)
                })    
                break

            case "pathfind": 
                fetch(`http://${SERVER_ADDRESS}:3000/pathfind/${props.ownedCharacter}/${activeMap}`, {...dp, body: JSON.stringify({"dv": details.dv, "startingroom": details.startingroom, "maxdepth": details.dv}) })
                .then(response => response.json())
                .then(data => {
                    console.log("did pathfinder action")
                    refreshRoomData(activeMap)
                })    
                break
            case "move":
                fetch(`http://${SERVER_ADDRESS}:3000/netrunner/${props.ownedCharacter}/move/${details.targetroom}`, {...dp })
                .then(response => response.json())
                .then(data => {
                    console.log("tried to move the netrunner to the target room")
                    refreshRoomData(activeMap)
                })    
                break

            case "movedown":
                console.log("moving down into some possible next room")
                fetch(`http://${SERVER_ADDRESS}:3000/netrunner/${props.ownedCharacter}/movedown`, {...dp })
                .then(response => response.json())
                .then(data => {
                    console.log("tried to move the netrunner to the target room")
                    refreshRoomData(activeMap)
                })    
                break

            default:
                console.log("passed invalid modalAction")

        }
        // refreshRoomData(activeMap)


    }

    useEffect(() => {
        setActiveMap(props.runners.find(r=> r.id == props.ownedCharacter).mapid)
    }, props.runners)

    useEffect(() => {
        refreshRoomData(props.runners.find(r=> r.id == props.ownedCharacter).mapid)
    }, [])

    const buildPrograms = () => {
        let progs = []
        let runnerProgs = props.runners.find(r => r.id == props.ownedCharacter).programs
        // for(var i=0;i<props.runners.fine(r => r.id == props.ownedCharacter).programs.length;i++) {
        //     progs.push(<MapProgramListing key={i} item={i}></MapProgramListing>)
        // }
        runnerProgs.forEach((p,i)=>{
            progs.push(<ProgramItem key={i} program={p}></ProgramItem>)
        })

        
        return progs
    }

    return (
        <div className="container-flex bg-dark pb-5">
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary btn-block p-2 m-2" onClick={() => { refreshRoomData(activeMap) }}>Refresh</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary btn-block p-2 m-2" onClick={() => { props.jackOut() }}>Jack Out</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary btn-block p-2 m-2" onClick={() => { props.setPage("home") }}>Home</button>
                </div>
            </div>
            <hr className="bg-white"></hr>
            <div className="row d-block overflow-auto" style={{height: 400}}>
                <div className="col">
                    <ul className="h-25 tree d-flex justify-content-center text-light">
                        { 
                            roomData.length > 0 && (
                                <MapLayer key="0" ownedCharacter={props.ownedCharacter} doModalAction={doModalAction} runners={props.runners} rooms={roomData} room={roomData.find(r=>r.sourceroom == undefined)}/>
                            )
                        }
                    </ul>
                </div>
            </div>            

            <hr className="bg-white"/>
            <div className="row m-2">
                <div className="col m-1 p-0">
                        <div className="card-columns" style={{columnCount:3}}>
                        { buildPrograms() 
                        }
                        </div>
                </div>
            </div>
        </div>
    )
}


export default Map


/*
            <MapProgramListing programs={props.runners.find(r => r.id == props.ownedCharacter).programs} />


            {
                // roomData.map(r => (
                //     <MapRoomModal key={r.id} room={r} doModalAction={doModalAction}/>
                // ))
            }

        <div className="container-flex bg-dark">
            <div className="row">
                <div className="col">
                    <ul className="tree d-flex justify-content-center text-light">
                        <li> 
                            <span className="bg-secondary p-3">Entrypoint</span>
                            <ul>
                                <li> 
                                    <span className="bg-warning p-0"><p className="px-2 my-0 text-dark"><strong>Control Point</strong></p><hr className="m-0 p-0 bg-dark"></hr><p className="p-0 m-0 text-dark">Turret</p></span>
                                    <ul>
                                        <li> 
                                            <span className="bg-danger p-0"><p className="px-2 my-0 text-dark"><strong>Black ICE</strong></p><hr className="m-0 p-0 bg-dark"></hr><p className="p-0 m-0 text-dark">Smasher</p></span>
                                            <ul>
                                                <li>
                                                    <span className="bg-dark text-info">L4R1</span>
                                                    <ul>
                                                        <li>
                                                            <span>L5R1</span>
                                                            <ul>
                                                                <li>
                                                                    <span>L6R1</span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li> 
                                    <span className="bg-success">Password<hr className="m-0 p-0 bg-dark"></hr>Cracked</span>
                                    <ul>
                                        <li> 
                                            <span className="bg-danger">Black ICE<hr className="m-0 p-0 bg-dark"></hr>Wipeout</span>
                                            <ul>
                                                <li>
                                                    <span>L4R2</span>
                                                    <ul>
                                                        <li>
                                                            <span>L5R2</span>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>            
        </div>


*/