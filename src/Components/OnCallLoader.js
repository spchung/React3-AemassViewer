/// This Functional Component 

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Model Context 
import { ModelContext } from '../Contexts/ModelInfo'

class OnCallLoader extends Component {
    constructor(props){
    super(props);
        this.state = {
            modelURL : ''
        }

    }

    handleViewerClicked = () => {
        const modelLink = document.getElementById('link'); 
        modelLink.click();
    }

    render() {
        return(
        <ModelContext.Consumer>{({ models }) =>
            <React.Fragment>
               <Link className="link" to={{
                    pathname: '/newview',
                    state : { url : `${ this.props.URL }` }
                }}>View</Link>
            </React.Fragment>
        }</ModelContext.Consumer>
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