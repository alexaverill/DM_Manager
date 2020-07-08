import React, { Component } from 'react';
import PointType from '../models/MapPoint'
import Form from 'react-bootstrap/Form';
export default class DataPointEdit extends Component {
    render() {
        // PointType.foreach((type)=>{
        //     console.log(type);
        // });
        console.log(PointType[0])
        return (
            <>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select">
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="visibility">
                        <Form.Label>Visibility</Form.Label>
                        <Form.Control as="select">
                            <option>DM</option>
                            <option>Public</option>
                            <option>Private</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                </Form>
            </>
        )
    }
}