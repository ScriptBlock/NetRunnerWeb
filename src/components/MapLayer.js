/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */


import { useRef, useState, useEffect } from 'react'
import MapRoomModal from './MapRoomModal'

const MapLayer = (props) => {
    const [nextRooms, setNextRooms] = useState([])
    const [showModal, setShowModal] = useState(false)
    const roomSpan = useRef()
    const finalRoomContent = useRef()
    const renderModal = useRef(false)
    const distanceFromRunner = useRef(0)

    // useEffect(() => {

    // }, [nextRooms])

    const setModalVisibility = (status) => {
        //console.log(`showing modal ${status}`)
        setShowModal(status)
    }

    const doSetModalVisibility = () => {
    //    console.log("someone clicked meeeeee")
        if(renderModal.current) {
            // console.log("modal is renderable... showing")
            setModalVisibility(true)
        } else {
            // console.log("modal is not renderable, not showing")
        }
    }

    useEffect(() => {
        // console.log("re-rendering maplayer because props.room changed")
        // console.log("setting currentRunner")
        let currentRunner = props.runners.find(r => r.id == props.ownedCharacter)
        // console.log(currentRunner)
        let runnerRoom = props.rooms.find(r => r.id == currentRunner.roomid && r.mapid == currentRunner.mapid)
        let finalClass = "bg-secondary "
        finalRoomContent.current = "Empty"
        // console.log(`rendering room ${props.room.name}`)

        
        if(props.room.contents != undefined) {
            finalClass = "text-warning"
            if(props.room.contents.type == "password") {
                if(props.room.roomopen) {
                    finalClass = "bg-primary "
                    finalRoomContent.current = "Bypassed"

                } else {
                    finalClass = "bg-dark text-danger"
                    finalRoomContent.current = "Locked"
                }

            }

            if(props.room.contents.type == "file") {
                if(currentRunner.ids.includes(props.room.contents.id)) {
                    finalClass = "text-warning"
                    finalRoomContent.current = props.room.contents.details
                } else {
                    finalClass = "text-light"
                    finalRoomContent.current = "File (NO ID)"
                }
            }

        }

        roomSpan.current.className = finalClass
                
        if(props.room.id == currentRunner.roomid && props.room.mapid == currentRunner.mapid) {
            //this is the room the player is in
            roomSpan.current.style.border = "dashed .3em yellow"
            distanceFromRunner.current = 0
            renderModal.current = true
        } else {
            roomSpan.current.style.border = "solid .2em #00f"
            distanceFromRunner.current = 1

            if(props.room.id == runnerRoom.sourceroom) {
                //this room is 1 up from current
                renderModal.current = true
            } else if(props.room.sourceroom == runnerRoom.id) { //if room is "below" check to see if we can move there                
                if(runnerRoom.roomopen == null || runnerRoom.roomopen) {
                    //this room is 1 room down and accessable
                    renderModal.current = true
                } else {
                    //this room is 1 room down, but inaccessable
                }
            } else {
                //this room is further away than 1 room
                distanceFromRunner.current = 2
                roomSpan.current.style.border = ""
                renderModal.current = false
                
            }
        }

        setNextRooms(props.rooms.filter(r => r.sourceroom == props.room.id))
    }, [props.room, props.runners])


// <MapLayer key="0" ownedCharacter={props.ownedCharacter} runners={props.runners} rooms={roomData} room={roomData.find(r=>r.sourceroom == undefined)}/>
//<span className="bg-warning p-0" ref={roomSpan} onClick={() => setModalVisibility(true)}><p className="px-4 my-0 text-dark"><strong>{props.room.name}</strong></p><hr className="m-0 p-0 bg-dark"></hr><p className="p-0 m-0 text-dark">{props.room.contents != undefined ? props.room.contents.type : "Empty"}</p></span>

    return (
        <li> 
            <span className="p-0" ref={roomSpan} onClick={doSetModalVisibility} >
                <p className="px-4 my-0">
                    <strong>{props.room.name}</strong>
                </p>
                <hr className="m-0 p-0 bg-light"></hr>
                <p className="p-0 m-0">
                    {finalRoomContent.current}
                    {/* {props.room.contents != undefined ? props.room.contents.type : "Empty"} */}
                </p>
            </span>
            { nextRooms.length > 0 && (<ul>
                { nextRooms.length > 0 && nextRooms.map(n=> (
                    // <MapLayer key="1" rooms={roomData} room={roomData.find(r=>r.sourceroom == undefined)} mapContents={mapContents} roomContents={mapContents.find(c => c.roomid == roomData.find(r=>r.sourceroom==undefined).id)}/>
                    <MapLayer key={n.id} doModalAction={props.doModalAction} ownedCharacter={props.ownedCharacter} runners={props.runners} rooms={props.rooms} room={n}/>  
                ))}
            </ul>)}
            <MapRoomModal key={props.room.id} room={props.room} rooms={props.rooms} showModal={showModal} setModalVisibility={setModalVisibility} doModalAction={props.doModalAction} distanceFromRunner={distanceFromRunner.current} runner={props.runners.find(r => r.id == props.ownedCharacter)}/>
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


        /*

        if(props.room.id == currentRunner.roomid && props.room.mapid == currentRunner.mapid) {
            console.log(props.room)
            // console.log("plotting a room that has this netrunner in it")
            if(runnerRoom.roomopen) {
                console.log("runnerroom is open, setting background to green")
                roomSpan.current.style.backgroundColor = "green"
            } else {
                if(!runnerRoom) {
                    console.log("well, it was set to red")
                    roomSpan.current.style.backgroundColor = "lightred"
                } else {
                    roomSpan.current.style.backgroundColor = "blue"
                }
            }
            roomSpan.current.style.color = "black"
            roomSpan.current.style.border = "solid .2em #fff"
            roomSpan.current.addEventListener('click', () => setModalVisibility(true))
            distanceFromRunner.current = 0
            renderModal.current = true
        } else {
            //default behavior - not renderable            
            roomSpan.current.style.border = "solid .2em #000"
            renderModal.current = false
            roomSpan.current.style.color = "black"

            
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
                    roomSpan.current.style.backgroundColor = "lightblue"
                    roomSpan.current.style.color = "black"
                    
                    roomSpan.current.addEventListener('click', () => setModalVisibility(true))
                    renderModal.current = true
                }
            } else {
                roomSpan.current.style.backgroundColor = "grey"

                //every other case.. do nothing here really
            }
        }
        */