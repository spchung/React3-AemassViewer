import React, { Component } from 'react';
import { Button, Form, Container  } from "react-bootstrap";
import styled from 'styled-components';

//components 
import Jumbotron from './Jumbotron'


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
`;

class LogIn extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password: '' 
        }
    }

    // formData: {}, // Contains login form data
    // errors: {}, // Contains login field errors
    // formSubmitted: false, // Indicates submit status of login form
    // loading: false // Indicates in progress state of login form

    handleSubmit = (event) => {
        event.preventDefault();
        let form = event.target;
        // let mail = form.
        console.log(form);
        console.log(form.elements.title)
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
        return (
            <Styles>
                <div className="Login">
                    <Jumbotron/>
                    <Container className='form-container shadow p-3 mb-5 bg-white rounded'>
                        <Form onSubmit={ this.handleSubmit }>
                            <Form.Group controlId="username">
                            <Form.Label>User Name</Form.Label>
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
                            <Button
                                block
                                disabled={ !this.validateForm() }
                                type="submit">
                                Login
                            </Button>
                        </Form>
                    </Container>
                </div>
            </Styles>
        )
    }



}

export default LogIn; 
