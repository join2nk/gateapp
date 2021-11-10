const express = require('express');
const ejs = require('ejs');
const fs = require("fs");


//const data = require('./data')
//const costcal = require("./cost")


// fs.readFile('./data/customer.json', 'utf-8', (err, jsonstring) => {
//     if (err) {
//         console.log(err);
//     } else {
//         try {
//             let data = JSON.parse(jsonstring);
//             console.log(data.name)
//         } catch (error) {
//             console.log(error);
//         }
//     }
// })


// jsonReader('./data/customer.json',(err,data)=>{
//     if (err) {
//         console.log(err);
//     }else{
//         console.log(data.name);}
//         data.name = "mendas"
//         fs.writeFile('./data/customer.json',JSON.stringify(data),(err)=>{if (err)console.log(err);})
// });

function jsonReader(filePath, cb) {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            let obj = JSON.parse(fileData);
            return cb && cb(null, obj)
        } catch (err) {
            return cb && cb(err)
        }
    })
}

function getDataById(id, cb) {
    jsonReader('./data/inData.json', (err, data) => {
        if (err) {
            return cb && cb(err)
        } else {
            list = data.dataList
            list.forEach(data => {
                if (data.id == id) {
                    return cb && cb(null, data);
                } else {
                    return cb && cb("id no valid")
                }
            });
        }
    })
}

function getAllInDataList(cb) { 
    jsonReader('./data/inData.json', (err, data) => {
        return cb && cb(data.dataList)
    }
    )
    
}



const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('./public'))





app.set('view engine', 'ejs')



app.get('/', function (req, res) {
    getAllInDataList(list=>{
        list.sort((a,b)=>{return a.id - b.id})
    res.render("home",{list})
    })
    
})


app.post('/inwardForm/:id', (req, res) => {
    body = req.body;
    id =  req.params.id;
    // deconstruct body to parts you want to edit

    getDataById("2", (err, data) => {
        if (err) {
            console.log(err);
        } else  {
            data
        }
    })

    res.redirect('/')
})

app.listen(3000, function (err) {
    if (err) return console.log(err)
    return console.log("server startd");
})