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

Amplify.configure(aws_exports);


///AWS 
// import AWS from 'aws-sdk';

class App extends Component{  
  constructor(props){
    super(props);
    
    this.state = { 
      models : [],
    };
  }

  componentDidMount() {
    this.fetchItems();

    
  };

  fetchItems = async () => {
    // //creates a promise that this json file will be loaded 
    // const response = await fetch('modelsArray.json')
    // //only proceedes after response has been properly loaded 
    // const data = await response.json();
    // this.setState({
    //   models: data.Objects
    // })
    var AWS = require("aws-sdk");
    var config = require("./config.json");
    AWS.config.update(config.aws);
    let docClient = new AWS.DynamoDB.DocumentClient();
    var params = { TableName : "Models_info"};

    docClient.scan(params, function(err, data) {
      if (err) {
          console.log('fetch error' + JSON.stringify(err,null,2));
      }
      else {
          console.log('fetch success' + JSON.stringify(data,null,2));
          this.setState({
              models : data.Items
          })
      }
    }.bind(this))
  }
  
  render() { 
    return(
      // <ModelProvider>
      //   <TestReceive />
      // </ModelProvider>

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



      //<Router>
      //    <div>
      //     <Route path='/home' component ={ Home }/>
      //     <Route path='/shop' component ={ Shop }/>
      //   </div>
      // </Router>
     
      

      // <React.Fragment>
      //   <AppContext.Provider value ={ this.state }>
      //     <ModelContext.Provider value ={ this.state }>
      //     <div>
      //         <div>
      //           {this.state.showWebGL ? (
      //           <div>
      //             <Viewer/> 
      //           </div>
      //           ):
      //           <div>
      //             <LandingPage/> 
      //           </div>
      //           }
      //         </div>
      //     </div>
      //     </ModelContext.Provider>
      //   </AppContext.Provider>
      // </React.Fragment>  
    );
  }
}

export default App; 

