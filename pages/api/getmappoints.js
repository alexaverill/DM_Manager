import { PointType } from '../../models/MapPoint';

let Database = require('../../database/database')
export default async function (req, res) {
    if(req.method === 'POST'){
        let obj = JSON.parse(req.body);
        let mapPoints = await Database.MapPoint.findAll({
            where:{
                mapId:obj.id
            },
            include: Database.Types
        });
        
        res.json({points:mapPoints});
    }
  }