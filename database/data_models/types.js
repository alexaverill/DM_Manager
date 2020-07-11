module.exports = (sequelize,type)=>{
    return sequelize.define('pointTypes',{
        typeName:{
            type:type.STRING
        }
    });
}