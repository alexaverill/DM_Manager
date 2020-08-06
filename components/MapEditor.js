import React from 'react';
import {useRouter} from 'next/router';
import { DataPointCreate,DataPointEdit } from './MapDataPoint';
import styles from '../styles/map.module.css'
import {GetRequest,PostRequest} from './api'
import MapPoint from '../models/MapPoint';
export default class Map extends React.Component{
    constructor(props){

        
        super(props);
        
        this.state = {mapId:this.props.id,canvas:undefined,ctx:undefined,x:0,y:0,points:[],hasPoint:false, activePoint:{}}
        this.handleClick = this.handleClick.bind(this);
        this.loadImage = this.loadImage.bind(this);
       this.handleSidebarSave = this.handleSidebarSave.bind(this);
        this.handleSidebarCancel = this.handleSidebarCancel.bind(this);
        
    }
    componentDidMount(){
       
        this.updateMapPoints();
        console.log("Mounted "+this.props.id + this.state.mapId);
        this.setState({mapId:this.props.id});
        let _canvas = document.getElementById('map-canvas');
        let context = _canvas.getContext("2D");
        console.log(context);
        this.setState({canvas:_canvas,ctx:context,sidebar:false});
        let data = {
            id:this.props.id
        }
        PostRequest('http://localhost:3000/api/getmapimage',data).then(data=>{
            console.log(data);
            if(data.status){
                return;
            }
            this.loadImage(data.mapImage);
        })
        
        
       // this.updateMapPoints();
    }
    
    updateMapPoints(){
        PostRequest('http://localhost:3000/api/getmappoints',{id:this.state.mapId}).then((data)=>{
            let mapPoints = []
            data.points.forEach((point)=>{
                mapPoints.push(new MapPoint.MapPoint(point.id,point.xPos,point.yPos,point.name,point.description,point.pointType))
            });
            this.setState({points:mapPoints});
            this.renderPoints();
        });
    }
    componentDidUpdate(){
        console.log(this.props.name);
    }
    renderPoints(){
        let ctx = this.state.canvas.getContext('2d'); //todo fix this to be stored in state. 
        //console.log(this.state.points.length);
        console.log("Size: "+ this.state.canvas.width + " " + this.state.canvas.height);
        
        this.state.points.forEach(p=>{
        
            let x = p.x;
            let y = p.y; 
            ctx.fillStyle = p.type.color;
            ctx.fillRect(x,y,20,20);
            //ctx.endPath();
        });
    }
    loadImage(imagePath){
        console.log("Loading image");
        let image = new Image();
        image.onload = () =>{
            this.state.canvas.width = image.width;
            this.state.canvas.height = image.height;
            this.state.canvas.getContext('2d').drawImage(image,0,0);
            this.renderPoints();
            console.log("Image loaded");
        }
        image.onerror = (err)=>{
            console.log("Error loading image ");
        }
        imagePath = imagePath.replace('public/','');
        image.src = 'http://localhost:3000/'+imagePath;
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
        let _id = -1;
        let _found = false;

        for(let i =0; i<points.length; i++){
            if(points[i].hitTest(x,y,radius)){
                console.log("found "+points[i].name);
                _found = true;
                _id = i;
                break;
            }
        }

        return {found:_found,id:_id};
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
        let test = this.hitTest(worldPos.x,worldPos.y,this.state.points,50);
        if(test.found){
            let point = this.state.points[test.id];
            
            this.setState({hasPoint:true,activePoint:point});
        }else{
            this.setState({hasPoint:false,activePoint:{}});
        }
        //hittest then decide if it needs to be created or edited.
        this.setState({x:worldPos.x,y:worldPos.y});
        this.setState({sidebar:!_sidebar});
       
    }
    handleSidebarCancel(){
        this.setState({sidebar:false,hasPoint:false});
    }
    handleSidebarSave(){
        this.updateMapPoints();
        this.setState({sidebar:false,hasPoint:false});
    }
    render(){
        let sidebarVis = this.state.sidebar ? styles.sidebar_visible : '';
        let sidebarClasses = `${styles.sidebar} ${sidebarVis}`;

        let xPos = this.state.x;
        let yPos = this.state.y;
        const name = this.state.hasPoint ? this.state.activePoint.name: '';
        console.log(name);
        let description = this.state.hasPoint ? this.state.activePoint.description : '';
        let type = 1;
        let visibility = 1;
        return(
            <>
            <canvas id="map-canvas" className={styles.map} onLoad={this.loadImage} onClick={this.handleClick}></canvas>
            <div className={sidebarClasses}>
                <h2>Data Entry!</h2>
                { this.state.hasPoint?
                    <DataPointEdit close ={this.handleSidebarCancel} save={this.handleSidebarSave} mapId={this.state.mapId} id={this.state.activePoint.id} x={this.state.activePoint.x} y={this.state.activePoint.y} name={this.state.activePoint.name} description={this.state.activePoint.description}/>
                :<DataPointCreate mapId={this.state.mapId} id={0} close={this.handleSidebarCancel} save={this.handleSidebarSave} x={xPos} y={yPos}/>
                }
            </div>
            </>
        )
    }
}