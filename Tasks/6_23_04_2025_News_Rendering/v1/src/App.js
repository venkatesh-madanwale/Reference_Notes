import Card from "./Cards"
import "./App.css"
import { useEffect, useState } from "react"
import axios from "axios"

function App(){
  let [data,setdata]=useState([])
  useEffect(()=>{
    axios.get("https://saurav.tech/NewsAPI/everything/cnn.json").then((res)=>{
      setdata(res.data.articles)
      console.log(res.data.articles)
      console.log(res.data.articles)
    })
  },[])
  
  return(
    <>
  <div className="navbar">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>

    <div className="con">
      {
        data.map((obj)=> <Card obj={obj}/> )
      }
    </div>
    <div>
    <footer>
        <p>&copy; 2025 Your Website. All rights reserved.</p>
      </footer>
    </div>
    </>
  )
}

export default App