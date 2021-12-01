import './App.css';
import React from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const App=()=>{
  const [progress,setProgress]=useState(0)
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={4}
        color='#f11946'
         progress={progress}
      />
          <Switch>
            <Route  exact path="/"><News setProgress={setProgress} key="general" pageSize={5} country="us" category="general" /></Route> 
            <Route  exact path="/business"><News setProgress={setProgress} key="business" pageSize={5} country="us" category="business" /></Route>
            <Route  exact path="/entertainment"> <News setProgress={setProgress} key="entertainment" pageSize={5} country="in" category="entertainment" /></Route>
            <Route  exact path="/general"><News setProgress={setProgress} key="general" pageSize={5} country="in" category="general"/></Route>
            <Route  exact path="/health"><News setProgress={setProgress} key="health" pageSize={5} country="in" category="health" /></Route>
            <Route  exact path="/science"><News setProgress={setProgress} key="science" pageSize={5} country="in" category="science" /></Route>
            <Route  exact path="/sports"><News setProgress={setProgress} key="sports" pageSize={5} country="in" category="sports" /></Route>
            <Route  excat path="/technology"><News setProgress={setProgress} key="technology" pageSize={5} country="in" category="technology" /></Route>
          </Switch>
        </Router>
      </div>
    )
}

export default App

