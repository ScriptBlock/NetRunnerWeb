
const ExplainModal = (props) => {
    return (
        <div className="modal fade" id={props.data.id} tabIndex="-1" role="dialog"  aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{props.data.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body bg-secondary">
                        { props.data.features.map(f => 
                                (<p key={f.title} className="text-dark"><strong>{f.title}:</strong>{f.description}</p>)
                            )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExplainModal
