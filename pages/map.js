import React from 'react';
import styles from '../styles/map.module.css';
import { DataPointEdit, DataPointCreate } from '../components/MapDataPoint';
import { GetRequest, PostRequest,FilePostRequest } from '../components/api';
import MapPoint from '../models/MapPoint';
import { Container, Card, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = { maps: [{ id: 1, name: "Test" }],file:null }
        this.onSubmit = this.onSubmit.bind(this);
        this.fileAdded = this.fileAdded.bind(this);

    }
    componentDidMount() {
        GetRequest('http://localhost:3000/api/maps').then((data) => {

        });
    }
    onSubmit(event){
        event.preventDefault();
        let formData = new FormData();
        formData.append('file',this.state.file);
        formData.append('title','test');
        FilePostRequest('http://localhost:3000/api/maps',formData);
    }
    fileAdded(event){
        this.setState({file:event.target.files[0]});
    }
    render() {
        let maps = this.state.maps.map((map) => {
            console.log(map);
            return <Card><Card.Link href="">{map.name}</Card.Link></Card>
        });
        return (
            <Container>
                <h1>Maps</h1>
                <div className="map-list">
                    Map List
                    {maps}
                </div>
                
                <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name"/>
                </Form.Group>
                <Form.Group controlId="file">
                    <Form.Label>File</Form.Label>
                    <Form.Control type="file" name="file" onChange={this.fileAdded}/>
                </Form.Group>
                <Button onClick={this.handleNew} variant="primary" type="submit">Add Map</Button>
                </Form>

            </Container>
        )
    }
}