
const InitItem = (props) => {
    /*
    return (
        <button key={props.id} className="list-group-item" onClick={props.onClick}>
            Name: {props.data.name} | Type: {props.data.type}
        </button>
        )

        <div className="panel panel-primary">
            <div className="panel-heading"><h3 className="panel-title">Initiative Members</h3></div>
            <div className="panel-body">
                { buttonData.map((b) => (
                    <InitItem key={b.id} data={b} onClick={props.onClick} />
                ))
                }
            </div>
        </div>

    */
   return (
   <div className="panel panel-success">
        <div className="panel-heading"><span className="panel-title">{props.data.name}</span></div>
        <div className="panel-body">
            <div>Init: {props.data.order} | Type: {props.data.type} </div>
            <div>Damage: {props.data.damage !== undefined ? props.data.damage : "N/A"}</div>
        </div>
    </div>

   )
}

export default InitItem
