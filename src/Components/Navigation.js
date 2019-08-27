//system
import React from 'react';
import AppContext from '../Contexts/Context';
//style
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// anything inside of backticks `` are interpurted as string in JS ES6 
const Styles = styled.div`
  .navbar {
    background-color: gray;
  }
  a, .navbar-brand, .navbar-nav  {
    color: #bbb;
    &:hover {
      color: white;
    }
  }

  .nav-item {
    margin: 5px;
  }
`;

const Navigation = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand> AEMASS </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className='ml-auto'>
                  <Nav.Item><Link to="/">Home</Link></Nav.Item>
                  <Nav.Item><Link to='#'>Gallery</Link></Nav.Item>
                  <Nav.Item><Link to="/viewer">Custom Viewer</Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)

export default Navigation;
