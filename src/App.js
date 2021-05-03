import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { Router, Link } from "@reach/router"

/*
import Header from './components/Header'
import Button from './components/Button'
import ProgramItem from './components/ProgramItem'
*/
import Netrunners from './components/Netrunners'
import Initiative from './components/Initiative'


function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [ownedCharacter, setOwnedCharacter] = useState(null)

  let localID = localStorage.getItem('nruuid')
  if(localID === null || localID === undefined) {
    console.log("didn't find locally stored uuid")
    localID = uuidv4()
    localStorage.setItem("nruuid", localID)
  }

  const [runners, setRunners] = useState([
//    {"id": 1, "name": "CrashOverride", "interface": 4, "totalSlots": 3, "speed": 4, "damage": 0, "mapid":1, "roomid":1, "discoveredrooms":[], "owner":0}
  ])

  useEffect(() => {
    fetch("http://localhost:3000/netrunner") 
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setRunners(result)

          console.log("lets see what's in runners")
          console.log(runners)

          console.log("what's your uuid")
          console.log(localID)

          let myRunner = result.find(r=>r.owner == localID)
          if(myRunner !== undefined) {
            console.log("Found the character for you!")
            setOwnedCharacter(myRunner.id)
          } else {
            console.log("Did not find a characrer you own")
            setOwnedCharacter(null)  
          }

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
    }, [])

  const [init, setInit] = useState([])
  /*
          {
              "id": 1,
              "type": "ice",
              "thingID": "2",
              "order": 9
          },{
              "id": 2,
              "type": "netrunner",
              "thingID": "1",
              "order": 19
          },{
              "id": 3,
              "type": "netrunner",
              "thingID": "2",
              "order": 6
          },{
              "id": 4,
              "type": "ice",
              "thingID": "1",
              "order": 22
          }])
   */   
  
  let Home = () => 
    <>
      <div className="page-header">
          <h1>Player Actions</h1>
      </div>
      <div className="row">
          <div className="col-sm-4">
              <div className="list-group">
                  <a href="/init" className="list-group-item">
                      <h4 className="list-group-item-heading">Initiative Listing</h4>
                      <p className="list-group-item-text">Go to the initiative screen</p>
                  </a>
                  <a href="#" className="list-group-item">
                      <h4 className="list-group-item-heading">Change My Settings</h4>
                      <p className="list-group-item-text">Change your character options</p>
                  </a>
                  <a href="/" className="list-group-item" onClick={() => releaseCharacter(ownedCharacter)}>
                      <h4 className="list-group-item-heading">Release ownership of this character</h4>
                      <p className="list-group-item-text">Go back to the character selection screen</p>
                  </a>
              </div>
          </div>
      </div>     
    </>

  const newNetrunnerClick = (e) => {
    console.log("new netrunner")
    //make api call to make a new netrunner
    setRunners([...runners, {"id": 2, "interface": 4, "totalSlots": 3, "speed": 4, "damage": 0, "discoveredrooms":[], "owner":0} ])

  }

  const onRunnerNameChange = (e) => {
    console.log(e.target.key)

  }

  const newInitItem = (e) => {
    let newInitID = init.length > 0 ? init.reduce((a,b)=>a.id>b.id?a:b).id + 1 : 1
    setInit([...init, {"id": newInitID, "name": "Unknown", "init": "top"}])
    console.log("List item clicked")
    console.log(e)
  }

  const onClick = () => {
    console.log("Button clicked")
  }

  const chooseCharacter = (id) => {
    fetch(`http://localhost:3000/netrunner/${id}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({owner: localID}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      //send post to database to assign owner
      console.log(`choosing owned character ${id}`)
      setOwnedCharacter(id)
      setRunners(data)
    })
  }

  const releaseCharacter = (id) => {
    fetch(`http://localhost:3000/netrunner/${id}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({owner: 0}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      //send post to database to assign owner
      console.log(`clearing ownership for ${id}`)
      setOwnedCharacter(null)
      setRunners(data)
    })


    

  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    if(ownedCharacter === null) {
      return (
        <div className="container va11-theme mt-2" role="main">
          <div className="page-header">
            <h1>Pick Or Add A Character</h1>
          </div>
          <ul>
            { runners.map((r) => (
              <li key={r.id}><button className="btn btn-primary" onClick={() => chooseCharacter(r.id)}>{r.name}</button></li>
               ))
            }
          </ul>
        </div>
      )

    } else {
      return (
        <Router>
          <Home path="/"/>
          <Initiative path="/init" init={init} />

        </Router>
      )
    }
  }

}

export default App;

/*

        <div className="container va11-theme mt-2" role="main">
            <div className="page-header">
              <h1>NetrunnerWeb{runners.length}</h1>
            </div>
            <Netrunners runners={runners} newNetrunnerClick={newNetrunnerClick} onRunnerNameChange={onRunnerNameChange}/>
        </div>


*/

/*
        <Header user='Nickoli' />
        <ProgramItem />        
        <Initiative init={init} onClick={onInitClick}/>


*/


/*
possible refresh code
  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);


function ExampleAnimatorChild () {
  const animator = useAnimator();
  return (
    <div style={{ color: 'cyan' }}>
      Animator flow state: <b>{animator.flow.value}</b>.
    </div>
  );
}

function Sandbox () {
  const [activate, setActivate] = React.useState(true);
  const duration = { enter: 500, exit: 500 };
  const timeout = React.useRef();

  React.useEffect(() => {
    timeout.current = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout.current);
  }, [activate]);

  return (
    <Animator animator={{ activate, duration }}>
      <ExampleAnimatorChild />
    </Animator>
  );
}

render(<Sandbox />);


                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title">Panel title</h3>
                    </div>
                    <div class="panel-body">
                        Panel content
                    </div>
                </div>

*/

/*


        <div class="page-header">
            <h1>List groups</h1>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <div class="list-group">
                    <a href="#" class="list-group-item active">
                        <h4 class="list-group-item-heading">List group item heading</h4>
                        <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    </a>
                    <a href="#" class="list-group-item">
                        <h4 class="list-group-item-heading">List group item heading</h4>
                        <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    </a>
                    <a href="#" class="list-group-item">
                        <h4 class="list-group-item-heading">List group item heading</h4>
                        <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    </a>
                </div>
            </div>
            <!-- /.col-sm-4 -->
        </div>


*/