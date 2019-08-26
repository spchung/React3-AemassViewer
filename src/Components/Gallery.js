import React from 'react'
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

// Object.defineProperty(Array.prototype, 'chunk_inefficient', {
//     value: function(chunkSize) {
//       var array = this;
//       return [].concat.apply([],
//         array.map(function(elem, i) {
//           return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
//         })
//       );
//     }
//   });

// const MakeCards = (props) => {
//     var array = props.array; 
//     var i,j,temparray,chunk = 3;
    
//     for (i=0,j=array.length; i<j ;i+=chunk) {
//         temparray = array.slice(i,i+chunk);
//         temparray.map( item => (
//             <Col key = {item.name}>
//                 <ModelCard
//                 key = { item.name } 
//                 title = { item.name } 
//                 fileName = { item.fileName } 
//                 description ={  item.description }
//                 URL = { item.URL }>
//                 </ModelCard>
//             </Col>)) 
    
//     }

//     return(
//         <React.Fragment>
//             {temparray}
//         </React.Fragment>
//     )
    

// }



const Gallery = () => {
    //procedurely generate model card according to the lenght of app.state.models and attributes
    return (
        <Styles>
        <ModelContext.Consumer>{({ models }) =>
            <Container>
                {/* <MakeCards array = { models.map(items => MakeCards()) }/> */}
                <Row>
                    { models.map(item => (
                    <Col key = {item.id}>
                        <ModelCard
                        key = { item.id } 
                        title = { item.name } 
                        fileName = { item.fileName } 
                        description ={  item.description }
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