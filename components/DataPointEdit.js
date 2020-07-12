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
        console.log(props);
        this.state = {types:[],visibility:[],name:"",description:"",x:this.props.x,y:this.props.y}
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
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
    handleSave(){
        let mapMock = {
            name:"Test1",
            type:1,
            permissions:1,
            description:"This is a test!",
            x:100,
            y:500

        }
        PostRequest('http://localhost:3000/api/mappoint',mapMock);
    }
    handleCancel(){
        this.props.close();
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
                <h1>{this.props.x} {this.props.y}</h1>
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
                            <Col><Button variant="primary" onClick={this.handleSave}>Save</Button></Col>
                            <Col><Button variant="danger" onClick={this.handleCancel}>Cancel</Button></Col>
                        </Row>
                    


                </Form>
            </Container>
        )
    }
}