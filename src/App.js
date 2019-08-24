// The Final App that will be rendered, all components should end up here. 
import React, { Component } from 'react';
import axios from 'axios';
//components 
import './App.css';
import Viewer from './Components/Viewer';
import LandingPage from './Components/Landing'

///CONTEXT///
import AppContext from './Contexts/Context'
import ModelInfoContext from './Contexts/ModelInfo'

class App extends Component{  
  constructor(props){
    super(props);
    
    this.state = { 
      name: 'Stevo',
      showWebGL: false,
      ShowWebGL: () => this.showWebGL(), 
      HideWebGL: () => this.hideWebGL(),
      models : [
        // { name: "bobby", lastName : "Lee", occupation : "comedian" },
        // { name: "stepen", lastName : "chung", occupation: "broke ass fucker" },
      ],
    };
  }

  componentDidMount() {
    
    // place temporary place holders in /public for easy access like below 
    axios.get('modelsArray.json').then(res => {
      this.setState({ models : res.data });
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
      // <ul>
      //   {this.state.models.map(model => <li>{model.name}</li>)}
      // </ul>
      <React.Fragment>
        <AppContext.Provider value = { this.state }>
          <ModelInfoContext.Provider value ={ this.state }>
          <div>
              <div>
                {this.state.showWebGL ? (
                  <div>
                    {/* <AppContext.Provider value = { this.state }> */}
                    <Viewer/> 
                    {/* </AppContext.Provider> */}
                </div>
                ):
                <div>
                  {/* {this.state.Model.map(item => (
                    <li key={item.name}>the person is { item.occupation }.</li>
                  )) } */}
                  {/* <AppContext.Provider value = { this.state }> */}
                  <LandingPage /> 
                  {/* </AppContext.Provider> */}
                </div>
                }
              </div>
          </div>
          </ModelInfoContext.Provider>
        </AppContext.Provider>
      </React.Fragment>  
    );
  }
}

export default App; 

