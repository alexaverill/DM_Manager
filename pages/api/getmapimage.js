let Database = require('../../database/database')

export default async function (req, res) {
    
    if(req.method === 'POST'){
        
        let data = JSON.parse(req.body);
        if(!data.id){
            res.json({status:"failure",msg:"Missing ID"});
            return;
          
        }
        let map= await Database.Map.findAll({
            where:{
                id:data.id
            }
        })
        console.log(map[0].imageURL);
        res.json({mapImage:map[0].imageURL});
    }
    
    
  }