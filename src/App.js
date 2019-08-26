// The Final App that will be rendered, all components should end up here. 
import React, { Component } from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//components 
import './App.css';
import Viewer from './Components/Viewer';
import LandingPage from './Components/Landing';
import CardViewer from './Components/CardViewer';

///CONTEXT///
import AppContext from './Contexts/Context'
import { ModelContext } from './Contexts/ModelInfo'

class App extends Component{  
  constructor(props){
    super(props);
    
    this.state = { 
      name: 'Stevo',
      showWebGL: false,
      ShowWebGL: () => this.showWebGL(), 
      HideWebGL: () => this.hideWebGL(),
      models : [],
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = async () => {
    //creates a promise that this json file will be loaded 
    const response = await fetch('modelsArray.json')
    //only proceedes after response has been properly loaded 
    const data = await response.json();
    
    this.setState({
      models: data
    })
  }

  showWebGL = () =>  {
    this.setState({
      showWebGL: true,
    })
  }

  hideWebGL = () => { 
    this.setState({
      showWebGL: false,
    })
  }

  
  render() { 
    return(
      // <ModelProvider>
      //   <TestReceive />
      // </ModelProvider>

      <React.Fragment>
        <AppContext.Provider value ={ this.state }>
          <ModelContext.Provider value ={ this.state }>
            <Router>
              {/* <Switch> */}
                <div className='App'>
                  <Route exact path ="/" component ={ LandingPage }/>
                  <Route path ="/viewer" component ={ Viewer }/>
                  <Route path ="/newview" component= { CardViewer }/>
                </div>
              {/* </Switch> */}
            </Router>
          </ModelContext.Provider>
       </AppContext.Provider>
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

