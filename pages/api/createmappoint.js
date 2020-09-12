let MapControl = require('../../database/database')
async function SaveMapPoint(data){
    //Map.testing();
    // console.log(data);
    let type = data.type;
    let permission = data.permissions;
     let newP = {name:data.name,xPos:data.x,yPos:data.y,description:data.description,mapId:data.mapId};
    let point;
    if(data.id >0){
        point = await MapControl.MapPoint.update(
            {
                name:newP.name,
                description:newP.description,
                permissionId:permission,
                pointTypeId:type
            },
            {
                where:{
                    id:data.id
                }
            }
        );
        // console.log(permission);
        // await point.setPermission(permission);
        // await point.setPointType(type);
    }else{
        point = await MapControl.MapPoint.create(newP);
        await point.setPermission(permission);
        await point.setPointType(type);
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
        let mapPoints = await MapControl.MapPoint.findAll();
        console.log("Map Points: "+mapPoints);
        res.json({points:mapPoints});
    }
  }