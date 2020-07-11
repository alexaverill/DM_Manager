module.exports = (sequelize,type)=>{
    return sequelize.define('permissions',{
        name:{
            type:type.STRING
        }
    });
}