import Card from "./Cards"
import "./App.css"
import { useEffect, useState } from "react"
import axios from "axios"

function App(){
  let [data,setdata]=useState([])
  useEffect(()=>{
    axios.get("xxx").then((res)=>{
      setdata(res.data)
    })
  },[])

  return(
    <div className="con">
      {
        data.map((obj)=><Card obj={obj}/>)
      }
    </div>
  )
}

export default App