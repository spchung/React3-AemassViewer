import React, {useEffect} from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'

//components
import ModelCard from './ModelCard'
//ModelInfocontext and Data 
import { ModelContext } from '../Contexts/ModelInfo'


const Styles = styled.div`
  .card-img {
      height: 10rem;
      objectFit: cover;
  }
`;


const Gallery = () => {

    //procedurely generate model card according to the lenght of app.state.models and attributes
    return (
        <Styles>
        <ModelContext.Consumer>{({ models }) =>
        <Container>
            <Row>
                { models.map( item => (
                <Col key = { item.id }>
                    <ModelCard key = { item.id } title = { item.name } 
                        fileName = { item.fileName } 
                        description ={ item.description }
                        URL = { item.URL }>
                    </ModelCard>
                </Col>)) }
            </Row>
        </Container>
        }</ModelContext.Consumer>
        </Styles>   
    )
}



export default Gallery;