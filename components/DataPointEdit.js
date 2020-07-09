import React, { Component } from 'react';
import PointType from '../models/MapPoint'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Col,Row } from 'react-bootstrap';
import {GetRequest} from '../components/api';
export default class DataPointEdit extends Component {
    constructor(props){
        super(props);
        this.state = {types:[],visibility:[]}
    }
    componentDidMount(){
        GetRequest("http://localhost:3000/api/pointtypes").then((data)=>{
            if(data.status !=="failure"){
                
                this.setState({types:data.types});

            }else{
                console.log("Failure returned from API");
            }
            console.log(data);
        });
        GetRequest("http://localhost:3000/api/visibility").then((data)=>{
            if(data.status !=="failure"){
                this.setState({visibility:data.visibility});

            }else{
                console.log("Failure returninng visilibity from API");
            }
        });
    }
    render() {
        let types = this.state.types.map((type)=>
            <option value={type}>{type}</option>
        );
        let visibility = this.state.visibility.map((perms)=>
        <option value={perms}>{perms}</option>
        );
        return (
            <Container>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select">
                            <option></option>
                            {types}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="visibility">
                        <Form.Label>Visibility</Form.Label>
                        <Form.Control as="select">
                            {visibility}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                
                        <Row>
                            <Col><Button variant="primary">Save</Button></Col>
                            <Col><Button variant="danger">Cancel</Button></Col>
                        </Row>
                    


                </Form>
            </Container>
        )
    }
}