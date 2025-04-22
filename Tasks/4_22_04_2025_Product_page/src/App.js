import "./App.css"
import Nav from "./Nav"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Products from "./Products"
import Register from "./Register"
import Footer from "./Footer"


function App(){
  return(
    <>  
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}
export default App