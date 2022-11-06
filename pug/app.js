const express = require('Express');
const app =express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
const { Router } = express;
const router = new Router();

const productos = []

const handleVerify=(atributo)=>{
    return (atributo!="") 
}
router.use(express.json())

router.use(express.urlencoded({ extended: true }))

server.on("error", error => console.log(`Error en servidor ${error}`))

app.set("views", "./views");

app.set("view engine", "pug");

app.use("/static", express.static(__dirname + "public"))

router.get('/', (req,res)=>{
    res.render("productos", {productos})
})

app.get("/", (req, res) => {
    res.render("formulario",{titlePage:"Formulario"})
})

router.post("/", (req, res) => {
    let objeto = req.body;
    const veri = handleVerify(objeto.title) && handleVerify(objeto.price) && handleVerify(objeto.thumbnail);
    if(veri){
        if (productos.length != 0) {
            let arrayId = productos.map(item => item.id);
            let highId = Math.max(...arrayId);
            objeto.id = highId + 1;
        } else objeto.id = 1;
        productos.push(objeto);
    }
    res.redirect('/')
})
app.use('/static', express.static('public'));

app.use((req, res, next) => {
    res.status(404).send("error");
})

app.use("/api/productos", router);