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

import { useState } from 'react'

import Header from './components/Header'
import Button from './components/Button'
import Initiative from './components/Initiative'
import ProgramItem from './components/ProgramItem'


function App() {


  const [init, setInit] = useState([
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

  const onInitClick = (e) => {
    let newInitID = init.reduce((a,b)=>a.id>b.id?a:b).id + 1
    setInit([...init, {"id": newInitID, "name": "roger", "init": 9}])
    console.log("List item clicked")
    console.log(e)
}


  const onClick = () => {
    console.log("Button clicked")
  }


  return (
    <div className="container va11-theme mt-2" role="main">
        <div className="page-header">
            <h1>Welcome</h1>
            <p>This theme inspired by video game - VA-11 Hall-A: Cyberpunk Bartender Action</p>
        </div>
        <Header user='Nickoli' />
        <ProgramItem />
        <Initiative init={init} onClick={onInitClick}/>
    </div>
  );
}
//        <Button onClick={onClick}/>

export default App;
