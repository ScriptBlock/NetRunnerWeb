//        <Netrunners runners={runners} newRunnerClick={newNetrunner} />
import RunnerItem from './RunnerItem'

const Netrunners = (props) => {
    return (
        <div className="panel panel-primary">
            <div className="panel-heading"><span className="panel-title">Netrunners</span><button className="btn btn-warning" onClick={props.newNetrunnerClick}>New</button></div>
            <div className="panel-body">
                { props.runners.map((r) => (
                    <RunnerItem key={r.id} runner={r} onRunnerNameChange={props.onRunnerNameChange}/>
                ))
                }
            </div>
        </div>
    )
}

export default Netrunners
