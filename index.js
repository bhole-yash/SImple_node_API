const { response } = require('express');
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded());



app.get('/', (req, res) => {
    var name = req.query.name;
    fs.readFile('./users.json','utf-8',(err, jsonString)=>{
        if(err){
            console.log(err);
        }
        else{
            const data = JSON.parse(jsonString);
            
            if(name in data)
            {
                return  res.json({
                    "status":200,
                    "message":"Found user with phone number "+data[name]
                })
            }
            else{
                return res.json({
                    'status':404,
                    "message":"User not found"
                })
            }
            
        }
    })
    
})

app.post('/',(req,res)=>{
    console.log('in post');
    var incoming_data = req.body;
    console.log(incoming_data);
    fs.readFile('./users.json','utf-8',(err, jsonString)=>{
        if(err){
            console.log(err);
        }
        else{
            const data = JSON.parse(jsonString);
            
            if(incoming_data.name in data)
            {
                return  res.json({
                    "status":300,
                    "message":"User already exists"
                })
            }
            else
            {   
                data[incoming_data.name]=incoming_data.phone
                const stringifyData = JSON.stringify(data)
                fs.writeFileSync('users.json', stringifyData)
                return res.json({
                    "status":201,
                    "message":"Added user "+incoming_data.name+" with phone number "+incoming_data.phone
                })
            }
            
        }
    })
    
}) 

app.put('/',(req,res)=>{
    incoming_data = req.body
    fs.readFile('./users.json','utf-8',(err, jsonString)=>{
        if(err){
            console.log(err);
        }
        else{
            const data = JSON.parse(jsonString);
            
            if(incoming_data.name in data)
            {
                data[incoming_data.name]=incoming_data.phone
                const stringifyData = JSON.stringify(data)
                fs.writeFileSync('users.json', stringifyData)
                return res.json({
                    "status":201,
                    "message":"Success:Updated user "+incoming_data.name+" with phone number "+incoming_data.phone
                })
            }
            else
            {
                return res.json({
                    "status":404,
                    "message":"User "+incoming_data.name+" not found! "
                })
            }
            
        }
    })
})

app.delete('/',(req,res)=>{
    console.log("Hit 1")
    to_be_deleted = req.query.name
    fs.readFile('./users.json','utf-8',(err, jsonString)=>{
        console.log("Hit 2")
        if(err){
            console.log(err);
        }
        else{
            const data = JSON.parse(jsonString);
            
            if(to_be_deleted in data)
            {
                console.log("Hit 3")
                delete data[to_be_deleted]
                const stringifyData = JSON.stringify(data)
                fs.writeFileSync('users.json', stringifyData)
                return res.json({
                    "status":201,
                    "message":"Successfully deleted user "+to_be_deleted
                })
            }
            else
            {
                return res.json({
                    "status":404,
                    "message":"User "+to_be_deleted+" not found! "
                })
            }
            
        }
    })
})




app.listen(port, () => {
  console.log(`Simple app listening on port ${port}`)
})