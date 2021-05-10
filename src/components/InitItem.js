import { useState, useEffect } from 'react'

const InitItem = (props) => {
    const [thisItem, setThisItem] = useState({})
    const [selfBadge, setSelfBadge] = useState(false)
    
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
            let temp = props.runners.find(r => r.id == props.initItem.thingID)
            setThisItem(temp)
            setSelfBadge(temp.id == props.ownedCharacter)
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
        let speedField = `${thisItem.speed} / `
        if(thisItem.reflex != undefined) {
            speedField += `${thisItem.reflex}`
        } else {
            speedField += "N/A"
        }

        let badge=""
        if(props.ownedCharacter == thisItem.id) {
            badge = <span className="badge badge-primary">Me!</span>
        } else {
        //TODO if this thing is an enemy of me, mark as enemy 
            badge = <span className="badge badge-danger">Danger</span>
        }

        if(true) { //TODO if current initiative turn is this one
            badge = <>{badge}<span className="badge badge-warning">Active</span></>
        }


        return (
            <div className="list-group-item py-1 my-1">
                <div className="row">
                    <div className="col-1 justify-content-left text-left">{ badge }</div>
                    <div className="col">{thisItem.name}</div>
                    <div className="col">{ speedField }</div>
                    <div className="col">{thisItem.type}</div>
                    <div className="col">{props.initItem.order}</div>
                </div>
            </div>
        )
    }
}

export default InitItem
