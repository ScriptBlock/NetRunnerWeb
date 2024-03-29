/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */


import { useState, useEffect } from 'react'

import InitItem from './InitItem'

const Initiative = (props) => {
    const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS

    // const [myRunner, setMyRunner] = useState(null)
    const [init, setInit] = useState([])

    const dp = {method: "POST", headers: {'Content-Type': 'application/json'} }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
      }

    const rollInit = () => {
        let thisRunner = props.runners.find(r => r.id == props.ownedCharacter)

        if(thisRunner != undefined) {
            let roll = getRandomIntInclusive(1,10)
            console.log(`random roll is ${roll}`)
            console.log(`${roll} + ${thisRunner.reflex} = `)
            roll = roll + thisRunner.reflex
            console.log(roll)
            fetch(`http://${SERVER_ADDRESS}:3000/initiative/netrunner/${props.ownedCharacter}`, {...dp, body: JSON.stringify({roll: roll}) })
            .then(response => response.json())
            .then(data => {
                console.log(`entered at ${roll}`)
            })
        }
    }

    const enterInitAtTop = () => {
        console.log(`entering player ${props.ownedCharacter} into top of initiative`)
        fetch(`http://${SERVER_ADDRESS}:3000/initiative/netrunner/${props.ownedCharacter}`, {...dp, body: JSON.stringify({roll: "top"}) })
        .then(response => response.json())
        .then(data => {
            console.log("entered at top")
        })
    }

    const clearInitiative = () => {
        console.log("removing all initiatives")
        fetch(`http://${SERVER_ADDRESS}:3000/initiative`, {method: "DELETE", headers: {"Content-Type": "application/json"} })
        .then(response => response.json())
        .then(data => {
            console.log("removed init items")
        })
    }

    const nextInitiative = () => {
        fetch(`http://${SERVER_ADDRESS}:3000/initiative/next`, {...dp })
        .then(response => response.json())
        .then(data => {
            console.log("moved next initiative")
        })
    }

    // useEffect(() => {
    //     console.log("init data")
    //     console.log(init)
    // }, [init])
//TOOD this, on app.js to clear top level interval
    useEffect(() => {
        fetch(`http://${SERVER_ADDRESS}:3000/initiative?sort=true`)
        .then(response => response.json())
        .then(data => {
            // console.log("fetched initiative")
            // console.log(data)
            setInit(data)
        })



        const interval = setInterval(() => {
            fetch(`http://${SERVER_ADDRESS}:3000/initiative?sort=true`)
            .then(response => response.json())
            .then(data => {
                // console.log("fetched initiative")
                setInit(data)
            })

            
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="container" role="main">
            <div className="row justify-content-center text-center bg-secondary p-2">
                <div className="col">
                    <button className="btn btn-info btn-block mt-2" onClick={() => enterInitAtTop()}>Enter At Top</button>
                </div>    
                <div className="col">
                    <h1 className="text-center bg-secondary text-white">Initiative</h1>
                </div>
                <div className="col">
                    <button className="btn btn-info btn-block mt-2" onClick={() => rollInit()}>Roll Init</button>
                </div>
            </div>
            <div className="row justify-content-center text-center bg-secondary p-2 my-1">
                <div className="col">
                    <button className="btn btn-primary" onClick={() => clearInitiative()}>Clear Initiative</button>
                </div>
                <div className="col">
                    <button className="btn btn-success" onClick={() => nextInitiative()}>Next Initiative</button>
                </div>
            </div>
            <div className="row justify-content-center text-center bg-secondary p-2 my-1">
                <div className="col">
                    <div className="list-group">
                        <div className="list-group-item bg-dark text-info py-1 my-1">
                            <div className="row">
                                <div className="p-0 col-2">&nbsp;</div>
                                <div className="p-0 col-4 text-left">Name</div>
                                <div className="p-0 col-1">S/R</div>
                                <div className="p-0 col-3">Type</div>
                                <div className="p-0 col-1">Order</div>
                            </div>
                        </div>
                        {
                            init.length > 0 ? init.map((i) => (
                                <InitItem key={i.id} runners={props.runners} ownedCharacter={props.ownedCharacter} initItem={i} ices={props.ices}/>
                            )) : (
                                <div className="list-group-item py-1 my-1">
                                    <div className="row">
                                        <div className="col">No data</div>
                                    </div>
                                </div>
                
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <hr/>
                    <button onClick={() => (props.setPage("home"))} className="btn btn-primary" style={{width:"100%"}}>Home</button>
                </div>
            </div>

        </div>
    )
}

export default Initiative
