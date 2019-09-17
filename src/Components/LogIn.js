import React, { Component } from 'react';
//components 
import LoginNav from './LoginNav';
import LoginFormPres from './LoginFormPres';

const apis = require('./../api.json');

/// LocalStorage
/// pair 1: ('isLoggedIn', BOOLEAN)
/// pair 2: ('access', STRING(get from API response))

//workflow: handleSubmit => getAccess => handleUnAuth => Auth? (show warning) : redirect to landing with access

class LogIn extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password: '',
            access:'',
        }
        this.localStorage = window.localStorage; // init localStorage 
        this.localStorage.setItem('isSignIn','false');
    }
    //API CALL 
    getAccess = async (userObj) =>{
        let username = userObj.username;
        let password = userObj.password;
        let result;
        await fetch(`${apis.getAccessLevel}username=${username}&password=${password}`)
         .then(res => res.json())
          .then(data => { result = data.body });
           return result;
    }
    
    continueAsGuest = () => {
        this.props.history.push({
            pathname: '/landing',
            state: {
                access: 'noAccess',
            },
        })
        this.localStorage.setItem('isSignIn','true')
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let accessLevel = await this.getAccess(this.state);
        this.handleUnauthorizedUser(accessLevel);
    }

    handleUnauthorizedUser = (accessLevel) => {
        if (accessLevel === 'unAuthorized'){
            let warningBox =document.getElementById('warning');
            warningBox.hidden = false;
        }
        else{
            this.localStorage.setItem('isSignIn','true');
            this.setState({
                access: accessLevel,
            });
            this.props.history.push({
                pathname: '/landing',
                state: {
                    access: this.state.access
                }
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        }); 
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }
    //add Link to this component and nav to it with pathname or even state
    render(){
        return (
            <React.Fragment>
                <LoginNav/>
                <LoginFormPres 
                handleSubmit={this.handleSubmit} 
                handleChange={this.handleChange}
                continueAsGuest={this.continueAsGuest} 
                validateForm={this.validateForm}
                state={this.state}
                />
            </React.Fragment>
        )
    }
}

export default LogIn; 
