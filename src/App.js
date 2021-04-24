import { useState } from 'react'

import Header from './components/Header'
import Button from './components/Button'
import Initiative from './components/Initiative'


function App() {

  const [init, setInit] = useState(
    [
        {"id": 1, "name": "foo", "init": 10},
        {"id": 2, "name": "bar", "init": 8},
        {"id": 3, "name": "baz", "init": 21}
    ]
  )

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
    <div className="container">
        <Header user='Nickoli' />
        <Button onClick={onClick}/>
        <Initiative init={init} onClick={onInitClick}/>
    </div>
  );
}

export default App;
