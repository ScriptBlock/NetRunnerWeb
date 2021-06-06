import { useRef, useState, useEffect } from 'react'
import MapRoomModal from './MapRoomModal'

const MapLayer = (props) => {
    const [nextRooms, setNextRooms] = useState([])
    const [showModal, setShowModal] = useState(false)
    const roomSpan = useRef()
    const renderModal = useRef(false)
    const distanceFromRunner = useRef(0)

    // useEffect(() => {

    // }, [nextRooms])

    const setModalVisibility = (status) => {
        //console.log(`showing modal ${status}`)
        setShowModal(status)
    }

    useEffect(() => {
        // console.log("re-rendering maplayer because props.room changed")

        let currentRunner = props.runners.find(r => r.id == props.ownedCharacter)
        let runnerRoom = props.rooms.find(r => r.id == currentRunner.roomid && r.mapid == currentRunner.mapid)

        if(props.room.id == currentRunner.roomid && props.room.mapid == currentRunner.mapid) {
            // console.log("plotting a room that has this netrunner in it.. setting a border")
            roomSpan.current.style.border = "solid .2em #fff"
            roomSpan.current.addEventListener('click', () => setModalVisibility(true))
            distanceFromRunner.current = 0
            renderModal.current = true
        } else {
            //default behavior - not renderable            
            roomSpan.current.style.border = "solid .2em #000"
            renderModal.current = false
            
            //if the room is "above", make it linkable
            if(props.room.id == runnerRoom.sourceroom) {
                distanceFromRunner.current = 1
                roomSpan.current.style.border = "solid .2em #00f"
                roomSpan.current.addEventListener('click', () => setModalVisibility(true))
                renderModal.current = true
            } else if(props.room.sourceroom == runnerRoom.id) { //if room is "below" check to see if we can move there
                distanceFromRunner.current = 1
                
                if(runnerRoom.roomopen == null || runnerRoom.roomopen) {
                    //if this room is open, go ahead and render the click for the room below
                    roomSpan.current.style.border = "solid .2em #00f"
                    roomSpan.current.addEventListener('click', () => setModalVisibility(true))
                    renderModal.current = true
                }
            } else {
                //every other case.. do nothing here really
            }
        }
        // let proposedNextRooms = props.rooms.filter(r=> r.sourceroom == props.room.id).filter(r => props.runners.find(nr => nr.id == props.ownedCharacter).discoveredrooms.includes(r.id))

        // console.log("proposed next rooms")
        // console.log(proposedNextRooms)
        // setNextRooms(proposedNextRooms)

        setNextRooms(props.rooms.filter(r => r.sourceroom == props.room.id))
    }, [props.room, props.runners])


// <MapLayer key="0" ownedCharacter={props.ownedCharacter} runners={props.runners} rooms={roomData} room={roomData.find(r=>r.sourceroom == undefined)}/>
//<span className="bg-warning p-0" ref={roomSpan} onClick={() => setModalVisibility(true)}><p className="px-4 my-0 text-dark"><strong>{props.room.name}</strong></p><hr className="m-0 p-0 bg-dark"></hr><p className="p-0 m-0 text-dark">{props.room.contents != undefined ? props.room.contents.type : "Empty"}</p></span>

    return (
        <li> 
            <span className="bg-warning p-0" ref={roomSpan}><p className="px-4 my-0 text-dark"><strong>{props.room.name}</strong></p><hr className="m-0 p-0 bg-dark"></hr><p className="p-0 m-0 text-dark">{props.room.contents != undefined ? props.room.contents.type : "Empty"}</p></span>
            { nextRooms.length > 0 && (<ul>
                { nextRooms.length > 0 && nextRooms.map(n=> (
                    // <MapLayer key="1" rooms={roomData} room={roomData.find(r=>r.sourceroom == undefined)} mapContents={mapContents} roomContents={mapContents.find(c => c.roomid == roomData.find(r=>r.sourceroom==undefined).id)}/>
                    <MapLayer key={n.id} doModalAction={props.doModalAction} ownedCharacter={props.ownedCharacter} runners={props.runners} rooms={props.rooms} room={n}/>  
                ))}
            </ul>)}
            {renderModal.current && <MapRoomModal key={props.room.id} room={props.room} rooms={props.rooms} showModal={showModal} setModalVisibility={setModalVisibility} doModalAction={props.doModalAction} distanceFromRunner={distanceFromRunner.current}/> }
        </li>
    )
}

export default MapLayer
// doModalAction={doModalAction}/>
// return (
//     <li data-toggle="modal" data-target={"#modal"+props.room.id}> 
//         <span className="bg-warning p-0"><p className="px-4 my-0 text-dark"><strong>{props.room.name}</strong></p><hr className="m-0 p-0 bg-dark"></hr><p className="p-0 m-0 text-dark">{props.room.contents != undefined ? props.room.contents.type : "Empty"}</p></span>
//         { nextRooms.length > 0 && (<ul>
//             { nextRooms.length > 0 && nextRooms.map(n=> (
//                 // <MapLayer key="1" rooms={roomData} room={roomData.find(r=>r.sourceroom == undefined)} mapContents={mapContents} roomContents={mapContents.find(c => c.roomid == roomData.find(r=>r.sourceroom==undefined).id)}/>
//                 <MapLayer key={n.id} ownedCharacter={props.ownedCharacter} runners={props.runners} rooms={props.rooms} room={n}/>  
//             ))}
//         </ul>)}
//     </li>
// )
