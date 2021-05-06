import { useState, useEffect } from 'react'

const CharacterPicker = (props) => {
    //let runners = props.runners
    const [runners, setRunners] = useState(null)

    let refreshRunners = () => {
        fetch("http://localhost:3000/netrunner") 
          .then(res => res.json())
          .then(
            (result) => {
              setRunners(result)
              console.log("refreshed netrunner list")
              setTimeout(() => refreshRunners(), 2000)
            }
          )
    }
    
    useEffect(() => {
        console.log("caling charpicker useeffect")
        refreshRunners()
    }, [])

    const [newName, setNewName] = useState('')

    let updateName = (e) => {
        //console.log(e.target.value)
        setNewName(e.target.value)       
    }

    if(runners !== null) {
        return (
            <div className="container va11-theme mt-2" role="main">
                <div className="page-header">
                <h1>Pick Or Add A Character</h1>
                </div>
                <div className="col-sm-4">
                    <div className="list-group">
                        { runners.map((r) => (
                            <button key={r.id} 
                                    className="list-group-item btn" 
                                    onClick={() => props.chooseCharacter(r.id)}>
                                        <h4 className="list-group-item-heading">{r.name}</h4>
                                        <p className="list-group-item-text">Character is a: {r.type} and owned by: {r.owner}</p>
                            </button>
                        ))
                        }
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="panel panel-success">
                        <div className="panel-heading"><span className="panel-title">Create A New Character To Track</span></div>
                        <div className="panel-body">
                            <input type="text" name="newcharinputname" onChange={updateName}/><hr/>
                            <button className="btn btn-primary" onClick={() => (props.addNewRunnerByName(newName))}>Add</button>
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
