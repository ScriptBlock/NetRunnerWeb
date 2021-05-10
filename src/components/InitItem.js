import { useState, useEffect } from 'react'

const InitItem = (props) => {
    // const [thisItem, setThisItem] = useState({})
    
    //<InitItem key={i.id} runners={props.runners} ownedCharacter={props.ownedCharacter} initItem={i}/>
    
        // "id": 1,
        // "type": "ice",
        // "thingID": "2",
        // "order": 9

    useEffect(() => {
        // console.log(props.initItem)
        // let thisThing = {}
        // if(props.i.type)        
    }, [props.initItem])

    if(props.initItem == undefined || props.initItem == null) {
        return (<p>....</p>)
    } else {

        return (
            <div className="list-group-item py-1 my-1">
                <div className="row">
                    <div className="col">{props.initItem.type}</div>
                    <div className="col">{props.initItem.order}</div>
                    <div className="col">oij</div>
                    <div className="col">Col4</div>
                </div>
            </div>
        )
    }
}

export default InitItem
