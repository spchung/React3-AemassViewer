//This will be out Jumbotron thing for our LandingPage 
import React from 'react'
import { Jumbotron as Jumbo } from 'react-bootstrap';
import styled from 'styled-components';
import backdrop from '../assets/aemassGreyLogo.png';


const Styles = styled.div`
  .jumbo {
    background: url(${backdrop}) no-repeat scroll center;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

`;

const Jumbotron = () => (
    <Styles>
      <Jumbo fluid className="jumbo shadow p-3 mb-5 bg-white rounded">
        <div className="overlay"></div>
      </Jumbo>
    </Styles>
  );

  export default Jumbotron;