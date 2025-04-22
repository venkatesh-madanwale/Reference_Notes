import { useState } from "react"
import "./App.css"
let App=()=>{
  let[data,setData]=useState({"name":"","email":"","phone":"","place":""})
  let[a,setA]=useState([])
  let fun=(e)=>{
    setData({...data, [e.target.name]:e.target.value})
  }
  let add=()=>{
    setA([...a,data])
    setData({"name":"","email":"","phone":"","place":""})
  }
  return(
  <div>
    <div>
    <input type="text" onChange={fun} name="name" value={data.name}/>
    <input type="text" onChange={fun} name="email" value={data.email}/>
    <input type="text" onChange={fun} name="phone" value={data.phone}/>
    <input type="text" onChange={fun} name="place" value={data.place}/>
    <button onClick={add}>Add</button>
  </div>
    <table>
    <tr><th>Name</th><th>Email</th><th>Phone</th><th>Place</th></tr>
  {   a.map((obj)=>{
      return(<tr>
        <td>{obj.name}</td>
        <td>{obj.email}</td>
        <td>{obj.phone}</td>
        <td>{obj.place}</td>
      </tr>)
    }
    )
    }
    </table>
  </div>
  )
}

export default App