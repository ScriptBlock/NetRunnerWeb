import { useState, useEffect } from 'react'
import MapLayer from './MapLayer'
import MapRoomModal from './MapRoomModal'


const Map = (props) => {
    const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS
    const dp = {method: "POST", headers: {'Content-Type': 'application/json'} }


    const [roomData, setRoomData] = useState([])
    // const [mapContents, setMapContents] = useState([])

    const refreshRoomData = (mapID) => {
        // localhost:3000/room/1?gathercontext=true&ownedCharacter=1        

        fetch(`http://${SERVER_ADDRESS}:3000/room/${mapID}?gathercontext=true&ownedcharacter=${props.ownedCharacter}`)
        .then(response => response.json())
        .then(data => {
            setRoomData(data)
            console.log("fetched room data")
            console.log(data)
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
            case "pathfind": 
                fetch(`http://${SERVER_ADDRESS}:3000/pathfind/${props.ownedCharacter}/${props.activeMap}`, {...dp, body: JSON.stringify({"dv": details.dv, "startingroom": details.startingroom, "maxdepth": details.dv}) })
                .then(response => response.json())
                .then(data => {
                    console.log("did pathfinder action")
                    refreshRoomData(props.activeMap)
                })    
                break
            default:
                console.log("passed invalid modalAction")

        }


    }

    useEffect(() => {
        refreshRoomData(props.activeMap)
    }, [])

    return (
        <div className="container-flex bg-dark">
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary btn-block p-2 m-2" onClick={() => { refreshRoomData(props.activeMap) }}>Refresh</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary btn-block p-2 m-2" onClick={() => { props.jackOut() }}>Jack Out</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary btn-block p-2 m-2" onClick={() => { props.setPage("home") }}>Home</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <ul className="tree d-flex justify-content-center text-light">
                        { 
                            roomData.length > 0 && (
                                <MapLayer key="0" ownedCharacter={props.ownedCharacter} doModalAction={doModalAction} runners={props.runners} rooms={roomData} room={roomData.find(r=>r.sourceroom == undefined)}/>
                            )
                        }
                    </ul>
                </div>
            </div>            

            {
                // roomData.map(r => (
                //     <MapRoomModal key={r.id} room={r} doModalAction={doModalAction}/>
                // ))
            }
        </div>
    )
}

//TODO build modal helpers here.  don't need to respect visibility.  these modals will only be called from visible node clicks

export default Map


/*


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