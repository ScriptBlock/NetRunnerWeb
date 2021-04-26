
const ProgramItem = () => {
    return (
        <div className="panel panel-info">
            <div className="panel-heading">
                <div className="panel-title">
                    <div href="./#" style={{ position: "relative" }}>Armor<span className="badge" style={{position: "absolute", top: "0px", right: "0px" }}>Defender</span></div>
                </div>
            </div>
            <div className="panel-body">
                <table className="table table-bordered" style={{width:"auto",height:"100px"}}>
                    <tbody>
                        <tr>
                            <td style={{minWidth:"10px"}}>Atk</td>
                            <td style={{minWidth:"10px"}}>X</td>
                            <td rowspan="3" style={{minWidth:"50%",height:"100%"}}><button style={{ height: "100%"}} className="btn btn-primary btn-block">Remove</button></td>
                            <td rowspan="3" style={{minWidth:"50%",height:"100%"}}><button style={{ height: "100%"}} className="btn btn-warning btn-block">Remove</button></td> 

                        </tr>
                        <tr>
                            <td style={{minWidth:"10px"}}>Def</td>
                            <td style={{minWidth:"10px"}}>Y</td>
                        </tr>
                        <tr>
                            <td style={{minWidth:"10px"}}>Rez</td>
                            <td style={{minWidth:"10px"}}>Z</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProgramItem



/*

    return (
            <div className="panel panel-info">
                <div className="panel-heading">
                    <div className="panel-title">
                        <div href="./#" style={{ position: "relative" }}>Armor<span className="badge" style={{position: "absolute", top: "0px", right: "0px" }}>Defender</span></div>
                    </div>
                </div>
                <div className="panel-body">
                <div className="row">
                    <div className="col">
                        <span>
                            <table className="table table-bordered" style={{width:"auto", display:"inline"}}>
                                <tbody>
                                    <tr>
                                        <td style={{minWidth:"10px"}}>Atk</td>
                                        <td style={{minWidth:"10px"}}>X</td>
                                    </tr>
                                    <tr>
                                        <td style={{minWidth:"10px"}}>Def</td>
                                        <td style={{minWidth:"10px"}}>Y</td>
                                    </tr>
                                    <tr>
                                        <td style={{minWidth:"10px"}}>Rez</td>
                                        <td style={{minWidth:"10px"}}>Z</td>
                                    </tr>
                                </tbody>
                            </table>
                        </span>
                        <span>
                            <button className="btn btn-primary">Do Stuff</button>
                        </span>
                        <div>
                            <button className="btn btn-primary">Do Stuff</button>
                        </div>  
                    </div>
                </div>
            </div>
            </div>
        </div>
    )


*/