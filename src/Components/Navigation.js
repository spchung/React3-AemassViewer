//system
import React from 'react';
//font
import '../App.css'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// anything inside of backticks `` are interpurted as string in JS ES6 
const Styles = styled.div`
* {
  box-sizing: border-box;
}
.nav {
  height: 60px;
  width: 100%;
  background-color: #4d4d4d;
  position: relative;
  font-family: 'Quicksand', sans-serif;
}
.nav > .nav-header {
  display: inline;
}
.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 30px;
  font-weight: 100;
  color: #fff;
  text-shadow: 3px 3px 50px #000000;
  padding: 5px 5px 5px 5px;
  margin: 2px 2px 2px 2px;  
}
.nav > .nav-btn {
  display: none;
}
.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 18px;
  position: absolute; 
  right: 15px;
  padding: 5px 5px 5px 7px;
  margin: 2px 2px 2px 0px;
}
.nav > .nav-links > a {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #efefef;
}
.nav > .nav-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
.nav > #nav-check {
  display: none;
}
@media (max-width:600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
    margin-top: 5px;
  }
  .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #333;
    height: 0px;
    transition: height 0.3s ease-in;
    overflow-y: hidden;
    top: 55px;
    left: 0px;
  }
  .nav > .nav-links > a {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: 165px;
    overflow-y: auto;
  }
}
`;

const Navigation = () => (
    <Styles>
        <div className="nav">
          <input type="checkbox" id="nav-check"/>
          <div className="nav-header">
            <div className="nav-title">
              Aemass Viewer
            </div>
          </div>
          <div className="nav-btn">
            <label htmlFor="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/viewer">CustomViewer</Link>
            <Link to="/login">Sign In </Link>
          </div>
        </div>
    </Styles>
)

export default Navigation;
