import { useState, useEffect } from 'react'

import InitItem from './InitItem'

const Initiative = (props) => {
    const [myRunner, setMyRunner] = useState(null)
    const [init, setInit] = useState([])

    const dp = {method: "POST", headers: {'Content-Type': 'application/json'} }


    const enterInitAtTop = () => {
        console.log(`entering player ${props.ownedCharacter} into top of initiative`)

        //app.post("/initiative/:initType/:id", (req, res, next) => {

        let thisRunner = props.runners.find(r => r.id == props.ownedCharacter)

        fetch(`http://localhost:3000/initiative/${thisRunner.type}/${props.ownedCharacter}`, {...dp, body: JSON.stringify({roll: "top"}) })
        .then(response => response.json())
        .then(data => {
            console.log("entered at top")
        })


    }

    useEffect(() => {
        fetch(`http://localhost:3000/initiative?sort=true`)
        .then(response => response.json())
        .then(data => {
            console.log("fetched initiative")
            console.log(data)
            setInit(data)
        })

        const interval = setInterval(() => {
            fetch(`http://localhost:3000/initiative?sort=true`)
            .then(response => response.json())
            .then(data => {
                console.log("fetched initiative")
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
                    <button className="btn btn-info btn-block mt-2">Roll Init</button>
                </div>
            </div>
            <div className="row justify-content-center text-center bg-secondary p-2 my-1">
                <div className="col">
                    <div className="list-group">
                    {
                            init.map((i) => (
                                <InitItem key={i.id} runners={props.runners} ownedCharacter={props.ownedCharacter} initItem={i}/>
                            ))
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
