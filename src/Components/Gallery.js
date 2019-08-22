import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'

//components
import ModelCard from './ModelCard'
//ModelInfocontext and Data 
import ModelInfoContext from '../Contexts/ModelInfo'
import modelJSON from '../models.json'

const Styles = styled.div`
  .card-img {
      height: 10rem;
      objectFit: cover;
  }
`;

class Model {
    constructor( name, URL, imageURL, description ) {
        this.name = name;
        this.URL = URL;
        this.imageURL = imageURL;
        this.description = description; 
    }
}

//Theoratically each ModelCard prop should take in 
// { name, card-image, text description ,a callback model load function }

const Gallery = () => {

    const Model_1 = new Model('Model_1', '1 de URL', '1 de image de URL', 'This is test model number 1');
    const Model_2 = new Model('Model_2', '2 de URL', '2 de image de URL', 'This is test model number 2')
    const Model_3 = new Model('Model 3', '3 de URL', '3 de image de url', 'this is test model number 3 ')


    //Documentation: 
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