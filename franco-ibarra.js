const express = require('express')
const app = express()
const PORT = process.env.PORT|| 8080;
const {Router} = express;
const router = new Router()
const productos = []

app.use("/static", express.static(__dirname + "public"))

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))

router.use(express.json())

router.use(express.urlencoded({ extended: true }))

router.get('/',(req,res)=>{
    res.json(productos)
})

router.get('/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    let producto = productos.find(item => item.id == id);
    res.json(producto ? producto : {error: "no se encontro el producto"})
})
router.post("/", (req, res) => {
    let producto = req.body;
    if (productos.length != 0) {
        let arrayId = productos.map(item => item.id);
        let highId = Math.max(...arrayId);
        producto.id = highId + 1;
    } else producto.id = 1;

    productos.push(producto);
    res.json(producto);
})
router.put("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    req.body.id = id;
    let producto = req.body;
    const array = productos.map(item => item.id == id ? producto : item);
    productos.splice(0);
    productos.push(...array);
    res.json(producto);
})
router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let array = productos.filter(item => item.id != id);
    productos.splice(0);
    productos.push(...array);
    res.json(productos);
})
app.use("/api/productos", router);

app.use((req, res, next) => {
    res.status(404).send("error");
})

app.use('/static', express.static('public'));



