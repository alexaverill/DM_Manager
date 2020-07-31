let Database = require('../../database/database')
const formidable = require('formidable-serverless');

async function CreateMap(obj){

}
export const config = {
    api: {
      bodyParser: false
    }
  }
export default async function (req, res) {
    if(req.method === 'POST'){
        //console.log("Starting post request "+JSON.stringify(req.body));
        const form = new formidable.IncomingForm();
        form.uploadDir="../public/";
        let title;
        let description;
        let permission;
        form.on('fileBegin', (name, file) => {
            file.path = "./public/uploads/" + file.name
        
          });
          form.parse(req, (err, fields, files) => {
            console.log(files);
          });
        // form.parse(req,function(err,fields,files){
        //     //console.log(err,fields,files);
        // });
        //let obj = JSON.parse(req.body);
        //await CreateMap(obj);
    }
        let mapList= await Database.Map.findAll()
       res.json({maps:mapList});
    
  }