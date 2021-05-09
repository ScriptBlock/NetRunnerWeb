import { useState, useEffect } from 'react'

import InitItem from './InitItem'

const Initiative = (props) => {


    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`http://localhost:3000/initiative?sort=true`)
            .then(response => response.json())
            .then(data => {
                console.log("fetched initiative")
                console.log(data)
            })
        }, 2000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="container" role="main">
            <div className="row justify-content-center text-center bg-secondary p-2">
                <div className="col">
                    <button className="btn btn-info btn-block mt-2">Enter At Top</button>
                </div>    
                <div className="col">
                    <h1 className="text-center bg-secondary text-white">Initiative</h1>
                </div>
                <div className="col">
                    <button className="btn btn-info btn-block mt-2">Enter Here</button>
                </div>
            </div>
            <div className="row justify-content-center text-center bg-secondary p-2 my-1">

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

