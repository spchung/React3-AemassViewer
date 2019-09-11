// The Final App that will be rendered, all components should end up here. 
import React, { Component } from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//components 
import './App.css';
import Viewer from './Components/Viewer';
import LandingPage from './Components/Landing';
import CardViewer from './Components/CardViewer';
import LogIn from './Components/LogIn';
///CONTEXT///
import { ModelContext } from './Contexts/ModelInfo'
//data
const apis = require('./api.json');

class App extends Component{  
  constructor(props){
    super(props);
    this.state = { 
      models : [],
      access:'',
    };
  }

  componentDidMount() {
    var access="bird";
    ///INVOKE AWS LAMBDA  
    fetch(`${apis.modelInfoByAccess}${access}`)
     .then(res => res.json())
      .then(res => res.body)
       .then(res => JSON.parse(res))
        .then(models => {
          this.setState({models : models})
      })
  };
  
  render() { 
    return(
      <React.Fragment>
          <ModelContext.Provider value ={ this.state }>
            <Router>
              <Switch>
                  <Route path ="/login" component ={ LogIn }/>
                  <Route exact path ="/" component ={ LandingPage }/>
                  <Route path ="/viewer" component ={ Viewer }/>
                  <Route path ="/newview" component ={ CardViewer }/>
              </Switch>
            </Router>
          </ModelContext.Provider>
      </React.Fragment>   
    );
  }
}

export default App; 

