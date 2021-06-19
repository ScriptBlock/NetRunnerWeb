/* eslint eqeqeq: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */


import { useState, useEffect } from 'react'

const InitItem = (props) => {
    const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS

    const [thisItem, setThisItem] = useState({})
    const [selfBadge, setSelfBadge] = useState(false)
    const [actionPanelStatus, setActionPanelStatus] = useState(false)
    const dp = {method: "POST", headers: {'Content-Type': 'application/json'} }

    const removeInitiative = (id) => {
        console.log("removing initiative:", id)
        fetch(`http://${SERVER_ADDRESS}:3000/initiative/${id}`, {method: "DELETE", headers: {"Content-Type": "application/json"} })
        .then(response => response.json())
        .then(data => {
            console.log("removed init item ", id)
        })
    }

    const setActiveInitiative = (id) => {
        console.log("setting this id as active in initiative: ", id)
        fetch(`http://${SERVER_ADDRESS}:3000/setactiveinit/${id}`, dp)
        .then(response => response.json())
        .then(data => {
            console.log("set item active", id)
        })

    }

    // useEffect(() => {
    //     console.log("init debug")
    //     console.log(props)
    //     console.log(props.key)
    // }, [])

    //<InitItem key={i.id} runners={props.runners} ownedCharacter={props.ownedCharacter} initItem={i}/>
    
        // "id": 1,
        // "type": "ice",
        // "thingID": "2",
        // "order": 9

    useEffect(() => {
        //console.log(`doing useEffect for init item ${props.initItem.id}`)
        // let thisThing = {}
        // if(props.i.type)
        if(props.initItem.type == "netrunner") {
            let temp = props.runners.find(r => r.id != undefined && r.id == props.initItem.thingID)
            // console.log(temp)
            
            setThisItem(temp)
            setSelfBadge(temp.id == props.ownedCharacter)
        }        

        if(props.initItem.type == "ice") {
            console.log("found an ice in init")
            let temp = props.ices.find(i => i.id != undefined && i.id == props.initItem.thingID)
            console.log(temp)
            temp.type="Ice"
            setThisItem(temp)
        }
    }, [props.initItem])

    if(props.initItem == undefined || props.initItem == null || thisItem.name == undefined || thisItem.name == null) {
        return (
            <div className="list-group-item py-1 my-1">
                <div className="row">
                    <div className="col">N</div>
                    <div className="col">O</div>
                    <div className="col">P</div>
                    <div className="col">E</div>
                </div>
            </div>
        )
    } else {
        let speedField = `${thisItem.speed || thisItem.Spd}`
        if(thisItem.reflex != undefined) {
            speedField += `/${thisItem.reflex}`
        } else {
            // speedField += "N/A"
        }

        let badge=""
        if(props.ownedCharacter == thisItem.id) {
            badge = <div className="d-block badge badge-primary mx-auto" style={{width:"75%"}}>Me!</div>
        } else {
            //TODO if this thing is an enemy of me, mark as enemy 
            // badge = <span className="badge badge-danger">Danger</span>
        }

        if(props.initItem.active) { //TODO if current initiative turn is this one
            badge = <>{badge}<div className="d-block badge badge-warning mx-auto" style={{width:"75%"}}>Active</div></>
        }

        let panelDetail = <div className="row">
                            <div className="col">
                                <hr/>
                                <button className="btn btn-danger mx-1" onClick={() => removeInitiative(props.initItem.id)}>Remove</button>
                                <button className="btn btn-secondary mx-1" onClick={() => setActiveInitiative(props.initItem.id)}>Set As Active</button>
                            </div>
                          </div>

        return (
            <div className="list-group-item py-1 my-1">
                <div className="row p-0"  onClick={() => setActionPanelStatus(!actionPanelStatus)}>
                    <div className="p-0 col-2 text-center">{ badge }</div>
                    <div className="p-0 col-4 text-left">{thisItem.name}</div>
                    <div className="p-0 col-1">{ speedField }</div>
                    <div className="p-0 col-3">{thisItem.type}</div>
                    <div className="p-0 col-1">{props.initItem.order}</div>
                </div>
                { actionPanelStatus && panelDetail }
                
            </div>
        )
    }
}

export default InitItem
