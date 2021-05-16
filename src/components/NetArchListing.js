import { useState, useEffect } from 'react'

const NetArchListing = (props) => {

    const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS

    const [mapData, setMapData] = useState([])

    const refreshMapData = () => {
        console.log("refreshing maps")
        fetch(`http://${SERVER_ADDRESS}:3000/maps?playerID=${props.playerID}`)
        .then(response => response.json())
        .then(data => {
            setMapData(data)
        })

    }

    useEffect(() => {
        refreshMapData()
    }, [])

    return (
        <div className="container justify-content-center text-center" role="main">
            <h2 className="bg-dark text-info py-3">Available Net Architectures</h2>
            <div className="row">
                <div className="col">
                    <div className="list-group">
                        { mapData.map((m) => (
                            <button key={m.id} className="list-group-item btn bg-dark text-info my-1" onClick={() => props.jackIn(m.id)}>
                                <h4 className="list-group-item-heading">{m.name}</h4>
                                <p className="list-group-item-text">{m.description}</p>
                            </button>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NetArchListing
