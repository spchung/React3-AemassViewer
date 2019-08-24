//system 
import React from 'react'
import Jumbotron from './Jumbotron'
import Gallery from './Gallery'
import Header from './Header'
//import style 

const LandingPage = () => { 
    return(
        <div>
            <Header/>
            <Jumbotron/>   
            <Gallery/>
        </div>

    )  
    
}

export default LandingPage;
