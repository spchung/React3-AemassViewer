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
    var ModelInformation = require('../models.json');

    return (
        // <ModelInfoContext.Provider value={ TestModelInfo }>
        <Styles>
        <Container>
            <Row>
                <Col>
                    <ModelCard Model={ ModelInformation.Model_0 }/>
                </Col>
                <Col>
                    <ModelCard Model={  ModelInformation.Model_1 } />
                </Col>
                <Col>
                    <ModelCard Model={  ModelInformation.Model_3 }/>
                </Col>
            </Row>
            {/* <br></br>
            <Row>
                <Col>
                    <ModelCard Model='Model_3'/>
                </Col>
                <Col>
                    <ModelCard Model='Model_4'/>
                </Col>
                <Col>
                    <ModelCard Model='Model_5'/>
                </Col>
            </Row> */}
        </Container>
        </Styles>
        // </ModelInfoContext.Provider>
    )

}

export default Gallery;