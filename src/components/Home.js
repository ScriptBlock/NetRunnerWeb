
const Home = (props) => {
    return (
        <div className="container va11-theme mt-2" role="main">

            <div className="page-header">
                <h1>Player Actions for {props.runners.find(r=>r.id===props.ownedCharacter).name}</h1>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="list-group">
                        <a href="/init" className="list-group-item">
                            <h4 className="list-group-item-heading">Initiative Listing</h4>
                            <p className="list-group-item-text">Go to the initiative screen</p>
                        </a>
                        <a href="#" className="list-group-item">
                            <h4 className="list-group-item-heading">Change My Settings</h4>
                            <p className="list-group-item-text">Change your character options</p>
                        </a>
                        <a href="/" className="list-group-item" onClick={() => props.releaseCharacter(props.ownedCharacter)}>
                            <h4 className="list-group-item-heading">Release ownership of this character</h4>
                            <p className="list-group-item-text">Go back to the character selection screen</p>
                        </a>
                    </div>
                </div>
            </div>     
        </div>
    )
}

export default Home
