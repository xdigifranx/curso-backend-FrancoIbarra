const fs = require('fs')
const express = require('express')

class Contenedor {
    constructor(nombreArchivo){
        this.archivo=nombreArchivo
    }
    async save(object){
    let array =[]
    
    try {
        const data = await fs.promises.readFile(this.archivo,"utf-8")
        array = JSON.parse(data)
        let idArray=array.map(item=>item.id)
        let id = Math.max(...idArray)
            object.id = id + 1;
            array.push(object);
            fs.writeFileSync(this.archivo, JSON.stringify(array))
    } catch{
        object.id = 0;
        array.push(object);
        fs.writeFileSync(this.archivo, JSON.stringify(array))
    }
    return object.id
}
    async getById(number){
        try {
            const data = await fs.promises.readFile(this.archivo,"utf-8")
            let auxArray = JSON.parse(data)
            const object = auxArray.find(obj => obj.id === number)
            return object
        } catch{
            return null
        }
    }
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.archivo, "utf-8")
            const array = JSON.parse(data)
            return array
        } catch{
            return null
        }
    }
    async deleteById(number) {
        try {
            const data = await fs.promises.readFile(this.archivo, "utf-8")
            const array = JSON.parse(data)
            const newArray = array.filter(item => item.id !== number)
            fs.writeFileSync(this.archivo, JSON.stringify(newArray))
        }
        catch {
            return "No hay objetos en el archivo"
        }
    }
    deleteAll() {
        fs.writeFileSync(this.archivo, "")
    }
}
const newArchivo = new Contenedor ("./archivo.JSON");
/* newArchivo.save({titulo:"remera de pelicula",precio:2500,imagem:"https://http2.mlstatic.com/D_NQ_NP_851612-MLA45275561304_032021-O.webp"}).then(resolve => console.log(resolve)); */


/* newArchivo.deleteById();  */
/* newArchivo.deleteAll();  */

const app = express();
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.end("bienvenido :D")
})

app.get('/productos', (req, res) => {
    newArchivo.getAll().then(resolve => {
        res.end(`todo los productos: ${JSON.stringify(resolve)}`)
    });
})
app.get('/productoRandom', (req, res) => {
    let nRandom = parseInt((Math.random() * 2) + 0)
    newArchivo.getById(nRandom).then(resolve => {
        res.end(`producto random: ${JSON.stringify(resolve)}`)
    });
})
