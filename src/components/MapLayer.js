import { useState, useEffect } from 'react'

const MapLayer = (props) => {
    const [nextRooms, setNextRooms] = useState([])

    // useEffect(() => {

    // }, [nextRooms])

    useEffect(() => {
        setNextRooms(props.rooms.filter(r=> r.sourceroom == props.room.id))
    }, [props.room])


    return (
        <li> 
            <span className="bg-warning p-0"><p className="px-4 my-0 text-dark"><strong>{props.room.name}</strong></p><hr className="m-0 p-0 bg-dark"></hr><p className="p-0 m-0 text-dark">{props.room.name}</p></span>
            { nextRooms.length > 0 && (<ul>
                { nextRooms.length > 0 && nextRooms.map(n=> (
                    <MapLayer key={n.id} rooms={props.rooms} room={n}/>  
                ))}
            </ul>)}
        </li>
    )
}

export default MapLayer
