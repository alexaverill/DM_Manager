let Database = require('../../database/database')
export default async function (req, res) {
    res.statusCode = 200
    let data = await Database.Types.findAll(
      {
        attributes:['id','typeName']
      })
      .then((data)=>{
        let tmpList = [];
        data.forEach((datapoint)=>{
            tmpList.push(datapoint.dataValues);
        });
        return tmpList;
      
      });
    //console.log(data);
    res.json({ types: data })
  }