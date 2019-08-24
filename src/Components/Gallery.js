import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'

//components
import ModelCard from './ModelCard'
//ModelInfocontext and Data 
import ModelInfoContext from '../Contexts/ModelInfo'


const Styles = styled.div`
  .card-img {
      height: 10rem;
      objectFit: cover;
  }
`;

// class Model {
//     constructor( name, URL, imageURL, description ) {
//         this.name = name;
//         this.URL = URL;
//         this.imageURL = imageURL;
//         this.description = description; 
//     }
// }

//Theoratically each ModelCard prop should take in 
// { name, card-image, text description ,a callback model load function }

const Gallery = () => {

    // json file with model information 
    /* the Model.imageURL object is the fileName*/ 
    // var ModelInformation = require('../models.json');

    return (
        
        <Styles>
        <ModelInfoContext.Consumer>{({ models }) =>
            <Container>
                <Row>
                    { models.map(item => (
                        <Col key = {item.name}>
                            <ModelCard 
                            key ={ item.name } 
                            title ={ item.name } 
                            fileName = {item.fileName} 
                            description ={item.description}>
                            </ModelCard>
                        </Col>)) }
                </Row>
            </Container>
        }</ModelInfoContext.Consumer>
        </Styles>   
    )
}

export default Gallery;