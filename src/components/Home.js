
const Home = (props) => {
    let me = props.runners.find(r=>r.id===props.ownedCharacter)

    return (
        <div className="container va11-theme mt-2" role="main">

            <div className="page-header">
                <h1>Player Actions for {me.name}</h1>
                <table className="table">
                    <thead>
                        <tr style={{backgroundColor:"#fff", color:"#000"}}>
                            <td>Interface</td>
                            <td>Slots</td>
                            <td>Speed</td>
                            <td>Damage</td>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor:"#00f", color:"#fff"}}>
                        <tr>
                            <td>{me.interface}</td>
                            <td>{me.totalSlots}</td>
                            <td>{me.speed}</td>
                            <td>{me.damage}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="list-group">
                        <a href="/init" className="list-group-item">
                            <h4 className="list-group-item-heading">Initiative Listing</h4>
                            <p className="list-group-item-text">Go to the initiative screen</p>
                        </a>
                        <button className="list-group-item" onClick={() => props.setPage("settings")}>
                            <h4 className="list-group-item-heading">Change My Settings</h4>
                            <p className="list-group-item-text">Change your character options</p>
                        </button>
                        <button className="list-group-item" onClick={() => props.releaseCharacter(props.ownedCharacter)}>
                            <h4 className="list-group-item-heading">Release ownership of this character</h4>
                            <p className="list-group-item-text">Go back to the character selection screen</p>
                        </button>
                    </div>
                </div>
            </div>     
        </div>
    )
}

export default Home
