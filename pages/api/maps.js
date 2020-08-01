let Database = require('../../database/database')
const formidable = require('formidable-serverless');
const fs = require('fs');
async function CreateMap(obj){
  let mapObj = {name:obj.name,description:obj.description,imageURL:obj.path};
  await Database.Map.create(mapObj);

}
export const config = {
    api: {
      bodyParser: false
    }
  }
export default async function (req, res) {
    if(req.method === 'POST'){
        //console.log("Starting post request "+JSON.stringify(req.body));
        let fileUpload = await new Promise(async (resolve,reject)=>{
          const form = new formidable.IncomingForm({keepExtensions:true});
          form.once("error",console.error);
          let fileName;
          let title;
          let data = await new Promise((res,rej)=>{
            form.parse(req,async(err,field,files)=>{
            if(err){
              console.log('Error');
              rej(err);
              return;
            }
            let newName = `public/${files.file.name}`;
            try{
            
            fs.renameSync(files.file.path,newName);
            }catch(e){
              console.log(e);
            }
            //return ;
           res({title:field.title,path:newName});
            
          })
        });
        console.log(data);
         // console.log(formData);
        resolve(data);
        });
       console.log(fileUpload);

          let newMap = {
            name:fileUpload.title,
            path:fileUpload.path,
            description:'',
            permission:1
          }
       await CreateMap(newMap);
       let mapList= await Database.Map.findAll()
       console.log(mapList);
      return res.json({maps:mapList});
    }
    let mapList= await Database.Map.findAll()
    res.json({maps:mapList});
    
  }