const Sequelize = require('sequelize');
require('dotenv').config({path:'../'});
const MapModel = require('./data_models/map');
const MapPointModel = require('./data_models/mappoint');
const PermissionModel = require('./data_models/permissions');
const TypeModel = require('./data_models/types');


const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./database.sqlite',
    logging:false
});
const Permissions = PermissionModel(sequelize,Sequelize);
const Types = TypeModel(sequelize,Sequelize);
const Map = MapModel(sequelize,Sequelize);
const MapPoint = MapPointModel(sequelize,Sequelize);

Map.belongsTo(Permissions);

Map.hasMany(MapPoint);
MapPoint.belongsTo(Permissions);
MapPoint.belongsTo(Types);
MapPoint.belongsTo(Map);
sequelize.sync({force:false}).then(()=>{
    console.log("Created Tables");

});

console.log("Test");
module.exports = {
    Map,
    MapPoint,
    Permissions,
    Types
}

