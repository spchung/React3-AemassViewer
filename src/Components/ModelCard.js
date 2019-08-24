import React from 'react'
import { Card } from 'react-bootstrap'

//Import App context 
// import AppContext from '../Contexts/Context'
// import ModelInfoContext from '../Contexts/ModelInfo'

//card images 
// import bird from '../assets/test/Parrot_portrait.png'
//components 
import OnCallLoader from './OnCallLoader'

///Objective/// 
/* this component should be able to 
1. Take in props (img, model information) and then pass that shit on to the Gallery
2. bind the props taken in to the button and trigger a load action in Viewer 
3. go into Viewer and view image */


const ModelCard = (props) => {

    // var bird  = import('../assets/test/Parrot_portrait.png');
    return (
        // <ModelInfoContext.Consumer> {({
        //     Model
        // }) =>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src = { require(`../assets/test/${ props.fileName }`) }/>
            <Card.Body>
            <Card.Title>{ props.title }</Card.Title>
                <Card.Text>
                    { props.description }
                </Card.Text>
            <OnCallLoader modelURL={ props.URL }/>
            </Card.Body>
        </Card> 
        // }</ModelInfoContext.Consumer>
    )
}

export default ModelCard;