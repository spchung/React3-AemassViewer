import { createContext } from 'react'

/* React Context API allows you to access information across your component tress structure 
without having to manually pass down inofrmation through connecting components */
// Think of this as a "global" variable class for all components 
// Please read about the Context Provider and Consumer tags online 


//
const AppContext = createContext({
    
    name : 'these values are only placeholders',
    purpose : 'you will only access states defined here if your shit broke', 
    

});

export default AppContext;