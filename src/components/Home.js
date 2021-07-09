/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

import {useRef, useEffect, useState} from 'react'
import data from '../Actions.json'
import ExplainModal from './ExplainModal'

const Home = (props) => {
    const myModal = useRef()
    const [actionState, setActionState] = useState("meat")
    const [me, setMe] = useState(null)

    useEffect(() => {
        setMe(props.runners.find(r=>r.id===props.ownedCharacter))
    },[props.ownedCharacter])

    useEffect(() => {
        setMe(props.runners.find(r=>r.id===props.ownedCharacter))
    },[])

    if(me != null) {
        return (
            <div className="container bg-secondary" role="main">

                <div className="row text-center">
                    <div className="col text-center justify-content-center ">
                        <div className="h3 m-2">---[{me.name}]---</div>
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

                { me.type == "Netrunner" && (
                    <div className="row bg-secondary py-3" style={{borderBottom: "solid #000", borderTop: "solid #000"}}>
                        <div className="col text-center">
                            <button className="btn btn-warning btn-block px-5" onClick={() => props.setPage("netrunner")}>Netrun</button>
                        </div>
                    </div>
                ) }

                <div className="row bg-secondary py-3">
                    <div className="col">

                        { data.map(d => (
                            <button key={d.id} type="button" style={{width: "150px"}} className="btn btn-info mx-2 my-2" data-toggle="modal" data-target={"#"+d.id}>{d.title}</button>
                        ))}
                    </div>
                </div>

                <div className="row" style={{borderTop: "solid #000"}}>

                    <div className="col justify-content-center text-center">
                        <button className="btn bg-dark btn-block text-info my-1" style={{height:"100%"}} onClick={() => props.setPage("init")}>
                            <h4 className="">Initiative</h4>
                            <p className="">View Initiative Interface</p>
                        </button>
                    </div>
                    <div className="col justify-content-center text-center">
                        <button className="btn bg-dark btn-block text-info my-1" style={{height:"100%"}} onClick={() => props.setPage("settings")}>
                            <h4 className="">Character Settings</h4>
                            <p className="">Change your character options</p>
                        </button>
                    </div>
                    {/*
                    <div className="col justify-content-center text-center">
                        <button className="btn bg-dark text-info my-1" style={{height:"100%"}} onClick={() => props.setPage("swiper")}>
                            <h4 className="">Test Swiping</h4>
                            <p className="">Test swiping</p>
                        </button>
                    </div>
                    */
                    }

                </div>   
                <div className="row mt-4">
                    <div className="col justify-content-center text-center">
                        <button className="btn bg-dark btn-block text-warning my-1" style={{height:"100%"}} onClick={() => props.releaseCharacter(props.ownedCharacter)}>
                            <h4 className="">Release ownership of this character</h4>
                            <p className="">Go back to the character selection screen</p>
                        </button>
                    </div>
                </div>
                { data.map(d => (
                        <ExplainModal key={d.id} data={d} />
                    )
                )}
            </div>
        )
    } else {
        return (<h1>Loading</h1>)
    }   
}

export default Home
/*

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



*/