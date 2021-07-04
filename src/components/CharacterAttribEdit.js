
const CharacterAttribEdit = (props) => {
    return (
        <div className="row border">
            <div className="col">{props.attrib}</div>
            <div className="col-2  text-right">
                <button className="btn btn-primary" onClick={() => (props.decreaseAttribute(props.attrib.toLowerCase()))}>Less</button>
            </div>
            <div className="col-1">
                <div>{props.thisRunner[props.attrib.toLowerCase()]}</div>
            </div>
            <div className="col-2">
                <button className="btn btn-primary" onClick={() => (props.increaseAttribute(props.attrib.toLowerCase()))}>More</button>
            </div>
        </div>
    )
}

export default CharacterAttribEdit
/*



    <>
        <div className="row mt-2">
            <div className="col text-center bg-secondary border"><h3>{props.attrib}</h3><hr/></div>
        </div>

        <div className="row text-center d-flex justify-content-center py-2 bg-dark text-info">
            <div className="col-sm-3">
                <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (props.decreaseAttribute(props.attrib.toLowerCase()))}>Less</button>
            </div>
            <div className="col-sm-3">
                <div>{props.attrib}</div>
                <div>{props.thisRunner[props.attrib.toLowerCase()]}</div>
            </div>
            <div className="col-sm-3">
                <button style={{width:"100%", height:"50px"}} className="btn btn-primary" onClick={() => (props.increaseAttribute(props.attrib.toLowerCase()))}>More</button>
            </div>
        </div>
    </>












*/