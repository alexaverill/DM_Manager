module.exports = (sequelize,type)=>{
    return sequelize.define('pointTypes',{
        typeName:{
            type:type.STRING
        },
        representation:{
            type:type.STRING
        },
        color:{
            type:type.STRING
        }
    });
}