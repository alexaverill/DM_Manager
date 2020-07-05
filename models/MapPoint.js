//TOOD: Load from Database.
const PointType = {
    Encounter:"Encounter",
    Treasure:"Treasure",
    POI:"POI",
    Cave:"Cave",
    Town:"Town",
    Shipwreck:"Shipwreck"
}
class MapPoint{
    constructor(){
        this.name = '';
        this.type = PointType.POI;
        this._x = 0;
        this._y = 0;
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

}
module.exports = {
    MapPoint,
    PointType
}