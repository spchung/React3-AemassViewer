//system 
import React,{Component}from 'react';
import Jumbotron from './Jumbotron';
import Gallery from './Gallery';
import Navigation from './Navigation';
//import context 
import { ModelContext } from './../Contexts/ModelInfo';
import { Redirect } from 'react-router-dom';

//Explain this.props.location.state.access

const apis = require('./../api.json');

class LandingPage extends Component{
    constructor(){
        super();
        this.state={
            models: [],
            currUserAccess:'noAccess'
        }
        this.localStorage=window.localStorage;
        this.loggedIn = JSON.parse(this.localStorage.getItem('isSignIn'));
    }

    checkSignInStatus(localStorageKey){
        let val = this.localStorage.getItem(localStorageKey);
        if (val === 'true') return true;
        else return false;
    }

    componentDidMount(){
        ///API Call
        fetch(`${apis.modelInfoByAccess}${this.props.location.state.access}`)
        .then(res => res.json())
        .then(res => res.body)
        .then(res => JSON.parse(res))
        .then(models => {
            this.setState({
                models:models
            })
        })
    }

    render(){
        if (this.loggedIn === true){
            return(
                <div> 
                    <ModelContext.Provider value ={this.state}>
                        <Navigation accessLevel = 'png'/>
                        <Jumbotron/>   
                        <Gallery/>
                    </ModelContext.Provider>
                </div>
            )
        }
        else {
            return(
                <Redirect to='/'/>
            )
        }
    }
}

export default LandingPage;
