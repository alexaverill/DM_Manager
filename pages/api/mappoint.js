import { Database } from 'sqlite3';

//import {Map,test} from '../../database/database';
let MapControl = require('../../database/database')
async function SaveMapPoint(data){
    //Map.testing();
    // console.log(data);
    let type = data.type;
    let permission = data.permissions;
     let newP = {name:data.name,xPos:data.x,yPos:data.y,description:data.description};
    let point;
    if(data.id >0){
        point = await MapControl.Map.update(
            {
                name:newP.name,
                description:newP.description
                
            },
            {
                where:{
                    id:data.id
                }
            }
        );
        //await point.setPermission(permission);
    }else{
        point = await MapControl.Map.create(newP);
        await point.setPermission(permission);
    }
    
    //await point.setType(type);
    //await Map.create(newP);
    
    return {id:point.id};
}
export default async function (req, res) {
    if(req.method === 'POST'){
        let obj = JSON.parse(req.body);
        let mapPoint = await SaveMapPoint(obj);
        //create new map point?
        res.json({test:mapPoint});
    }else{
        console.log("test");
        let mapPoints = await MapControl.Map.findAll();
        //console.log(mapPoints);
        res.json({points:mapPoints});
    }
    // res.statusCode = 200
    // // "Treasure",
    // // "POI",
    // // "Cave",
    // // "Town",
    // // "Shipwreck"
    // res.json({ types: ['POI','Encounter','Cave','Dungeon','Town','Shipwreck'] })
  }