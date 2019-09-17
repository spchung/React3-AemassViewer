// Simple presentational component for LogIn - 單純拿來裝LogIn.js算好的東西
import React from 'react';
import { Button, Form, Container, Row, Alert} from "react-bootstrap";
import styled from 'styled-components';

const warning = 'Unauthorized username or password, please sign in as guest or contact us';
const LogInForm = (props) => (
    <Styles>
        <div className="Login">
            {/* should look into how to center Container instead of stuffing row before it  */}
            <Row className='mb-5'></Row>
            <Row className='mb-5'></Row>
            <Row className='sm-5'></Row>
            <Container className='form-container shadow p-3 mb-5 bg-white rounded'>
                <Form onSubmit={ props.handleSubmit }>
                    <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                        <Form.Control
                        autoFocus
                        type="username"
                        value={ props.state.username }
                        onChange={ props.handleChange }
                        placeholder='Enter your user name...'
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                        <Form.Control
                        value={ props.state.password }
                        onChange={ props.handleChange }
                        type="password"
                        placeholder='Enter your password...'
                        />
                    </Form.Group>
                    <Button block
                        disabled={ !props.validateForm() }
                        type="submit">
                        Login
                    </Button>
                    <Button block onClick={props.continueAsGuest}>
                        Continue as Guest 
                    </Button>
                </Form>
            </Container>
            <Alert className ='warning' 
            id='warning' hidden='hidden' 
            variant='danger'>{warning}
            </Alert>
        </div>
    </Styles>
)

export default LogInForm;


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