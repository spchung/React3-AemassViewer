//system 
import React,{Component}from 'react'
import Jumbotron from './Jumbotron'
import Gallery from './Gallery'
import Navigation from './Navigation'
//import context 
import { ModelContext } from './../Contexts/ModelInfo'
const apis = require('./../api.json');

class LandingPage extends Component{
    state={
        models: [],
        currUserAccess:'noAccess'
    }
    componentDidMount(){
        var access="bird";
        access = this.receiveProps();
        ///INVOKE AWS LAMBDA  
        fetch(`${apis.modelInfoByAccess}${access}`)
        .then(res => res.json())
        .then(res => res.body)
        .then(res => JSON.parse(res))
        .then(models => {
            this.setState({
                models:models
            })
        })
    }

    receiveProps = () => {
        this.setState({
            currUserAccess: this.props.location.state.access
        })
        return this.props.location.state.access
    }

    render(){
        return(
            <div>
             <ModelContext.Provider value ={this.state}>
                 <Navigation accessLevel = {this.state.currUserAccess}/>
                 <Jumbotron/>   
                 <Gallery/>
             </ModelContext.Provider>
         </div>
        )
    }
}

export default LandingPage;
