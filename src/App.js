// The Final App that will be rendered, all components should end up here. 
import React, { Component } from 'react';
//components 
import './App.css';
import Viewer from './Components/Viewer';
import LandingPage from './Components/Landing /Landing'
import Header from './Components/Header';

///CONTEXT///
import AppContext from './Contexts/Context'

class App extends Component{  
  constructor(props){
    super(props);
    this.state = { 
      name: 'Stevo',
      showWebGL: false,
      ShowWebGL: () => this.showWebGL(), 
      HideWebGL: () => this.hideWebGL(),
    }
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
      <React.Fragment>
        <AppContext.Provider value = { this.state }>
          <div>
              <div>
                {this.state.showWebGL ? (
                  <div>
                  <Header/>
                  <Viewer/>
                </div>
                ):
                <div>
                  <Header/>
                  <LandingPage />
                </div>
                }
              </div>
          </div>
        </AppContext.Provider>
      </React.Fragment>  
    );
  }
}

const style = {
  position:'absolute',
  right: '50px'
}

export default App; 

