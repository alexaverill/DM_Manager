import React, { Component } from 'react';
import PointType from '../models/MapPoint'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Col, Row } from 'react-bootstrap';
import { GetRequest, PostRequest } from './api';
class DataPoint extends Component {
    constructor(props) {
        super(props);
        this.state = { mapId:this.props.mapId,id:this.props.id,types: [], visibility: [], name: "", description: "", x: this.props.x, y: this.props.y, type: 0, permission: 0 }
        this.handleName = this.handleName.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handlePerms = this.handlePerms.bind(this);
    }
    componentDidMount() {
        GetRequest("http://localhost:3000/api/pointtypes").then((data) => {
            if (data.status !== "failure") {
                // console.log(data);
                this.setState({ types: data.types });

            } else {
                console.log("Failure returned from API");
            }
            console.log(data);
        });
        GetRequest("http://localhost:3000/api/visibility").then((data) => {
            if (data.status !== "failure") {
                this.setState({ visibility: data.permissions });

            } else {
                console.log("Failure returninng visilibity from API");
            }
        });
    }
    handleName(event) {

        this.setState({ name: event.target.value })
    }
    handleDesc(event) {
        this.setState({ description: event.target.value })
    }
    handleSave() {
        console.log(this.state.permission);

        let pointData = {
            mapId:this.state.mapId,
            id:this.state.id,
            name: this.state.name,
            type: this.state.type,
            permissions: this.state.permission,
            description: this.state.description,
            x: this.props.x,
            y: this.props.y

        }
        console.log(pointData);
        PostRequest('http://localhost:3000/api/createmappoint', pointData);
        this.props.save();
        this.setState({name:"",description:"",id:""})
    }
    handleType(event) {
        this.setState({ type: event.target.value });
    }
    handlePerms(event) {

        this.setState({ permission: event.target.value });
    }
    handleCancel() {
    
        this.setState({name:"",description:"",id:""})
        this.props.close();
    }
}
export class DataPointCreate extends DataPoint {
    render() {
        let types = this.state.types.map((type) =>
            <option key={type.id.toString()} value={type.id}>{type.typeName}</option>
        );
        let visibility = this.state.visibility.map((perms) =>
            <option key={perms.id.toString()} value={perms.id}>{perms.name}</option>
        );
        let nameInput = <Form.Control as="input" onChange={this.handleName} />
        return (
            <Container>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control as="input" onChange={this.handleName} value={this.state.name}/>
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" onChange={this.handleType}>
                            <option></option>
                            {types}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="visibility">
                        <Form.Label>Visibility</Form.Label>
                        <Form.Control as="select" onChange={this.handlePerms}>
                            <option></option>
                            {visibility}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={this.handleDesc} value={this.state.description}/>
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
export class DataPointEdit extends DataPoint {
    constructor(props){
        super(props);

    }
    componentDidMount(){
        super.componentDidMount();
        console.log(this.state.types);
        this.setState({name:this.props.name, description:this.props.description, type:1,permission:1});
    }
    render() {
        let types = this.state.types.map((type)=>{
            if(type.id === this.state.type){
                return <option key={type.id.toString()} value={type.id} selected>{type.typeName}</option>
            }else{
                return <option key={type.id.toString()} value={type.id}>{type.typeName}</option>
            }
        });
        let visibility = this.state.visibility.map((perms)=>{
            if(perms.id === this.state.permission){
                return <option key={perms.id.toString()} value={perms.id} selected>{perms.name}</option>
            }else{
                return <option key={perms.id.toString()} value={perms.id}>{perms.name}</option>
            }
        });        
        let nameInput = <Form.Control as="input" onChange={this.handleName} value={this.state.name} />
        let description = <Form.Control as="textarea" rows="3" onChange={this.handleDesc} value={this.state.description} />
        return (
            <Container>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        {nameInput}
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" onChange={this.handleType}>
                            <option></option>
                            {types}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="visibility">
                        <Form.Label>Visibility</Form.Label>
                        <Form.Control as="select" onChange={this.handlePerms}>
                            <option></option>
                            {visibility}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        {description}
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