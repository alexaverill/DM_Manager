const Sequelize = require('sequelize');
require('dotenv').config({path:'../'});
const MapModel = require('./data_models/mappoint');
const PermissionModel = require('./data_models/permissions');
const TypeModel = require('./data_models/types');


const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./database.sqlite'
});
const Permissions = PermissionModel(sequelize,Sequelize);
const Types = TypeModel(sequelize,Sequelize);
const Map = MapModel(sequelize,Sequelize);


Map.belongsTo(Permissions);
Map.belongsTo(Types);

// sequelize.sync({force:false}).then(()=>{
//     console.log("Created Tables");

// });

console.log("Test");
module.exports = {
    Map,
    Permissions,
    Types
}

