const express = require('express')
const sqlite = require("sqlite3").verbose()
const app = express()
app.use(express.json()) 
const port = 3000
const cors = require('cors')
app.use(cors())

const db = new sqlite.Database("database.db", (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all("select * from chocolates", [], (err, data) => {
        res.send(data)
    }) 
})

app.get('/choc/:id', (req, res) => {
    const id = req.params.id
    db.get("select * from chocolates where id=?", [id], (err, data) => {
        res.send(data)
    }) 
})

app.post("/new", (req,res)=>{
   const name = req.body.name
   const price = req.body.price
   const image = req.body.image
   db.run("insert into chocolates(name, price, image) values(?,?,?)",[name, price, image], ()=>{
    res.send("OK")
   } )
})

app.put("/update/:id", (req, res)=>{
    const name = req.body.name
    const price = req.body.price
    const image = req.body.image
    const id = req.params.id
    db.run("update chocolates set name=?, price=?, image=? where id=?",[name, price, image,id], (err,data)=>{
        res.send("OK")
    })
})

app.delete('/delete/:id', (req,res)=>{
    const id=req.params.id
    db.get("delete from chocolates where id=?",[id], (err,data)=>{
        res.send("OK")
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
