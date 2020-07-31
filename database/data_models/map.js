module.exports = (sequelize,type)=>{
    return sequelize.define('map',{
        name:{
            type:type.STRING
        },
        description:{
            type:type.TEXT
        },
        imageURL:{
            type:type.STRING
        },
        seed:{
            type:type.STRING
        }
    });
}