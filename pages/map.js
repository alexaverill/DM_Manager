import React from 'react';

export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.state = {canvas:undefined,ctx:undefined}

    }
    componentDidMount(){
        console.log("Mounted");
        let _canvas = document.querySelector('canvas');
        let _ctx = _canvas.getContext('2D');
        this.setState({canvas:_canvas,ctx:_ctx});
        this.loadImage();
    }
    loadImage(event){
        let image = new Image();
        image.onLoad = () =>{
            this.state.canvas.width = image.width;
            this.state.canvas.height = image.height;
            this.state.ctx.drawImage(image,0,0);
        }
    }
    handleClick(event){
        console.log("clicked");
    }
    render(){
        return(
            <>
            <h1>THis is a map</h1>
            <canvas onLoad={this.loadImage} onClick={this.handleClick}></canvas>
            </>
        )
    }
}