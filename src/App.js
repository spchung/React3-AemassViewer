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
//Amplify 
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import AWS from 'aws-sdk';
import configs from './config.json';

AWS.config.update(configs);
Amplify.configure(aws_exports);

class App extends Component{  
  constructor(props){
    super(props);
    this.state = { 
      models : [],
    };
  }

  componentDidMount() {
    ///INVOKE AWS LAMBDA  
    fetch('https://5a0fp98223.execute-api.us-east-1.amazonaws.com/dev/models')
     .then(res => res.json())
      .then(models => this.setState({
        models : models,
      }))
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

