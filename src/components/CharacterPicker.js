/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

import { useState, useEffect } from 'react'

const CharacterPicker = (props) => {
    const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS

    //let runners = props.runners
    //const [runners, setRunners] = useState(null)

    // let refreshRunners = () => {
    //     fetch(`http://${SERVER_ADDRESS}:3000/netrunner`) 
    //       .then(res => res.json())
    //       .then(
    //         (result) => {
    //             setRunners(result)
    //             console.log("refreshed netrunner list")
    //         }
    //       )
    // }
    
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log("refreshing netrunners in charpicker")
    //         refreshRunners()
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    const [newName, setNewName] = useState('')

    let updateName = (e) => {
        //console.log(e.target.value)
        setNewName(e.target.value)       
    }

    if(props.runners !== undefined && props.runners !== null) {
        return (
            <div className="container justify-content-center text-center" role="main">
                <h2 className="bg-dark text-info py-3">Pick Or Add A Character</h2>
                <div className="row">
                    <div className="col">
                        <div className="list-group">
                            { props.runners.map((r) => (
                                <button key={r.id} className="list-group-item btn bg-dark text-info my-1" onClick={() => props.chooseCharacter(r.id)}>
                                    <h4 className="list-group-item-heading">{r.name}</h4>
                                    <p className="list-group-item-text">Character is a: {r.type} and owned by: {r.owner}</p>
                                </button>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="h4 bg-secondary text-dark py-3">Create A New Character To Track</div>
                        <div className="bg-dark text-info py-3">
                            <div className="px-5 mt-2"><input className="input text-center h2" style={{width:"100%", height:"50px"}} type="text" name="newcharinputname" onChange={updateName}/></div>
                            <div className="px-5 my-2"><button className="btn btn-primary btn-block" onClick={() => (props.addNewRunnerByName(newName))}>Add</button></div>
                        </div>
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default CharacterPicker
