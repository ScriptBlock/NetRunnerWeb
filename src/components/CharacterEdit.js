import { useState, useEffect } from 'react'


const CharacterEdit = (props) => {

    const changeCharType = (e) => {
        console.log(e.target.value)
    }
    
    const [runner, setRunner] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/netrunner/${props.setOwnedCharacter}`)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setRunner(data)
        })
    

    }, []);

    return (
        <div className="container va11-theme mt-2" role="main">
            <div className="page-header">
                <h1>Edit Character Attributes</h1>
            </div>
            <div className="col-sm-4">
                <table className="table">
                    <tr><td><h1>Type</h1></td></tr>
                    <tr><td>
                        <select name="chartype" onChange={changeCharType} style={{color:"#000"}}>
                            <option value="Netrunner">Netrunner</option>
                            <option value="Other">Other</option>
                        </select>
                    </td></tr>
                </table>
            </div>
        </div>
    )
}

export default CharacterEdit


/*



*/