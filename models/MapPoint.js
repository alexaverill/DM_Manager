//TOOD: Load from Database.
const PointType = [
    "Encounter",
    "Treasure",
    "POI",
    "Cave",
    "Town",
    "Shipwreck"
]
class MapPoint{
    constructor(){
        this.name = '';
        this.type = "POI";
        this._x = 0;
        this._y = 0;
        this._description="";
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
    get _description(){
        return this._description;
    }
    set _description(value){
        this._description = value;
    }

}
module.exports = {
    MapPoint,
    PointType
}