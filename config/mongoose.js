var mongoose=require('mongoose');

module.exports=()=>{
    mongoose.set('debug',true);
    var db=mongoose.connect('mongodb://localhost/s60030031');
    require('../app/models/temp.model');
    return db;
}
