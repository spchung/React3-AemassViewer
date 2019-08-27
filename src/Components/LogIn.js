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
            email: '',
            password: '' 
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        }); 
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    render(){
        return (
            <Styles>
                <div className="Login">
                    <Jumbotron/>
                    <Container className='form-container shadow p-3 mb-5 bg-white rounded'>
                        <Form onSubmit={ this.handleSubmit }>
                            <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                                <Form.Control
                                autoFocus
                                type="email"
                                value={ this.state.email }
                                onChange={ this.handleChange }
                                placeholder='Enter your email...'
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
