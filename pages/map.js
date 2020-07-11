import React from 'react';
import styles from '../styles/map.module.css';
import DataPointEdit from '../components/DataPointEdit';
import {GetRequest,PostRequest} from '../components/api';
export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.state = {canvas:undefined,ctx:undefined}
        this.handleSidebarCancel = this.handleSidebarCancel.bind(this);

    }
    componentDidMount(){
        console.log("Mounted");
        let _canvas = document.getElementById('map-canvas');
        let context = _canvas.getContext("2D");
        console.log(context);
        this.setState({canvas:_canvas,ctx:context,sidebar:false});
        this.loadImage();
    }
    loadImage(){
        console.log("Loading image");
        let image = new Image();
        image.onload = () =>{
            this.state.canvas.width = image.width;
            this.state.canvas.height = image.height;
            this.state.canvas.getContext('2d').drawImage(image,0,0);
            console.log("Image loaded");
        }
        image.onerror = ()=>{
            console.log("Error loading image");
        }
        image.src = '/dnd_terrain-v1.png'
    }
    handleClick(event){
        let mapMock = {
            name:"Test1",
            type:1,
            permissions:1,
            description:"This is a test!",
            x:100,
            y:500

        }
        PostRequest('http://localhost:3000/api/mappoint',mapMock);
        let _sidebar = this.state.sidebar;
        if(_sidebar){
            return;
        }
        this.setState({sidebar:!_sidebar});
    }
    handleSidebarCancel(){
        this.setState({sidebar:false})
    }
    render(){
        let sidebarVis = this.state.sidebar ? styles.sidebar_visible : '';
        let sidebarClasses = `${styles.sidebar} ${sidebarVis}`;
        return(
            <>
            <h1>THis is a map</h1>
            <canvas id="map-canvas" className={styles.map} onLoad={this.loadImage} onClick={this.handleClick}></canvas>
            <div className={sidebarClasses}>
                <h2>Data Entry!</h2>
                <DataPointEdit close={this.handleSidebarCancel}/>
            </div>
            </>
        )
    }
}