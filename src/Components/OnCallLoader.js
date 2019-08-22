/// This Functional Component 

import React, { Component, createContext } from 'react';
import Three_GLTFLoader from 'three-gltf-loader';
import * as THREE from 'three';
import { Button } from 'react-bootstrap';

//Renders the 'view' button on every single card on the main landing page 


class OnCallLoader extends Component {
    constructor(props){
    super(props);
        //use this.props.{whatever} to access information passed down from compo
    this.state = {
        name: 'onCallLoader'
    }
    //Need an event handler to handle going back to main menu 
    }

    logOnClick(){
        console.log('view button clicked');
    }


    render(){
        return(
            <Button variant="primary" onClick={this.logOnClick}>View</Button>
        )
    }
}



export default OnCallLoader;