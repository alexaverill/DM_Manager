module.exports = (sequelize,type)=>{
    return sequelize.define('mappoint',{
        name:{
            type:type.STRING
        },
        xPos:{
            type:type.INTEGER
        },
        yPos:{
            type:type.INTEGER
        },
        description:{
            type:type.TEXT
        }
    });
}