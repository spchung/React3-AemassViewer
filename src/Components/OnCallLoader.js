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

export default OnCallLoader;