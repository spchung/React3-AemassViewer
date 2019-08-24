/// GLTF LOADER COMPONENT ///
/* 1. Uses the JS built in FileReader to read any .glb file as an array buffer
   2. Then this component passes the buffer back to App.js through props
   3. CallBackLoadGltf in App.js does the parsing of the array and adds it to the scene 
   4. The isModelAnimated does this "isModelAnimated ? send animation files and model : send just the model"*/

import React, { Component } from 'react';
import Three_GLTFLoader from 'three-gltf-loader';
import * as THREE from 'three';
import { Button } from 'react-bootstrap';

class GLTFLoader extends Component {

    handleFileRead = () => {
        const content = this.fileReader.result;
        console.log("file reader result type", typeof(content))
        this.gltfLoader = new Three_GLTFLoader(); 
        // the second arg is a path to where gltf support files should be 
        this.gltfLoader.parse(content, '', (obj) => {
            this.isModelAnimated(obj);
        })
    }
    // will need a function that sends model information to backend 
    handleFileChosen = (file) => {
        console.log("initial file type on input", typeof(file))
        this.fileReader = new FileReader(); 
        this.fileReader.onloadend = this.handleFileRead;
        console.log("File type : ",file);
        this.fileReader.readAsArrayBuffer(file);
    }

    isModelAnimated = (loadedModel) => { 
        if( loadedModel.animations.length ){
            console.log(" found animations ");
            this.props.SendAction(this.sendAction(loadedModel));   
        }
        this.props.load2Scene(loadedModel.scene)
    }

    // send mixer(array) and animation(one frame) back to app.js so we can clip them together and play.
    sendMixer = (obj) => {
        let model = obj.scene.children[0];
        const mixer = new THREE.AnimationMixer( model );
        return mixer;
    }

    //sends action related info
    sendAction = (obj) => {
        let model = obj.scene.children[0];
        const mixer = new THREE.AnimationMixer( model );
        const animations = obj.animations[0];
        return {
            mixer: mixer,
            animation: animations,
        }
    }

    // the actual upload button
    onClickCustomButton = () => {
        const realFileButton = document.getElementById("real-file");
        realFileButton.click();
    }

    //Test Function load parrot directly
    loadParrot = (parroturl) => {

        var model = require(`../assets/test/${parroturl}`)

        var gltfLoader = new Three_GLTFLoader();
    
        // var MODEL = gltfLoader.load(model, function (gltf) { return gltf });
        // console.log(MODEL);
        gltfLoader.load( model, 
            function( gltf )
            { 
                // loadedModel = gltf.scene 

            })

        // async function createFile(){
        //     let response = await fetch(`../assets/test/${parroturl}`);
        //     let data = await response.blob();
        //     let metadata = {
        //       type: 'glb'
        //     };
        //     let file = new File([data], "test.glb", metadata);
        //     // ... do something with the file or return it

        //     return file;
        //   }
          
        //   var loadedBlob = createFile();
        //   this.fileReader.readAsArrayBuffer(loadedBlob);
        //   console.log('ArraybuffResult : ', this.fileReader.result)

    }

    //target refers to the input tag > whatever starts an event
    render(){
        return(
            <div>
                <input type="file" 
                    style={ styleSheet } 
                    id="real-file"
                    accept='.glb'
                    onChange={ e => this.handleFileChosen(e.target.files[0]) } hidden="hidden"/>
                <Button 
                    style={styleSheet} 
                    onClick = { this.onClickCustomButton }
                    className="upload">Upload File</Button>
                {/* <Button varient='primary' onClick ={ e => this.loadParrot('ParrotS.glb')}> load this parrot  </Button> */}
            </div>
        )
    }
}

const styleSheet = {
    position: 'fixed',
    top:'20%',
	right:15,
	width:'100px',
    backgroundColor: 'grey',
    border: '0px', 
}



export default GLTFLoader; 
