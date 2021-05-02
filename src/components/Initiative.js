import { useState } from 'react'

import InitItem from './InitItem'

const Initiative = (props) => {


    const runnersFromAPI = [
        {"id": 1, "name": "CrashOverride", "interface": 4, "totalSlots": 3, "speed": 4, "damage": 0, "mapid":1, "roomid":1, "discoveredrooms":[]}
    ]
    
    
    const raiseInitiative = (e) => {

    }

    let buttonData = props.init.map(i => {
        let runner = runnersFromAPI.find(r => r.id === Number(i.thingID))
        if(runner !== undefined) { 
            return {...runner, ...i}
        } else {
            return {...i, "name": "nadda"}
        }
    })

    return (
        <div className="panel panel-primary">
            <div className="panel-heading"><span className="panel-title">Initiative Members</span><button className="btn btn-warning" onClick={props.newInitItem}>New</button></div>
            <div className="panel-body">
                { buttonData.map((b) => (
                    <InitItem key={b.id} data={b} />
                ))
                }
            </div>
        </div>
    )
}

export default Initiative



/*
    return (
        <div className="panel-primary">
            <div className="panel-heading">Initiative Members</div>
            <div className="panel-body">
                <div className="list-group">
                    { buttonData.map((b) => (
                        <InitItem data={b} onClick={props.onClick} />
                    ))
                    }
                </div>
            </div>
        </div>
    )
*/

/*
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Panel title</h3>
                    </div>
                    <div class="panel-body">
                        Panel content
                    </div>
                </div>
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title">Panel title</h3>
                    </div>
                    <div class="panel-body">
                        Panel content
                    </div>
                </div>
*/
