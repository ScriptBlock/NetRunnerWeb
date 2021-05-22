
const MapRoomModal = (props) => {

    //TODO add useeffect here to pick the buttons or whatever


    return (
        <div className="modal fade" id={"modal"+props.room.id} tabIndex="-1" role="dialog"  aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Room Actions ({props.room.name})</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body bg-secondary">
                        <button className="btn btn-primary">Pathfind</button>
                        <button className="btn btn-primary">Backdoor</button>
                        <button className="btn btn-primary">Enter Password</button>
                        <button className="btn btn-primary">Leave Virus</button>
                        <button className="btn btn-primary">Control</button>
                        <button className="btn btn-primary">Cloak</button>
                        <button className="btn btn-primary">Scanner</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapRoomModal
