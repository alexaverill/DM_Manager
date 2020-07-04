import React from 'react';
import styles from '../styles/map.module.css';
export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.state = {canvas:undefined,ctx:undefined}

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
        console.log("clicked");
        let _sidebar = this.state.sidebar;
        this.setState({sidebar:!_sidebar});
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
            </div>
            </>
        )
    }
}