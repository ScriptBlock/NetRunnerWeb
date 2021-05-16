import { useState, useEffect } from 'react'
import MapLayer from './MapLayer'



const Map = () => {
    const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS

    const [roomData, setRoomData] = useState([])
    
    useEffect(() => {
        fetch(`http://${SERVER_ADDRESS}:3000/room/1`)
        .then(response => response.json())
        .then(data => {
            // console.log("fetched initiative")
            // console.log(data)
            setRoomData(data)
        })
    }, [])

    return (
        <div className="container-flex bg-dark">
            <div className="row">
                <div className="col">
                    <ul className="tree d-flex justify-content-center text-light">
                        { 
                            roomData.length > 0 && (
                                <MapLayer rooms={roomData} room={roomData.find(r=>r.id == 1)} />
                            )
                        }
                    </ul>
                </div>
            </div>            
        </div>
    )
}

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