import { useState } from 'react'
import LoginChoice from './LoginChoice'
import RegisterChoice from './RegisterChoice';
import Footer from './Footer'

import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import '../styles/App.css'

function App() {

  return (

<Router>
<Routes>
 <Route path="/" element={<LoginChoice  />}/>
 <Route path="/RegisterChoice" element={<RegisterChoice  />}/>


</Routes>
<Footer/>
</Router>




  

  )
}

export default App
