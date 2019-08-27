import React, { Component } from 'react';
// 3rd party 
import * as THREE from 'three';
import THREE_GLTFLoader from 'three-gltf-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Spinner } from 'react-bootstrap';

//Style
import './CardViewer.css';

// DEV note: 
// This class works with conjunction and receives model info from the OnCallLoader Class 

class CardViewer extends Component {
    constructor(){
    super();
    this.state = {
        URL : '',
    }

    this.LoadScreen = React.createRef();
    this.canvasRef = React.createRef();
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

        //For Animation 
        this.mixers = []; 
        this.clock = new THREE.Clock();

        window.addEventListener( 'resize', this.onWindowResize, false );
		

        // this.onClickLoader();
        this.startAnimation();
        
        
    }
    //makes the webGL responsive to window size change ans should handle different devices as well
    onWindowResize = () => {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    receiveProps(){
        const { url } = this.props.location.state;
        console.log( url);

        this.setState({ URL : url }, function(){
            console.log(this.state.URL);
            this.onClickLoader();
        });
        
    }

    onClickLoader(){
        if (!this.state.URL) {
            return; 
        }
        else {
            var modelURL = require(`../assets/test/${this.state.URL}`);
            var GLTFLoader = new THREE_GLTFLoader();
            GLTFLoader.load( modelURL, 
                ( model ) =>
                { 
                    // this.LoadScreen.current.innerHTML = '';
                    document.getElementById('spin').remove();
                    this.isModelAnimated( model );
                }
            )
        }
    }

    isModelAnimated = (model) => { 

        if (model.animations.length){

            let obj = model.scene.children[0];
            const mixer = new THREE.AnimationMixer(obj);
            const animations = model.animations[0];   

            this.mixers.push(mixer)
            const action = mixer.clipAction(animations);

            action.play();
        }

        this.CallBackLoadGLTF(model.scene);
    }

    CallBackLoadGLTF = (obj_scene) => { 
        //get model scale for repositioning model and camera 
        let objBox = new THREE.Box3().setFromObject( obj_scene.children[0] );
        // return objBox;
        var sizeArray = [objBox.max.x - objBox.min.x, objBox.max.y - objBox.min.y, objBox.max.z - objBox.min.z,];
        console.log(Math.max(...sizeArray));
        this.camera.position.z = Math.max(...sizeArray);
        //ADD and reposition object
        this.scene.add( obj_scene );
        obj_scene.position.y = -(objBox.max.y - objBox.min.y)/2;
        this.scene.remove(this.cube);
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

    renderScene = () => { 
        this.renderer.render(this.scene, this.camera); 
    }

    updateLoaderStatus = (loadstatus) =>{
        this.setState({
            LoadStatus : loadstatus
        })
    }
   

    updateFrame = () => {
        this.delta = this.clock.getDelta();
        //Use this instead of (mixer in mixers) because react cant seem to get mixer type 
        for (let i=0; i < this.mixers.length; i++){
            this.mixers[i].update(this.delta);
        }
    }

    animate = () => {
        this.renderScene();
        this.updateFrame();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    render() {
        return (
            <div>
             <div style={ canvasStyle } ref ={ (content) => { this.mount = content }}> 
                <div id='spin'>
                    <Spinner style ={ spinnerStyle } animation="border" role="status"></Spinner>
                </div>
             </div>
            </div>        
            );
    }
} 

const spinnerStyle = {
    position: 'absolute',
    right : '50%',
    bottom : '50%',
    color : 'white'
}

const canvasStyle = {
    width: '100%',
    height: '100%',
    display: 'block',
    position: 'fixed'

}

export default CardViewer;