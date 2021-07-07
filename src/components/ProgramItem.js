/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

import { useEffect, useState, useRef } from 'react'

const ProgramItem = (props) => {
    const [cardStyle, setCardStyle] = useState()
    const banner = useRef()

    const tryToggleState = () => {
        if(props.program.activationcount < props.program.maxactivations || props.program.maxactivations == -1 || props.program.isactivated == 1) {
            props.toggleState(props.program)
        } else {
            console.log("not doing activate because it's already been activated too many times")
        }
    }

    useEffect(() => {
        let style
        if(props.program.activationcount >= props.program.maxactivations && props.program.maxactivations > 0 && props.program.isactivated != 1) {
            banner.current = "Exhausted"
            style = {opacity:"10%", border:"dotted .2em red"}
        } else {
            if(props.program.isactivated == 1) {
                banner.current = "Active"
                style = {opacity:"100%", border:"solid .2em white"}
            } else {
                banner.current = "Inactive"
                style = {opacity:"25%", border:"dashed .2em black"}
            }
        }
        setCardStyle(style)

    }, [props.program])

    return (
        <div className="card progpicker" style={cardStyle} onClick={() => { tryToggleState() }}>
            <h5 className="card-header bg-secondary text-white">{props.program.name}<div className="badge badge-pill badge-primary float-xs-right">{ banner.current }</div></h5>
            <div className="card-body">
                <p className="card-text">{props.program.effect}</p>
            </div>
        </div>
    
        
    )
}

export default ProgramItem


