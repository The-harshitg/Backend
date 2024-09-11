const { error } = require("console");
const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

app.get("/files", function(req,res){
        
    fs.readdir(path.join(__dirname,'./files/'),(err,files) =>{
        if(err){
            return res.status(500).json({
                error:"failed to retrive files"
            })
        }
        else{
            return res.json(files);
        }
    })
});

app.get("/file/:filename", function(req,res){
    const fname = req.params.filename;
    const filepath = path.join(__dirname, './files/',fname);
    fs.readFile(filepath,'utf8',(err,data) =>{
        if(err){
            return res.status(404).send("file not found")
        }
        res.send(data);
    })
});

app.all("*",(req,res) => {
    res.status(404).send("404(route) not found");
})




app.listen(3000);