import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"


const Scene = () => {
  const [state, setstate] = useState(1);

  useEffect(()=>{
  
  return ()=>{
  
  }
  },[])

 const start=()=>{
  setstate(state+1)
 }
   
  return (
    <div>
      <h1>{state}</h1>
      <Button onClick={()=>{start()}} >restart</Button>
      {/* <Button >stop</Button> */}
    </div>
  )
}

export default Scene
