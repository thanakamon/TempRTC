const { temp } = require('../models/temp.model');

var render=(req,res)=>{
    temp.find({},(err,data)=>{
	    if(!err)res.render('index',{tempData: data});
    });
}

var addData=(req,res)=>{
    var o=temp.insertMany(req.body);
    res.json(o)
}

var getData=(req,res)=>{
    temp.find({},(err,data)=>{
        if(!err){
            console.log(data);
            let detail=new Array();
            let t={};
            data.forEach((item,index)=>{
		        if(!item.temp||!item.humi||item.humi>100)return;
                let dt=new Date(Date.UTC(item.year, (item.month-1), item.day, item.hour, item.minute));
                detail.push({'dateTime':dt, 'temperature':item.temp, 'humidity':item.humi});
            });
            detail.sort((a,b)=>{
                return b.dateTime-a.dateTime;
            });
            detail.forEach((item,index)=>{
                if(isNaN(item.dateTime.getUTCDate())||isNaN(item.dateTime.getUTCMonth())||isNaN(item.dateTime.getUTCFullYear())||!item.temp||!item.humi||item.humi>100)return;
		        let obj=t[item.dateTime.getUTCDate()+'/'+(item.dateTime.getUTCMonth()+1)+'/'+item.dateTime.getUTCFullYear()]=tmp[item.dateTime.getUTCDate()+'/'+(item.dateTime.getUTCMonth()+1)+'/'+item.dateTime.getUTCFullYear()]||{count:0, totalTemperature:0, totalHumidity:0};
		        obj.count++;
		        obj.totalTemperature+=item.temp;
		        obj.totalHumidity+=(item.humi/5);
            });
	        let result=Object.entries(t).map(function(entry){
		        return {date: entry[0], temperature: entry[1].totalTemperature/entry[1].count, humidity: entry[1].totalHumidity/entry[1].count};
	        });
            res.json({detail:detail, average: result.slice(0,7)});
        }
    })
}

module.exports={
    render,
    addData,
    getData
}


