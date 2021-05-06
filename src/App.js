import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { Router, Link } from "@reach/router"

/*
import Header from './components/Header'
import Button from './components/Button'
import ProgramItem from './components/ProgramItem'
*/
import Home from './components/Home'
import CharacterPicker from './components/CharacterPicker'
import Netrunners from './components/Netrunners'
import Initiative from './components/Initiative'
import CharacterEdit from './components/CharacterEdit';


function App() {
  //const [fetchRunners, setFetchRunners] = useState(false)
  const [refreshRunnersActive, setRefreshRunnersActive] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [ownedCharacter, setOwnedCharacter] = useState(null)

  const dp = {method: "POST", headers: {'Content-Type': 'application/json'} }

  let localID = localStorage.getItem('nruuid')
  if(localID === null || localID === undefined) {
    console.log("didn't find locally stored uuid")
    localID = uuidv4()
    localStorage.setItem("nruuid", localID)
  }

  const [runners, setRunners] = useState([
//    {"id": 1, "name": "CrashOverride", "interface": 4, "totalSlots": 3, "speed": 4, "damage": 0, "mapid":1, "roomid":1, "discoveredrooms":[], "owner":0}
  ])


  let refreshRunners = () => {
    fetch("http://localhost:3000/netrunner") 
      .then(res => res.json())
      .then(
        (result) => {
          setRunners(result)
          console.log("refreshed netrunner list")
          if(refreshRunnersActive) {
            const refresh = setTimeout(() => refreshRunners(), 2000)
          }
        }
      )
  }

  // useEffect(() => {
  //   const timeout = setTimeout(() => setFetchRunners(!fetchRunners), 2000);
  //   return () => clearTimeout(timeout);
  // }, [fetchRunners]);


  useEffect(() => {
    fetch("http://localhost:3000/netrunner") 
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setRunners(result)

          if(refreshRunnersActive) {
            //refreshRunners()
          }

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
    fetch(`http://localhost:3000/netrunner/${id}`, { ...dp, body: JSON.stringify({owner: localID})})
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      //send post to database to assign owner
      console.log(`choosing owned character ${id}`)
      setRefreshRunnersActive(false)
      setOwnedCharacter(id)
      setRunners(data)
    })
  }

  const releaseCharacter = (id) => {
    fetch(`http://localhost:3000/netrunner/${id}`, {...dp, body: JSON.stringify({owner: 0})})
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      //send post to database to assign owner
      console.log(`clearing ownership for ${id}`)
      setRefreshRunnersActive(false)
      setOwnedCharacter(null)
      setRunners(data)
    })
  }

  const addNewRunnerByName = (newName) => {
    fetch("http://localhost:3000/netrunner", { ...dp, body: JSON.stringify({name: newName, owner: localID })})
    .then(response => response.json())
    .then(data => {
      console.log("succcess")
      let id = data.find(r => r.name === newName).id
      console.log(`found new character ${id}`)
      setRunners(data)

      setOwnedCharacter(id)
    })
    
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    if(ownedCharacter === null) {
      return (
        <CharacterPicker chooseCharacter={chooseCharacter} addNewRunnerByName={addNewRunnerByName}/>
      )

    } else {
      return (
        <Router>
          <Home path="/" releaseCharacter={releaseCharacter} ownedCharacter={ownedCharacter} runners={runners}/>
          <Initiative path="/init" init={init} />
          <CharacterEdit path="/charedit" ownedCharacter={ownedCharacter}/>
        </Router>
      )
    }
  }

}

export default App;

// if(ownedCharacter === null) {
//   return (
//     <CharacterPicker chooseCharacter={chooseCharacter} runners={runners} addNewRunnerByName={addNewRunnerByName}/>
//   )



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