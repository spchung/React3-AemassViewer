//system
import React, { useEffect, Component} from 'react'
import { Card } from 'react-bootstrap'
//comps
import OnCallLoader from './OnCallLoader'
//AWS
// import Amplify from 'aws-amplify';
//objectives:
//fetch model img from s3


class ModelCard extends Component{
    constructor(){
        super();
        this.state={
            modelImg: ''
        }
    }

    componentDidMount() {
        console.log(this.props.fileName);

        fetch(`https://5a0fp98223.execute-api.us-east-1.amazonaws.com/dev/images?name=${this.props.fileName}`)
         .then(res=>{
             return res.json()
         })
         .then(data => {
            console.log("getting body");
            return data.body
         })
         .then(base64 => {
            const image = `data:png;base64,${base64}`;
            this.setState({
                modelImg:image
            })
         })
    
    }

    render(){
        return (
            <Card className='shadow p-3 mb-5 bg-white rounded' style={{ width: '15rem', margin : '5px' }}>
                {/* <Card.Img variant="top" src = { require(`../assets/test/${ this.props.fileName }`) }/> */}
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