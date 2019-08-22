//system 
import React from 'react'
import Jumbotron from '../Jumbotron'
import Gallery from '../Gallery'
import { Button } from 'react-bootstrap';
//import style 

const LandingPage = () => { 
    return(
        <div>
            <Jumbotron/>   
            <Gallery/>
            <Button>HELLP</Button>
        </div>

    )  
    
}

export default LandingPage;
