import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mysql from "mysql2"

const app = express()
app.use( express.json() )
app.use( cors() )
dotenv.config()

const PORT = process.env.PORT || 3030
const CREDENTIAL = JSON.parse(process.env.CREDENTIAL)
const mysqlTable = "mock_data"
const db = mysql.createConnection(CREDENTIAL)

// check
db.connect( (err) => {
    if(err) {
        // console.error(err)
        process.exit(1)
    }
    console.log("MySQL Connected!")
})

app.get("/", (req, res) => {
    console.log("MySQL: I am root")
    res.send("MySQL: I am root")
})

// GET: ALL
app.get("/gettable", (req, res) => {
    // query
    const query = `SELECT * FROM ${mysqlTable} ORDER BY id DESC LIMIT 10`
    // send the query
    db.query(query, (err, result) => {
        if(err) { process.exit(1) }

        console.table(result)
        res.send('Query sent')
    })
    // result
})

// GET by ID
app.get("/class/:id", (req, res) => {
    // Parameter and Query
    const parameter = Number(req.params.id)
    const query = `SELECT * FROM ${mysqlTable} WHERE id=?`
    // Send Query
    db.query(query, [parameter], (err, result) => {
        if(err) {process.exit(1) }
    // Result
    console.table(result)
    res.send('Query sent!')
    })
})

// POST
app.post("/post", (req, res) => {
    //Parameter and query
    const parameter = {
        id: null, 
        first_name: "Anthony",
        last_name: "Style",
        email: "style@fashionicon.com",
        gender: "m",
        ip_address: "You are"
    }
    // const parameter = req.body
    const query = `INSERT INTO ${mysqlTable} SET ?`
    //send query
    db.query(query,parameter, (err, result) => {
        if(err) {
            console.error(err)
            process.exit(1) }
        //result
        console.table(result)
        res.send("Post added")
    })    
})
// DELETE
app.delete("/class/:id", (req, res) => {
    // parameter and query
    const parameter = Number(req.params.id)
    const query = `DELETE FROM ${mysqlTable} WHERE id=?`
    //send query
    db.query(query, [parameter], (err, result) => {
        if(err) {
            console.error(err)
            process.exit(1) }
        //results
        console.log(result)
        res.send('Query sent!')
    })
})
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})
