import { useState, useEffect } from 'react'

const MapLayer = (props) => {
    const [nextRooms, setNextRooms] = useState([])

    // useEffect(() => {

    // }, [nextRooms])

    useEffect(() => {
        console.log("re-rendering maplayer because props.room changed")

        // let proposedNextRooms = props.rooms.filter(r=> r.sourceroom == props.room.id).filter(r => props.runners.find(nr => nr.id == props.ownedCharacter).discoveredrooms.includes(r.id))

        // console.log("proposed next rooms")
        // console.log(proposedNextRooms)
        // setNextRooms(proposedNextRooms)

        setNextRooms(props.rooms.filter(r => r.sourceroom == props.room.id))
    }, [props.room])



    return (
        <li> 
            <span  data-toggle="modal" data-target={"#modal"+props.room.id} className="bg-warning p-0"><p className="px-4 my-0 text-dark"><strong>{props.room.name}</strong></p><hr className="m-0 p-0 bg-dark"></hr><p className="p-0 m-0 text-dark">{props.room.contents != undefined ? props.room.contents.type : "Empty"}</p></span>
            { nextRooms.length > 0 && (<ul>
                { nextRooms.length > 0 && nextRooms.map(n=> (
                    // <MapLayer key="1" rooms={roomData} room={roomData.find(r=>r.sourceroom == undefined)} mapContents={mapContents} roomContents={mapContents.find(c => c.roomid == roomData.find(r=>r.sourceroom==undefined).id)}/>
                    <MapLayer key={n.id} ownedCharacter={props.ownedCharacter} runners={props.runners} rooms={props.rooms} room={n}/>  
                ))}
            </ul>)}
        </li>
    )
}

export default MapLayer
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
