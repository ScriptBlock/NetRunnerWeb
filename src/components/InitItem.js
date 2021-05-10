import { useState, useEffect } from 'react'

const InitItem = (props) => {
    const [thisItem, setThisItem] = useState({})
    
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
            setThisItem(props.runners.find(r => r.id == props.initItem.thingID))
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

        return (
            <div className="list-group-item py-1 my-1">
                <div className="row">
                    <div className="col">{thisItem.name}</div>
                    <div className="col">{ speedField }</div>
                    <div className="col">{thisItem.type}</div>
                    <div className="col">Col4</div>
                </div>
            </div>
        )
    }
}

export default InitItem
