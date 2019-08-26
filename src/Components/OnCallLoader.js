/// This Functional Component 

import React, { Component } from 'react';
// import Three_GLTFLoader from 'three-gltf-loader';
// import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Model Context 
import { ModelContext } from '../Contexts/ModelInfo'

/// QUESTION HOW TO DO THIS IN CODE /// 
// import parrot from '../assets/test/ParrotS.glb'

//Renders the 'view' button on every single card on the main landing page 


class OnCallLoader extends Component {
    constructor(props){
    super(props);
        this.state = {
            modelURL : ''
        }

    //Need an event handler to handle going back to main menu 
    }

    handleViewerClicked = () => {
        const modelLink = document.getElementById('link'); 
        modelLink.click();
    }


    render(){
        return(
        <ModelContext.Consumer>{({ models }) =>
            <React.Fragment>
                {/* <Button variant="primary" onClick={this.handleViewerClicked() }>View</Button> */}
               <Link className = "link" to={{
                    pathname: '/newview',
                    state : {
                        url : `${ this.props.URL }`
                    }
                }}>View</Link>
            </React.Fragment>
        }</ModelContext.Consumer>
        )
    }
}

// `'${ this.props.modelURL }'`

///////////
////THIS MIGHT COME IN HANDY LATER 
// var request = new XMLHttpRequest();
// request.open('GET', MY_URL, true);
// request.responseType = 'blob';
// request.onload = function() {
//     var reader = new FileReader();
//     reader.readAsDataURL(request.response);
//     reader.onload =  function(e){
//         console.log('DataURL:', e.target.result);
//     };
// };
// request.send();



export default OnCallLoader;