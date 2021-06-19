/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

import { useState, useEffect } from 'react'
import CharacterAttribEdit from './CharacterAttribEdit'

const CharacterEdit = (props) => {
    const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS


    const [thisRunner, setThisRunner] = useState(props.myRunner)

    const dp = {method: "POST", headers: {'Content-Type': 'application/json'} }

    const changeCharType = (e) => {
        console.log(`Updating runner ${props.ownedCharacter} with new type ${e.target.value}`)
/*
        let newRunners = props.runners.map(r => (
            r.id == props.ownedCharacter ? {...r, type: e.target.value} : r
        ))
        console.log(newRunners)
*/
        setThisRunner({...thisRunner, type: e.target.value})
        fetch(`http://${SERVER_ADDRESS}:3000/netrunner/${props.ownedCharacter}`, {...dp, body: JSON.stringify({type: e.target.value}) })
        .then(response => response.json())
        .then(data => {
            console.log("updated character")
            props.refreshRunners()
            setThisRunner({...thisRunner, type: data.find(r => r.id == props.ownedCharacter).type})
        })    
    }

    let goHome = () => {
        console.log("going hmoe")
        props.setPage("home")
    }

    let decreaseAttribute = (attrib) => {
        console.log(`decrease attribute ${attrib}`)
        let newValue = thisRunner[attrib] -= 1
        console.log(newValue)

        let param = {}
        param[attrib] = newValue
        fetch(`http://${SERVER_ADDRESS}:3000/netrunner/${props.ownedCharacter}`, {...dp, body: JSON.stringify(param) })
        .then(response => response.json())
        .then(data => {
            console.log("updated character")
            props.refreshRunners()
            let newRunner = thisRunner
            newRunner[attrib] = newValue
            setThisRunner(newRunner)
        })    

    }


    let increaseAttribute = (attrib) => {
        console.log(`increase attribute ${attrib}`)
        let newValue = thisRunner[attrib] += 1
        console.log(newValue)

        let param = {}
        param[attrib] = newValue
        fetch(`http://${SERVER_ADDRESS}:3000/netrunner/${props.ownedCharacter}`, {...dp, body: JSON.stringify(param) })
        .then(response => response.json())
        .then(data => {
            console.log("updated character")
            props.refreshRunners()
            let newRunner = thisRunner
            newRunner[attrib] = newValue
            setThisRunner(newRunner)
        })    

        
    }

    return (
        <div className="container" role="main"> 
                
            <h1 className="mb-3">Update Character {thisRunner.name}</h1>
            <div className="row">
                <div className="col text-center border bg-secondary"><h3>Character Type</h3><hr/></div>
            </div>
            <div className="row mb-3 d-flex justify-content-center text-center bg-dark text-info">
                <div className="col py-3">
                    <select name="chartype" onChange={changeCharType} style={{color:"#000"}} value={thisRunner.type}>
                        <option value="Netrunner">Netrunner</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="col py-3">
                    {thisRunner.type}
                </div>
            </div>
            <CharacterAttribEdit attrib="Interface" decreaseAttribute={decreaseAttribute} increaseAttribute={increaseAttribute} thisRunner={thisRunner}/>
            <CharacterAttribEdit attrib="Slots" decreaseAttribute={decreaseAttribute} increaseAttribute={increaseAttribute} thisRunner={thisRunner}/>
            <CharacterAttribEdit attrib="Speed" decreaseAttribute={decreaseAttribute} increaseAttribute={increaseAttribute} thisRunner={thisRunner}/>
            <CharacterAttribEdit attrib="Reflex" decreaseAttribute={decreaseAttribute} increaseAttribute={increaseAttribute} thisRunner={thisRunner}/>
            <CharacterAttribEdit attrib="Damage" decreaseAttribute={decreaseAttribute} increaseAttribute={increaseAttribute} thisRunner={thisRunner}/>



            <div className="row">
                <div className="col">
                    <hr/>
                    <button onClick={() => (props.setPage("home"))} className="btn btn-primary" style={{width:"100%"}}>Home</button>
                </div>
            </div>

        </div>
    )
}

export default CharacterEdit


/*

            <div className="row">
                <div className="col text-center bg-secondary border"><h3>Interface</h3><hr/></div>
            </div>
            <div className="row text-center d-flex justify-content-center py-2 bg-dark text-info">
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (decreaseAttribute("interface"))}>Less</button>
                </div>
                <div className="col-sm-3">
                    <div>Interface</div>
                    <div>{thisRunner.interface}</div>
                </div>
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (increaseAttribute("interface"))}>More</button>
                </div>
            </div>

            <div className="row text-center d-flex justify-content-center py-2 bg-dark text-info">
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (decreaseAttribute("totalSlots"))}>Less</button>
                </div>
                <div className="col-sm-3">
                    <div>Total Slots</div>
                    <div>{thisRunner.totalSlots}</div>
                </div>
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (increaseAttribute("totalSlots"))}>More</button>
                </div>
            </div>

            <div className="row text-center d-flex justify-content-center py-2 bg-dark text-info">
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (decreaseAttribute("speed"))}>Less</button>
                </div>
                <div className="col-sm-3">
                    <div>Speed</div>
                    <div>{thisRunner.speed}</div>
                </div>
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (increaseAttribute("speed"))}>More</button>
                </div>
            </div>

            <div className="row text-center d-flex justify-content-center py-2 bg-dark text-info">
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (decreaseAttribute("damage"))}>Less</button>
                </div>
                <div className="col-sm-3">
                    <div>Damage</div>
                    <div>{thisRunner.damage}</div>
                </div>
                <div className="col-sm-3">
                    <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (increaseAttribute("damage"))}>More</button>
                </div>
            </div>



*/