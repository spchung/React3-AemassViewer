import React, { Component } from 'react';
// import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
//components 
import LandingPage from './Components/Landing';
import CardViewer from './Components/CardViewer';
import LogIn from './Components/LogIn';

class App extends Component{
  state={
    loggedIn : false
  }
  componentDidMount(){
    this.localStorage = window.localStorage; 
    this.status = this.checkSignInStatus('isSignIn');
  }

  checkSignInStatus(localStorageKey){
    let val = this.localStorage.getItem(localStorageKey);
    if (val === 'true') return true;
    else return false;
  }

  render(){
    return(
      <React.Fragment>
        <Switch>
          <Route exact path ="/" component ={ LogIn }/>
          <Route path ="/landing" component ={ LandingPage }/>
          <Route path ="/newview" component ={ CardViewer }/>
        </Switch>
      </React.Fragment>   
    )
  };
}
export default App; 

