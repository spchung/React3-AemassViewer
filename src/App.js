// The Final App that will be rendered, all components should end up here. 
import React from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//components 
import './App.css';
import Viewer from './Components/Viewer';
import LandingPage from './Components/Landing';
import CardViewer from './Components/CardViewer';
import LogIn from './Components/LogIn';

const App = function(){
  return(
    <React.Fragment>
        <Router>
          <Switch>
              <Route exact path ="/" component ={ LogIn }/>
              <Route path ="/landing" component ={ LandingPage }/>
              <Route path ="/viewer" component ={ Viewer }/>
              <Route path ="/newview" component ={ CardViewer }/>
          </Switch>
        </Router>
    </React.Fragment>   
  );
}
export default App; 

