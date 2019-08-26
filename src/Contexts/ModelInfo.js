// import React, { createContext, useState } from 'react'
// import modelJSON from '../models.json'
import { createContext } from 'react'
// import axios from 'axios'

/* React Context API allows you to access information across your component tress structure 
without having to manually pass down inofrmation through connecting components */
// Think of this as a "global" variable class for all components 
// Please read about the Context Provider and Consumer tags online 

export const ModelContext = createContext(); 

// export const ModelProvider = props => { 

//     const [models, setModels] = useState('');
//     axios.get('modelsArray.json')
//       .then( res => { (res.data )})
//       .finally( () => {return [models, setModels] } )
      
//     const [models, setModels] =  useState([
//         {
//             "name" : "Flying Parrot",
//             "URL" : "ParrotS.glb",
//             "fileName" : "Parrot_portrait.png",
//             "description" : "My name parrot and I here to steal yo wife caw caw."
//         },
//         {
//             "name" : "Yellow Yi-Ping",
//             "URL" : "first_new.glb",
//             "fileName" : "first_new.png",
//             "description" : "Skin no nice it ceased to exist."
//         },
//         {
//             "name" : "Yi-Ping - Colorized 2019",
//             "URL" : "SK2.glb",
//             "fileName" : "SK2.png",
//             "description" : "I love me some SKII. "
//         }]);
        
//     return (
//         <ModelContext.Provider value = { [models, setModels] }>{ props.children }</ModelContext.Provider>
//     );
// };

