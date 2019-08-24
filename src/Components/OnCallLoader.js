/// This Functional Component 

import React, { Component } from 'react';
// import Three_GLTFLoader from 'three-gltf-loader';
// import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader'
import { Button } from 'react-bootstrap'
//Model Context 
// import ModelInfoContext from '../Contexts/ModelInfo'

/// QUESTION HOW TO DO THIS IN CODE /// 
// import parrot from '../assets/test/ParrotS.glb'

//Renders the 'view' button on every single card on the main landing page 


class OnCallLoader extends Component {
    constructor(props){
    super(props);
        //use this.props.{whatever} to access information passed down from compo
    this.state = {
        model: '',
    }
    //Need an event handler to handle going back to main menu 
    }

    handleViewerClicked(modelURL) {
        // imports glb files directly with require and load trditionally 
        var model = require(`../assets/test/${modelURL}`);
        console.log(model);
        
        var gltfLoader = new GLTFLoader();
        gltfLoader.load( model, 
            function( gltf ){
                console.log(gltf.scene)
            })
        
        // var fileLoader = new FileReader();
        // var loaded = fileLoader.readAsArrayBuffer(model);



        
    }

    setStateModel(url) {
        this.setState({
            model : url
        })
    }

    render(){
        return(
        
            <React.Fragment>
                <Button variant="primary" onClick={ e => this.handleViewerClicked(this.props.modelURL)}>View</Button>
            </React.Fragment>
         
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