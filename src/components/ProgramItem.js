import { useEffect, useState } from 'react'

const ProgramItem = (props) => {
    const [cardStyle, setCardStyle] = useState()

    useEffect(() => {
        console.log("MapProgramListing changed")
        let style
        if(props.program.isactivated == 1) {
            style = {opacity:"100%", border:"solid .2em white"}
        } else {
            style = {opacity:"10%", border:"dashed .2em black"}
        }
        setCardStyle(style)

    }, [props.program])

    return (
        <div className="card" style={cardStyle}>
            <h5 className="card-header bg-secondary text-white">Program Name {props.program.name}</h5>
            <div className="card-body">
                <p className="card-text">{props.program.effect}</p>
            </div>
        </div>
    
        
    )
}

export default ProgramItem


