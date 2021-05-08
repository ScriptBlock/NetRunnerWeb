import { useState, useEffect } from 'react'


const CharacterEdit = (props) => {

    const dp = {method: "POST", headers: {'Content-Type': 'application/json'} }

    const changeCharType = (e) => {
        console.log(`Updating runner ${props.ownedCharacter} with new type ${e.target.value}`)
/*
        let newRunners = props.runners.map(r => (
            r.id == props.ownedCharacter ? {...r, type: e.target.value} : r
        ))
        console.log(newRunners)
*/
        fetch(`http://localhost:3000/netrunner/${props.ownedCharacter}`, {...dp, body: JSON.stringify({type: e.target.value}) })
        .then(response => response.json())
        .then(data => {
            console.log("updated character")
            props.refreshRunners()
        })    
    }

    let goHome = () => {
        console.log("going hmoe")
        props.setPage("home")
    }


    return (
        <div className="container va11-theme mt-2" role="main">
            <div className="page-header">
                <h1>Edit Character Attributes</h1>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <table className="table">
                        <tr><td><h1>Type</h1></td></tr>
                        <tr>
                            <td>
                                <select name="chartype" onChange={changeCharType} style={{color:"#000"}}>
                                    <option value="Netrunner">Netrunner</option>
                                    <option value="Other">Other</option>
                                </select>
                            </td>
                            <td>{props.myRunner.type}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <button onClick={() => (props.setPage("home"))} className="btn btn-primary" style={{width:"100%"}}>Home</button>
                </div>
            </div>

        </div>
    )
}

export default CharacterEdit


/*



*/