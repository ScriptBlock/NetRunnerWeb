import { useState, useEffect } from 'react'


//TODO add click to remove action
//add click to install for blanks

const ProgramEditItem = (props) => {

    const [style, setStyle] = useState({})
    const [header, setHeader] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        let finalStyle = {}
        if(props.program.name == null) {
            // setStyle({border: "dashed .3em purple"})
            finalStyle = {border: "dashed .3em purple"}
            setHeader("Empty Slot")
            setBody("This slot is open to install programs")
        } else {
            // setStyle({border: "solid .3em blue"})
            finalStyle = {border: "solid .3em blue"}
            setHeader(props.program.name)
            setBody(props.program.effect)
        }
        setStyle(finalStyle)


    }, [props.program])


    const launchModal = (id) => {
        if(id >= 5000) {
            props.doShowInstallModal()
        } else {
            props.doShowRemoveModal(id)
        }
    }

    return (
            <div className="row my-2 progpicker" style={style} onClick={()=> { launchModal(props.program.id) }} >
                <div className="col" >
                    <div className="h3 pt-2 text-center">{header}</div>
                    <div className="p pb-2 text-center">{body}</div>
                </div>                

            </div>
        )
}

export default ProgramEditItem



/*







            <div className="row my-2" style={{border: "dashed .3em purple"}} onClick={()=> (console.log(props.myRunner))}>
                <div className="col" >
                    <div className="py-2 text-center">No Program Chosen</div>

                </div>                
            </div>
            <div className="row" style={{border: "solid .3em blue"}}>
                <div className="col" >
                    <div className="py-2 text-center">No Program Chosen</div>

                </div>                
            </div>


*/