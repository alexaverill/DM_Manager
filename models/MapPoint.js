class MapPoint{
    constructor(_id,x,y,name,description,type){
        this.id = _id;
        this.name = name;
        this.type = type;
        this._x = x;
        this._y = y;
        this._description=description;
        console.log(type);
    }
    get x(){
        return this._x;
    }
    set x(value){
        if(value >=0){
            this._x = value;
        }
    }
    get y(){
        return this._y;
    }
    set y(value){
        if(value>=0){
            this._y = value;
        }
    }
    get name(){
        return this._name;
    }
    set name(value){
        this._name = value;
    }
    get description(){
        return this._description;
    }
    set description(value){
        this._description = value;
    }
    hitTest(x,y,radius){
        if(this.x-radius <= x && this.x + radius >= x && this.y -radius <= y && this.y + radius >=y ){ //
            return true;
        }
        return false;
    }
}
module.exports = {
    MapPoint
}