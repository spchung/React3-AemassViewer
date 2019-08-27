import React from 'react'
import { Card } from 'react-bootstrap'

import OnCallLoader from './OnCallLoader'

///Objective/// 
/* this component should be able to 
1. Take in props (img, model information) and then pass that shit on to the Gallery
2. bind the props taken in to the button and trigger a load action in Viewer 
3. go into Viewer and view image */


const ModelCard = ( props ) => {

    return (
        <Card className='shadow p-3 mb-5 bg-white rounded' style={{ width: '15rem', margin : '5px' }}>
            <Card.Img variant="top" src = { require(`../assets/test/${ props.fileName }`) }/>
            <Card.Body>
            <Card.Title> { props.title }  </Card.Title>
                <Card.Text>
                    { props.description }
                </Card.Text>
            <OnCallLoader URL = { props.URL }/>
            </Card.Body>
        </Card>
    )
}

export default ModelCard;