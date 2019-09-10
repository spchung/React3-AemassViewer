import React, { Component } from 'react';
// 3rd party 
// import * as THREE from '../three.min.js';
// import * as Three_GLTFLoader from '../GLTFLoader.js';
// import * as THREE from 'three';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// import Three_GLTFLoader from 'three-gltf-loader';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Spinner } from 'react-bootstrap';
import GreyBackground from '../assets/greyBack.png';
//data
const apis = require('./../api.json');

const THREE = window.THREE = require('three');
require('three/examples/js/loaders/GLTFLoader');
require('three/examples/js/loaders/NEWDracoLoader');

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

    //////
    componentDidMount(){
        // this.getSK2();
        //get props from other OnCallViewer 
        this.receiveProps();
        //Set Up Scene 
        this.init();
        //Lighting 
        this.addLights();
        //background 
        this.loadBackGround( GreyBackground );
        //For Animation 
        this.mixers = []; 
        this.clock = new THREE.Clock();
        //Responisve design 
        window.addEventListener( 'resize', this.onWindowResize, false );
        // this.onClickLoader();
        this.startAnimation();
    }
    componentWillUnmount(){
        this.stopAnimation();
        this.mount.removeChild(this.renderer.domElement);
    }

    init = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        //ADD SCENE
        this.scene = new THREE.Scene();
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000);
        this.camera.position.z = 4;
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ alpha: false });
        this.renderer.setClearColor('#000000');
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        //ORBIT CONTROL 
        this.controller = new OrbitControls( this.camera, this.renderer.domElement );
    }

    addLights = () => { 
        this.ambLight = new THREE.AmbientLight( 0x404040, 3 );
        this.scene.add( this.ambLight );
        const color = 0xFFFFFF;
        const intensity = 1;
        const toplight = new THREE.DirectionalLight(color, intensity);
        const bottomlight = new THREE.DirectionalLight(color, intensity/2);
        toplight.position.set(0, 10, 0);
        toplight.target.position.set(-5, 0, 0);
        bottomlight.position.set(0,-10,0);
        bottomlight.target.position.set(0,0,0);
        this.scene.add(toplight, bottomlight);
        this.scene.add(toplight.target, bottomlight.target);
    }

    loadBackGround = (url) => {
        var texture = new THREE.TextureLoader().load( url );
        var backgroundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2, 0),
            new THREE.MeshBasicMaterial({
                map: texture
            }));

        backgroundMesh.material.depthTest = false;
        backgroundMesh.material.depthWrite = false;

         // Create your background scene
         this.backgroundScene = new THREE.Scene();
         this.backgroundCamera = new THREE.Camera();
         this.backgroundScene.add( this.backgroundCamera );
         this.backgroundScene.add( backgroundMesh );
    }


    //makes the webGL responsive to window size change ans should handle different devices as well
    onWindowResize = () => {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    receiveProps= () => {
        const { url } = this.props.location.state;

        this.setState({ URL : url }, function(){
            console.log(this.state.URL);
            this.onClickLoader();
        });
    }

    onClickLoader = async () => {
        if (!this.state.URL) {
            return; 
        }
        else {
            // const local = "/Users/stephen/Desktop/fortnite_dj/scene.gltf"
            let v0 = performance.now();
            const modelUrl =  await this.fetchModelOnCall(this.state.URL);
            let v1 = performance.now();
            console.log("Api call took " + (v1 - v0) + " milliseconds.");
            // const modelUrl = 'https://aemass-viewer-data.s3.amazonaws.com/public/337_gms/scene.gltf?AWSAccessKeyId=AKIA46GGD6JHKJ5NG6US&Expires=1567679222&Signature=6D5P92ypz19RBCsSsynmAXRNkPQ%3D';
            // const modelUrl = 'https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf'
            var GLTFLoader = new THREE.GLTFLoader();
            var DracoLoader = new THREE.DRACOLoader();
            DracoLoader.setDecoderPath('../dracoDecoders/');
            GLTFLoader.setDRACOLoader(DracoLoader);
            let v2 = performance.now();
            GLTFLoader.load( modelUrl,
                ( model ) =>
                { 
                    document.getElementById('spin').remove();
                    this.isModelAnimated( model );
                    // this.scene.add(model.scene);
                    let v5 = performance.now();
                    console.log("loading image took "+ (v5 - v2) + " load time for model")
                }
            )
            let v3 = performance.now();
            console.log("finishing the loop " + (v3 - v2) + " milliseconds");
        }
    }

    fetchModelOnCall = async (url) => {
        console.log(`${apis.models}${url}`);
        var res = await fetch(`${apis.modelScene}${url}`);
        var res1 = await res.json();
        var res2 = await res1.body;
        return res2;

        // fetch(`https://5a0fp98223.execute-api.us-east-1.amazonaws.com/dev/scenes?scene=Parrot.glb`)
        //  .then(res => res.json())
        //  .then(res => res.body)
        //  .then(res => JSON.stringify(res))
        //  .then(res => {
        //      console.log(res);
        //      return res});
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

    startAnimation = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    stopAnimation = () => { 
        cancelAnimationFrame(this.frameId); 
    }

    renderScene = () => { 
        this.renderer.autoClear = false;
        this.renderer.clear();
        this.renderer.render( this.backgroundScene, this.backgroundCamera );
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
             <div id='canvas' style={ canvasStyle } ref={ (content) => { this.mount = content }}> 
                <div id='spin'>
                    <Spinner style={ spinnerStyle } animation="border" role="status"></Spinner>
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
    height: `100%`,
    display: 'block',
    position: 'fixed',

    backgroundImage: `url(../assets/greyBack.png)`,
    backgroundSize: 'cover'
}

export default CardViewer;