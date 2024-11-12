//instantiation
const express = require("express")
const app = express()

const mysql = require("mysql")
const PORT = process.env.PORT || 6000
const moment=require("moment")


const logger =(req, res, next) =>{
    console.log( // http://
        `${Req.protocol}://${req.get ("host")} ${req.originalUrl}:${moment().format()}`
    )
    next();
}

app.use(logger);
const connection = mysql.createConnection({
    host: "bbluunuloghcbjubsief-mysql.services.clever-cloud.com",
    user: "uwxbfy5rimfehlrt",
    password: "iDNm7fiYkB5RyN6ypJks",
    database: "bbluunuloghcbjubsief",
});

connection.connect();


//report - crud
app.get("/api/members", (req,res) =>{
    connection.query("SELECT * FROM userdata" , (err,rows,fields) =>{
        if(err) throw err;
        res.json(rows)
    })
})

// report- crud - search
app.get("/api/members/:id", (req,res) =>{
    const id=req.params.id
    //res.send(id)
    connection.query(`SELECT * FROM userdata WHERE id = ${id}`,(err,rows,fields)=>{
        if(err) throw err
        if(rows.length > 0){
            res.json(rows)
        }else
    {
        res.status(400).json({msg:`${id} id not found`})
    }
    })
})


//post
//create crud
app.use(express.urlencoded({extended:false}))
app.post("/api/members/", (req,res) =>{
    const fname= req.body.fname //juan
    const lname = req.body.lname//delacruz
    const email = req.body.email//juan.gmail.com
    const gender = req.body.gender//gay

    connection.query(`INSERT INTO userdata (first_name, last_name, email, gender)VALUES ('${fname}', '${lname}','${email}', '${gender}' )`,(err,rows,fields) =>{
        if(err) throw err;
        res.json({msg: `Successfully inserted`})
    })
})





app.listen(5000,() => {
    console.log(`Server is running in port ${PORT}`);
})

