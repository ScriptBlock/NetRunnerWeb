/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeteor } from "@fortawesome/free-solid-svg-icons";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons";


import { useEffect, useState, useRef } from 'react'

const ProgramItem = (props) => {
    const [cardStyle, setCardStyle] = useState()
    const banner = useRef()
    const cardTitleRef = useRef()

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

        switch(props.program.class) {
            case "booster": 
                cardTitleRef.current.style.backgroundColor = "green"
                cardTitleRef.current.style.color = "black"
                break
            case "defender":
                cardTitleRef.current.style.backgroundColor = "blue"
                cardTitleRef.current.style.color = "black"
                break
            default:
                cardTitleRef.current.style.backgroundColor = "red"
                cardTitleRef.current.style.color = "black"
                break
        }

    }, [props.program])


/*

    { "class": "booster",
      "name": "See Ya",
      "atk": 0,
      "def": 0, 
      "rez": 7,
      "effect": "Increase all Pathfinder checks you make by +2 as long as this program remains rezzed",
      "maxactivations": -1
    },

                <hr/>
                {props.program.class} / {props.program.atk} / {props.program.def} / { props.program.rez}


*/

    return (
        <div className="card progpicker" style={cardStyle} onClick={() => { tryToggleState() }}>
            <h5 className="card-header bg-secondary text-white">
                <span ref={cardTitleRef}>{props.program.name}</span>
                <div className="badge badge-pill badge-primary float-xs-right">{ banner.current }</div>
            </h5>
            <div className="card-body">
                {/* <p className="card-text">{props.program.effect}</p> */}
                <table style={{width:"100%"}}>
                    <thead>
                        <tr>
                            {/* <th className="px-2"><FontAwesomeIcon icon={faDrumstickBite} /></th> */}
                            <th className="px-2"><FontAwesomeIcon icon={faMeteor} /></th>
                            <th className="px-2"><FontAwesomeIcon icon={faShieldAlt} /></th>
                            <th className="px-2"><FontAwesomeIcon icon={faHeart} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* <td className="px-2">{props.program.class}</td> */}
                            <td className="px-2">{props.program.atk}</td>
                            <td className="px-2">{props.program.def}</td>
                            <td className="px-2">{props.program.rez}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
        
    )
}

export default ProgramItem


