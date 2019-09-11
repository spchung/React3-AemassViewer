import React, { Component } from 'react';
import { Button, Form, Container, Row, Alert} from "react-bootstrap";
import styled from 'styled-components';

//components 
import LoginNav from './LoginNav';

const apis = require('./../api.json');

const Styles = styled.div`
  .Login form {
    margin: 5px;
    max-width: 320px;
  }
  
  .form-container { 
      background-color: #64b5f6;
      padding: 15px; 
      max-width: 320px;
    }

  .warning{
    max-width: 500px;
    text-align: center;
    margin:auto;
    
    
  }
`;

class LogIn extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password: '',
            access:'' 
        }
    }
    

    getAccess = async (userObj) =>{
        let username = await userObj.username;
        let password = await userObj.password;
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
                access: 'noAccess'
            }
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        //API goes here 
       let accessLevel = await this.getAccess(this.state);
       this.handleUnauthorizedUser(accessLevel);
    //    this.setState({
    //        access: accessLevel
    //    });
       //handle unAuth
    //    this.handleUnauthorizedUser(this.state.accessLevel);

    //    this.props.history.push({
    //        pathname: '/landing',
    //        state: {
    //            access: this.state.access
    //         }
    //     })
    }

    handleUnauthorizedUser = (accessLevel) => {
        if (accessLevel === 'unAuthorized'){
            let warningBox =document.getElementById('warning');
            warningBox.hidden = false;
            // warningBox.innerHTML = warning;
        }else{
            this.setState({
                access: accessLevel
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

    render(){
        let warning = 'Unauthorized username or password, please sign in as guest or contact us';
        return (
            <Styles>
                <div className="Login">
                    <LoginNav/>
                    {/* should look into how to center Container instead of stuffing row before it  */}
                    <Row className='mb-5'></Row>
                    <Row className='mb-5'></Row>
                    <Row className='sm-5'></Row>
                    <Container className='form-container shadow p-3 mb-5 bg-white rounded'>
                        <Form onSubmit={ this.handleSubmit }>
                            <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                                <Form.Control
                                autoFocus
                                type="username"
                                value={ this.state.username }
                                onChange={ this.handleChange }
                                placeholder='Enter your user name...'
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                                <Form.Control
                                value={ this.state.password }
                                onChange={ this.handleChange }
                                type="password"
                                placeholder='Enter your password...'
                                />
                            </Form.Group>
                            <Button block
                                disabled={ !this.validateForm() }
                                type="submit">
                                Login
                            </Button>
                            <Button block onClick={this.continueAsGuest}>
                                continue as guest 
                            </Button>
                            {/* <Link className="link" onClick={this.logClick} to={{
                                pathname: '/',
                                state : { 
                                    userAccess : `${ this.state.access }`,
                                }
                            }}>to main</Link> */}
                        </Form>
                    </Container>
                    {/* <Container className='shadow p-3 mb-5 bg-white rounded' 
                    id='warning' hidden='hidden'> */}
                        <Alert className ='warning' id='warning' hidden='hidden' variant='danger'> {warning} </Alert>
                    {/* </Container> */}
                </div>
            </Styles>
        )
    }



}

export default LogIn; 
