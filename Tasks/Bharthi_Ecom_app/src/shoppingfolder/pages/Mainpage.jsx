import React,{useState} from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Collections from '../components/Collections'
import Footer from '../components/Footer'

import {Gents,Ladies} from '../data'
import WomenCollection from '../components/WomenCollection'

const Mainpage = () => {
    const[gentsfashion, setgentsFashion] = useState(Gents)
    const[ladiesfashion, setladiesFashion] = useState(Ladies)
     console.log(Gents)
    return (
    <div>
      <Header/>
      <Banner/>
      <Collections gentsfashion={gentsfashion}/>
      <WomenCollection ladiesfashion={ladiesfashion}/>
      <Footer/>
        </div>
  )
}

export default Mainpage
