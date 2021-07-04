import { useState, useEffect } from 'react'

//TODO add click to remove action
//add click to install for blanks

const ProgramEditItem = (props) => {

    const [style, setStyle] = useState({})
    const [header, setHeader] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
//        console.log("sdijfsdif")
        if(props.program.name == null) {
            setStyle({border: "dashed .3em purple"})
            setHeader("Empty Slot")
            setBody("This slot is open to install programs")
        } else {
            setStyle({border: "solid .3em blue"})
            setHeader(props.program.name)
            setBody(props.program.effect)
        }


    }, [props.program])

    // useEffect(() => {


    // }, [])

    return (
            <div className="row my-2" style={style} onClick={()=> (console.log(props.program))}>
                <div className="col" >
                    <div className="h3 py-2 text-center">{header}</div>
                    <div className="p py-2 text-center">{body}</div>

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