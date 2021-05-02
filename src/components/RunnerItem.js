//    {"id": 1, "name": "CrashOverride", "interface": 4, "totalSlots": 3, "speed": 4, "damage": 0, "mapid":1, "roomid":1, "discoveredrooms":[], "owner":0}

const RunnerItem = (props) => {
    return (
        <div className="panel panel-success">
        <div className="panel-heading">
        { props.runner.name !== undefined ? 
            <span className="panel-title">{props.runner.name}</span>: <input className="panel-title" onKeyDown={(k) => {
                if(k.key === 'Enter') {
                    props.onRunnerNameChange(k)
                }
            }}></input>

        }
        </div>
        <div className="panel-body">
            <div>Iface: {props.runner.interface} | Speed: {props.runner.speed} </div>
            <div>Damage: {props.runner.damage}</div>
        </div>
    </div>
    )
}

export default RunnerItem
