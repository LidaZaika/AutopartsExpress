const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use("/static", express.static("./static"))
app.use((req,res)=>{
    res.render("index")
    
})

app.listen(3000, function() {
    console.log(":3000")
})