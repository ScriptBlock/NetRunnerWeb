

const Initiative = (props) => {



    return (
        <div className="panel-primary">
            <div className="panel-heading">Initiative Members</div>
            <div className="panel-body">
                <div className="list-group">
                    { props.init.map((i) => (
                        <a href="#" key={i.id} className="list-group-item" onClick={props.onClick}>{i.name}</a>
                    ))
                    }
                </div>
            </div>

        </div>
            
        
    )
}

export default Initiative
