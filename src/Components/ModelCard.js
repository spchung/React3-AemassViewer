//system
import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
//comps
import OnCallLoader from './OnCallLoader'
//data
const apis = require('./../api.json');


class ModelCard extends Component{
    constructor(){
        super();
        this.state={
            modelImg: ''
        }
    }

    componentDidMount() {
        fetch(`${apis.modelImage}${this.props.fileName}`)
         .then(res => res.json())
         .then(res => res.body)
         .then(res => this.setState({
             modelImg:res
         }));
    }

    render(){
        return (
            <Card className='shadow p-3 mb-5 bg-white rounded' style={{ width: '15rem', margin : '5px' }}>
                <Card.Img variant="top" src={this.state.modelImg}/>
                <Card.Body>
                <Card.Title> { this.props.title } </Card.Title>
                    <Card.Text>
                        { this.props.description }
                    </Card.Text>
                <OnCallLoader URL = { this.props.URL }/>
                </Card.Body>
            </Card>
        )
    }
}

export default ModelCard;