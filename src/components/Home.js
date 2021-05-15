import {useRef} from 'react'

const Home = (props) => {
    const myModal = useRef()
    let me = props.runners.find(r=>r.id===props.ownedCharacter)

    //console.log("in home render... ")
    //console.log(props.ownedCharacter)

    return (
        <div className="container" role="main">
            <h1>Player Actions for {me.name}</h1>

            <div className="row text-center">
                <div className="col text-center justify-content-center p-0 m-0">
                    <button className="btn btn-secondary btn-block bg-dark text-info my-1" onClick={() => props.setPage("init")}>
                        <h4 className="">Initiative</h4>
                    </button>
                </div>
            </div>

            <div className="row border text-center text-light bg-dark">
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


            <div className="row border text-center bg-info mb-2">
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

            <div className="row mt-4 bg-dark text-info">
                <div className="col p-0 text-center">
                    <h3>Actions</h3>
                </div>    
            </div>  

            <div className="row bg-secondary py-3">
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Netrun</button>
                </div>
            </div>
            <div className="row bg-secondary py-3" style={{height:"100px"}}>
                <div className="col text-center">
                    <button type="button" className="btn btn-info btn-block px-5 h-100" data-toggle="modal" data-target="#moveModal">Move</button>
                </div>
                <div className="col text-center">
                    <button type="button" className="btn btn-info btn-block px-5 h-100" data-toggle="modal" data-target="#attackModal">Attack</button>
                </div>
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5 h-100">Choke</button>
                </div>
            </div>
            <div className="row bg-secondary py-3">
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Shield</button>
                </div>
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Get In</button>
                </div>
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Get Up</button>
                </div>
            </div>
            <div className="row bg-secondary py-3">
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Grab</button>
                </div>
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Hold</button>
                </div>
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Human Shield</button>
                </div>
            </div>
            <div className="row bg-secondary py-3">
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Reload</button>
                </div>
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Run</button>
                </div>
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Start It</button>
                </div>
            </div>
            <div className="row bg-secondary py-3">
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Stabilize</button>
                </div>
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Throw</button>
                </div>
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Use Object</button>
                </div>
            </div>
            <div className="row bg-secondary py-3">
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Use Skill</button>
                </div>
                <div className="col text-center">
                    <button className="btn btn-info btn-block px-5">Maneuver</button>
                </div>
                <div className="col text-center">
                    &nbsp;
                </div>
            </div>


            <div className="row">
                <div className="col justify-content-center text-center">
                    <button className="btn bg-dark text-info my-1" style={{height:"100%"}} onClick={() => props.setPage("settings")}>
                        <h4 className="">Change My Settings</h4>
                        <p className="">Change your character options</p>
                    </button>
                </div>
                <div className="col justify-content-center text-center">
                    <button className="btn bg-dark text-info my-1" style={{height:"100%"}} onClick={() => props.releaseCharacter(props.ownedCharacter)}>
                        <h4 className="">Release ownership of this character</h4>
                        <p className="">Go back to the character selection screen</p>
                    </button>
                </div>
            </div>   


            <div className="modal fade" id="moveModal" tabIndex="-1" role="dialog"  aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Move Action</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body bg-secondary">
                            <p className="text-dark"><strong>Move:</strong>Every turn, a character gets a Move Action which can only be used to move a number of m/yds equal to their MOVEx2, or a number of squares equal to their MOVE, which can include moving diagonally.</p>
                            <p className="text-dark"><strong>Prone:</strong>When you are prone, you can't use your move action until you use the Get Up action</p>
                            <p className="text-dark"><strong>Other:</strong>Swimming, climbing, and jumping with a running start all cost 2 m/yds of movement for every m/yd traveled or 2 squares for every 1 square.  When jumping from standing you can clear half the distance that you could wuth a running start.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="attackModal" tabIndex="-1" role="dialog"  aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Attack Action</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body bg-secondary">
                            <p className="text-dark"><strong>Aimed Shots:</strong>At a maximum of 1 ROF you can aim a single Ranged or Melee Attack by taking your entire action and a -8 to your check to aim for any of these special areas.  If you hit, you deal tha attack's damage as normal, and you also get an additional effect based on the special area you aimed for."</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Home
