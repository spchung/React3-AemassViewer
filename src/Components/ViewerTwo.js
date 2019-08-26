import React, { Component } from 'react';
// 3rd party 
import * as THREE from 'three'
import THREE_GLTFLoader from 'three-gltf-loader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// DEV note: 
// This class works with conjunction and receives model info from the OnCallLoader Class 

class NewView extends Component {
    state = {
        URL : ''
    }

    componentDidMount(){
        //get props from other OnCallViewer 
        this.receiveProps();
        //Set Up Scene 
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        //ADD SCENE
        this.scene = new THREE.Scene();
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000);
        this.camera.position.z = 4;
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor('#000000');
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        //ORBIT CONTROL 
        this.controller = new OrbitControls( this.camera, this.renderer.domElement );
        //Lighting 
        this.ambLight = new THREE.AmbientLight( 0x404040, 3 );
        this.scene.add( this.ambLight );

        //ADD CUBE
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        // this.onClickLoader();
        this.startAnimation();
        
    }

    componentWillUnmount(){
        this.stopAnimation();
        this.mount.removeChild(this.renderer.domElement);
    }

    startAnimation = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    stopAnimation = () => { 
        cancelAnimationFrame(this.frameId); 
    }

    animate = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene = () => { 
        this.renderer.render(this.scene, this.camera); 
    }

    receiveProps(){
        const { url } = this.props.location.state;
        console.log( url);

        this.setState({ URL : url }, function(){
            console.log(this.state.URL);
            this.onClickLoader();
        });
        
    }

    onClickLoader ()  {
        if (!this.state.URL){
            console.log('no model found ');
            return; 
        }
        else {
            console.log('model found ');
            console.log(this.state.URL);
            var model = require(`../assets/test/${this.state.URL}`);
            var GLTF = new THREE_GLTFLoader();
            GLTF.load( model, 
                ( modelglb ) =>
                { 
                    this.scene.add(modelglb.scene);
    
                })
        }
    }
    
    render() {
        return (
            <div style={{ width: '100vw', minHeight: '100vh', position: 'fixed'}} ref ={ (content) => { this.mount = content }}> 
                <div> { this.state.url } </div>    
                {/* <button onClick ={ () => { this.onClickLoader( this.state.url) }} > Load this </button> */}
            </div>
        );
    }

} 

export default NewView;