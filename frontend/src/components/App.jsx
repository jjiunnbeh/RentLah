import { useState } from 'react'
import LoginChoice from './LoginChoice'
import RegisterChoice from './RegisterChoice';
import Footer from './Footer'
import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '../styles/App.css'
import LoginForm from './LoginForm';


function App() {
  



  return (
<Router>
<Routes>
 <Route path="/" element={<LoginChoice  />}/>
 <Route path="/RegisterChoice" element={<RegisterChoice />}/>
 <Route path="/login=Customer" element={<LoginForm user="Customer"/>}/>
 <Route path="/login=Agent" element={<LoginForm user="Agent"/>}/>

 <Route path="/Home" />


</Routes>
<Footer/>
</Router>




  

  );
}

export default App;
