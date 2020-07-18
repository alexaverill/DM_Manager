import React from 'react';
import styles from '../styles/map.module.css';
import DataPointEdit from '../components/DataPointEdit';
import {GetRequest,PostRequest} from '../components/api';
export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {canvas:undefined,ctx:undefined,x:0,y:0,points:[]}
        this.handleClick = this.handleClick.bind(this);
        this.loadImage = this.loadImage.bind(this);
       
        this.handleSidebarCancel = this.handleSidebarCancel.bind(this);
        
    }
    componentDidMount(){
        console.log("Mounted");
        let _canvas = document.getElementById('map-canvas');
        let context = _canvas.getContext("2D");
        console.log(context);
        this.setState({canvas:_canvas,ctx:context,sidebar:false});
        this.loadImage();
        console.log("loading points?");
        GetRequest('http://localhost:3000/api/mappoint').then((data)=>{
            this.setState({points:data.points});
            this.renderPoints();
        });
    }
    renderPoints(){
        let ctx = this.state.canvas.getContext('2d'); //todo fix this to be stored in state. 
        console.log(this.state.points.length);
        console.log("Size: "+ this.state.canvas.width + " " + this.state.canvas.height);
        
        this.state.points.forEach(p=>{
            console.log(`${p.name} ${p.xPos} ${p.yPos}` );
            let x = p.xPos;
            let y = p.yPos; 
            ctx.fillRect(x,y,20,20);
            //ctx.endPath();
        });
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
    screenToWorld(x,y, canvas){
        let width = canvas.width;
        let height = canvas.height;
        let screenWidth = window.innerWidth;
        let screenHeight = document.body.clientHeight;
        //console.log(screenHeight + " " +y);
        let xPos = (x/screenWidth)*width;
        let yPos = (y/screenHeight)*height;
        yPos += Math.ceil(1.5* canvas.offsetTop);//magic numbers make the world go round. Also should look into a better solution
        return {x:xPos,y:yPos}
    }
    hitTest(x,y,points,radius){
        let id = -1;
        let found = false;
        points.forEach(p =>{
            console.log(p.xPos + " " +x);
            if(p.xPos > x-radius && p.xPos < x+radius){
                console.log("found one");
            }
        });
        return {found:false,id:null};
    }
    handleClick(event){
        
        let _sidebar = this.state.sidebar;
        if(_sidebar){
            return;
        }
        let bounds = event.target.getBoundingClientRect();
        let xPos = event.clientX-bounds.left;
        let yPos = event.clientY - bounds.top;
        let worldPos = this.screenToWorld(xPos,yPos,event.target);
        this.hitTest(worldPos.x,worldPos.y,this.state.points,10);
        return;
        //hittest then decide if it needs to be created or edited.
        this.setState({x:worldPos.x,y:worldPos.y});
        this.setState({sidebar:!_sidebar});
       
    }
    handleSidebarCancel(){
        this.setState({sidebar:false})
    }
    render(){
        let sidebarVis = this.state.sidebar ? styles.sidebar_visible : '';
        let sidebarClasses = `${styles.sidebar} ${sidebarVis}`;
        let xPos = this.state.x;
        let yPos = this.state.y;

        return(
            <>
            <h1>THis is a map</h1>
            <canvas id="map-canvas" className={styles.map} onLoad={this.loadImage} onClick={this.handleClick}></canvas>
            <div className={sidebarClasses}>
                <h2>Data Entry!</h2>
                <DataPointEdit close={this.handleSidebarCancel} x={xPos} y={yPos}/>
            </div>
            </>
        )
    }
}