//import {Map,test} from '../../database/database';
let MapControl = require('../../database/database')
function CreatePoint(){

}
function UpdatePoint(){

}
async function SaveMapPoint(data){
    //Map.testing();
    // console.log(data);
    let type = data.type;
    let permission = data.permissions;
     let newP = {name:data.name,xPos:data.x,yPos:data.y,description:data.description};
    // //console.log(newP);
    let point = await MapControl.Map.create(newP);
    console.log("Perms: "+permission);
    await point.setPermission(permission);
    await point.setType(type);
    //await Map.create(newP);
    
    return {id:0};
}
export default async function (req, res) {
    if(req.method === 'POST'){
        let obj = JSON.parse(req.body);
        let mapPoint = await SaveMapPoint(obj);
        //create new map point?
        res.json({test:mapPoint});
    }else{
        res.json({points:[]});
    }
    // res.statusCode = 200
    // // "Treasure",
    // // "POI",
    // // "Cave",
    // // "Town",
    // // "Shipwreck"
    // res.json({ types: ['POI','Encounter','Cave','Dungeon','Town','Shipwreck'] })
  }