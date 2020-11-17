var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var tempSchema=new Schema({
    temp: Number,
    humi: Number,
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minute: Number
});

const temp=mongoose.model('temp',tempSchema);
module.exports={
    temp
}
