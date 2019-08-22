//system
import React from 'react';
import AppContext from '../Contexts/Context';
//style
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

// anything inside of backticks `` are interpurted as string in JS ES6 
const Styles = styled.div`
  .navbar {
    background-color: gray;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

const Navigation = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand> AEMASS </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <AppContext.Consumer>{({
                        name, ShowWebGL, HideWebGL
                    }) =>
                    <Nav className='ml-auto'>
                        <Nav.Item><Nav.Link onClick={() => HideWebGL() }>Home</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link>Gallery</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link onClick={() => ShowWebGL() }>Custom Viewer</Nav.Link></Nav.Item>
                    </Nav>
                }</AppContext.Consumer>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)

export default Navigation;
