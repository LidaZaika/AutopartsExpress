const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const Promise = require("bluebird");

mongoose.Promise = Promise

const app = express();
app.use(bodyParser.json());
app.set("view engine", "ejs");

const router = express.Router()

mongoose.connect('mongodb://admin:Abc12345678@ds137404.mlab.com:37404/autoparts', { useNewUrlParser: true })

const Product = mongoose.model("product", {
    id: String,
    brand: String,
    name: String,
    liter: String,
    price: String,
    image: String
})


router.get("/products", (req, res)=>{
    Product.find({}).then((data)=>{
        console.log(data)
        res.json(data)
    })

})
router.post("/product", (req, res)=>{
    const product = new Product({...req.body});
    product.save().then( data=>{
        res.json(data)
    })

    Product.find({}).then((data)=>{
        res.json(data)
    })

})

app.use("/api", router)
app.use("/static", express.static("./static"))
app.use((req,res)=>{
    res.render("index")
    
})

app.listen(3000, function() {
    console.log(":3000")
})