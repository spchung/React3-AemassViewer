import { createContext } from 'react'
// import modelJSON from '../models.json'

/* React Context API allows you to access information across your component tress structure 
without having to manually pass down inofrmation through connecting components */
// Think of this as a "global" variable class for all components 
// Please read about the Context Provider and Consumer tags online 


//
// class Model {
//     constructor( name, URL, imageURL, description ) {
//         this.name = name;
//         this.URL = URL;
//         this.imageURL = imageURL;
//         this.description = description; 
//     }
// }



const ModelInfoContext = createContext({
    
    model : 'loaded model gltf.scene'

});

export default ModelInfoContext;