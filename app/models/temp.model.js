var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var tempSchema=new Schema({
    temperature: Number,
    humidity: Number,
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minute: Number
});

const temp=mongoose.model('temp_rtc',tempSchema);
module.exports={
    temp
}
