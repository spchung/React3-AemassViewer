import { createContext } from 'react'
import modelJSON from '../models.json'

/* React Context API allows you to access information across your component tress structure 
without having to manually pass down inofrmation through connecting components */
// Think of this as a "global" variable class for all components 
// Please read about the Context Provider and Consumer tags online 


//
class Model {
    constructor( name, URL, imageURL, description ) {
        this.name = name;
        this.URL = URL;
        this.imageURL = imageURL;
        this.description = description; 
    }
}

const Model_1 = new Model('Model_1', '1 de URL', '1 de image de URL', 'This is test model number 1');
const Model_2 = new Model('Model_2', '2 de URL', '2 de image de URL', 'This is test model number 2');
const Model_3 = new Model('Model 3', '3 de URL', '3 de image de url', 'this is test model number 3 ')


const ModelInfoContext = createContext({
    
    Models: { 
        Model_0: [{
        name : 'Model-Name',
        url : 'Model .glb url ( in assets folder )',
        image : 'Model card image ( in assets folder )',
        description : 'model plain-text description ',
    }],Model_2: [{
        name : 'Model-Name',
        url : 'Model .glb url ( in assets folder )',
        image : 'Model card image ( in assets folder )',
        description : 'model plain-text description ',
    }],}

});

export default ModelInfoContext;