
const Home = (props) => {
    let me = props.runners.find(r=>r.id===props.ownedCharacter)

    //console.log("in home render... ")
    //console.log(props.ownedCharacter)

    return (
        <div className="container" role="main">
            <h1>Player Actions for {me.name}</h1>

            <div className="row border text-center mt-5 text-light bg-dark">
                <div className="col">
                    <p>Interface</p>
                </div>
                <div className="col">
                    <p>Slots</p>
                </div>
                <div className="col">
                    <p>Reflex</p>
                </div>
                <div className="col">
                    <p>Speed</p>
                </div>
                <div className="col">
                    <p>Damage</p>
                </div>
            </div>


            <div className="row border text-center bg-info mb-5">
                <div className="col">
                    <p>{me.interface}</p>
                </div>
                <div className="col">
                    <p>{me.slots}</p>
                </div>
                <div className="col">
                    <p>{me.speed}</p>
                </div>
                <div className="col">
                    <p>{me.reflex}</p>
                </div>
                <div className="col">
                    <p>{me.damage}</p>
                </div>
            </div>

            <div className="row">
                <div className="col justify-content-center text-center">
                    <div className="list-group">
                        <button className="list-group-item bg-dark text-info my-1" onClick={() => props.setPage("init")}>
                            <h4 className="list-group-item-heading">Initiative Listing</h4>
                            <p className="list-group-item-text">Go to the initiative screen</p>
                        </button>
                        <button className="list-group-item bg-dark text-info my-1" onClick={() => props.setPage("settings")}>
                            <h4 className="list-group-item-heading">Change My Settings</h4>
                            <p className="list-group-item-text">Change your character options</p>
                        </button>
                        <button className="list-group-item bg-dark text-info my-1" onClick={() => props.releaseCharacter(props.ownedCharacter)}>
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
