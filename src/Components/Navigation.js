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
  a, .navbar-brand, .navbar-nav .nav-item {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
 a.Link { 
    color: red;
  }

  /*Strip the ul of padding and list styling */

ul {
    list-style-type: none; 
    margin: 0; 
    padding: 0;
    position: absolute;
}

/* Creates a horizontal list with spacing*/

li {
  display: inline-block;
  float: left;
  margin-right: 1px;
}

/*Style for menu links */

li a {
  display: block;
  min-width: 140px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #fff;
  background: #2f3036;
  text-decoration: none; 
  
}

/* Hover State for top level links*/

li:hover a {
  background: #19c589;
}

/* Style for dropdown links*/

li:hover ul a {
  background: #f3f3f3;
  color: #2f3036;
  height: 40px;
  line-height: 40px;
}

/* Hover state for dropdown links */ 
li:hover ul a:hover {
  background: #19c589;
  color: #fff;
}

/*Hide dropdown links until they are need */
li ul {
  display: none;
}

/*Make dropdown links vertical */

li ul li {
  display: block; 
  float: none; 
}

/*Prevent text wrapping */
li ul li a {
  width: auto; 
  min-width: 100px; 
  padding: 0 20px; 
}

/*Display the dropdown on hover */
ul li a:hover + .hidden, .hidden:hover {
  display: block; 
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
                        <Nav.Item><Link to="/">Home</Link></Nav.Item>
                        <Nav.Item><Link to='#'>Gallery</Link></Nav.Item>
                        <Nav.Item><Link to="/viewer">Custom Viewer</Link></Nav.Item>
                    </Nav>
                }</AppContext.Consumer>
            </Navbar.Collapse>
        </Navbar>
    </Styles>

    // <Styles>
    //   <div className="navigation">
    //     <Navbar.Brand> AEMASS </Navbar.Brand>
    //       <ul id="menu">
    //         <li><a href="#">Home</a></li>
    //         <li>
    //             <a href="#">About </a>
    //             <ul class="hidden">
    //               <li><a href="#">Who We Are</a></li>
    //               <li><a href="#">What We Do</a></li>
    //             </ul>
    //         </li>
    //         <li>
    //           <a href="#">Portfolio</a>
    //           <ul class="hidden">
    //             <li><a href="#">Photography</a></li>
    //             <li><a href="#">Web & User Interface Design</a></li>
    //             <li><a href="#">Illustration</a></li>        
    //           </ul>
    //         </li>
    //         <li><a href="#">News</a></li>
    //         <li><a href="#">Contact</a></li>
    //       </ul>
    //   </div>
    // </Styles>
)

export default Navigation;
