import React from 'react'
import styled from 'styled-components'
import { Card, Button } from 'react-bootstrap'

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
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src = { require(`../assets/test/${props.Model.fileName}`) }/>
            <Card.Body>
            <Card.Title>{ props.Model.name }</Card.Title>
                <Card.Text>
                    { props.Model.description }
                </Card.Text>
            <OnCallLoader modelURL={ props.Model.URL }/>
            </Card.Body>
        </Card> 
    )
}

export default ModelCard;