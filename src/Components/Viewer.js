///WebGL Viewer Component/// 
/*  This component contains the viewer portion of this application. 
    Important functions 
    1. A lifeCycle suite that puts everything inplace when it mounts (gets instantiated)
    2. A CallBackLoadGLTF method that listens to GLTFLoader.js and puts in inanimate models 
    3. A ReceiveAnimatedModel that is called when an animated model is loaded, loads the animation, and then plays */

import React, { Component } from 'react';
// 3rd party 
import * as THREE from 'three'
import THREE_GLTFLoader from 'three-gltf-loader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import {Button} from 'react-bootstrap';
//components 
import GLTFLoader from './GLTFLoader'
import Header from './Header'
// import bird from '../assets/test/ParrotS.glb'
import { Button } from 'react-bootstrap'

class Viewer extends Component {
    constructor(props){
        super(props);
        this.state = {
            size: {
                width: 0,
                height: 0,
            },
            name: "PARROT",
        }
        this.LOADPARROT = this.LOADPARROT.bind(this);
    }

    componentDidMount(){

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
        //For Animation 
        this.mixers = []; 
        this.clock = new THREE.Clock();

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

    renderScene = () => { 
        this.renderer.render(this.scene, this.camera); 
    }

    updateFrame = () => {
        this.delta = this.clock.getDelta();
        //Use this instead of (mixer in mixers) because react cant seem to get mixer type 
        for (let i=0; i < this.mixers.length; i++){
            this.mixers[i].update( this.delta );
        }
    }

    //receives loaded .glb models and straight add it to this scene
    CallBackLoadGLTF = (obj_scene) => { 
        //get model scale for repositioning model and camera 
        let objBox = new THREE.Box3().setFromObject( obj_scene.children[0] );
        // return objBox;
        var sizeArray = [objBox.max.x - objBox.min.x, objBox.max.y - objBox.min.y, objBox.max.z - objBox.min.z,];
        console.log(Math.max(...sizeArray));
        this.camera.position.z = Math.max(...sizeArray);
        //ADD and reposition object
        this.scene.add(obj_scene);
        obj_scene.position.y = -(objBox.max.y - objBox.min.y)/2;
        this.scene.remove(this.cube);
    }
    
    ReceiveAction = ({ mixer, animation }) => {
        this.mixers.push(mixer)
        const action = mixer.clipAction(animation);
        action.play();
    }

    animate = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderScene();
        this.updateFrame();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    // resizeCanvasOnChange = () => {
    //     let wdth = window.clientWidth
    //     let hight = window.clientHeight
    //     this.setState({
    //         size: {
    //             width: wdth,
    //             height: hight,
    //         }
    //     });
    // }


    LOADPARROT = (parroturl) => {
        var model = require(`../assets/test/${parroturl}`)

        var GLTF = new THREE_GLTFLoader();
    
        // var MODEL = gltfLoader.load(model, function (gltf) { return gltf });
        // console.log(MODEL);
        GLTF.load( model, 
            ( modelglb ) =>
            { 
                this.scene.add(modelglb.scene)

            })

    }
    
    // this.mount points the the div tags enclosing it 
    // ref= { ( mount ) => { this.mount = mount }} -> this is equivalent to React.creatRef and points to its DOM element 
    render() { 
        return(
                <div id='ThreeJS' style={{ width: '100vw', minHeight: '100vh', position: 'fixed'}} ref ={ (content) => { this.mount = content }}>
                    <Header/>
                    <GLTFLoader value = {this.props.value } load2Scene = { this.CallBackLoadGLTF } SendAction = { this.ReceiveAction } />
                    <Button onClick={ () => this.LOADPARROT('first_new.glb')}>PARROT</Button>
                </div>
        );
    }
}
    


// style={{ width: '100vw', minHeight: '100vh', position: 'fixed'}}
// style={{height:'auto',overflow:'scroll',maxHeight:'200px'}}
export default Viewer; 

//Additional Optional Method 
//same as using ref ={ (content) => { this.mount = content }, pass ref = {this.setMount} in 
    // setMount = ( mount ) => {
    //   this.mount = mount;
    // }
    