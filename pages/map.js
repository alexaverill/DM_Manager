import React from 'react';
import styles from '../styles/map.module.css';
import { GetRequest, PostRequest,FilePostRequest } from '../components/api';
import { Container, Card, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Link from 'next/link'
export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = { maps: [{ id: 1, name: "Test" }],file:null,newName:'' }
        this.onSubmit = this.onSubmit.bind(this);
        this.fileAdded = this.fileAdded.bind(this);  
        this.clearInput = this.clearInput.bind(this);
        this.handleNameChanged = this.handleNameChanged.bind(this);

    }
    componentDidMount() {
       this.getMaps();
    }
    getMaps(){
        GetRequest('http://localhost:3000/api/maps').then((data) => {
            this.setState({maps:data.maps});
        });
    }
    onSubmit(event){
        event.preventDefault();
        let formData = new FormData();
        formData.append('file',this.state.file);
        formData.append('title',this.state.newName);
        FilePostRequest('http://localhost:3000/api/maps',formData).then(data=>{
            this.getMaps();
            this.clearInput();
        });
    }
    clearInput(){
        this.setState({file:"",newName:""});
    }
    fileAdded(event){
        this.setState({file:event.target.files[0]});
    }
    handleNameChanged(event){
        this.setState({newName:event.target.value});
    }
    render() {
        let maps = this.state.maps.map((map) => {
            //console.log(map);
            let url ="mapeditor/"+map.id;
            return <Card className="mt-2 p-2"><Link href={url}>{map.name}</Link></Card>
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
                    <Form.Control type="text" name="name" onChange={this.handleNameChanged} value={this.state.newName}/>
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