const fs = require('fs')

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
const newArchivo = new Contenedor ("./archivo.txt");
newArchivo.save({titulo:"remerapeliculas",precio:2600,imagem:"https://http2.mlstatic.com/D_NQ_NP_851612-MLA45275561304_032021-O.webp"}).then(resolve => console.log(resolve));
newArchivo.getById(0).then(resolve => console.log(resolve));
newArchivo.getAll(0).then(resolve => console.log(resolve));
newArchivo.deleteById();
newArchivo.deleteAll(); 




/* class Usuario{
    constructor(nombre,apellido){
        this.nombre=nombre
        this.apellido=apellido
        this.libros=[]
        this.mascotas=[]
    }
    getFullName() {
        return (this.nombre + " " + this.apellido)
    }
    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
    }
    countMascotas() {
        return this.mascotas.length
    }
    addBook(nombreLibro, autor) {
        const datoLibro = { name: nombreLibro, author: autor }
        this.libros.push(datoLibro)
    }
    getBookNames() {
        return this.libros.map(libro => libro.nombre)
    }
}
const usuario = new Usuario("Franco", "Ibarra")

console.log(usuario.getFullName())

usuario.addMascota("Nala")

usuario.addMascota("olivia")

console.log(usuario.countMascotas())

usuario.addBook("Harry Potter y la piedra filosofal", "J. K. Rowling")

usuario.addBook("Harry Potter y la cámara secreta", "J. K. Rowling")

console.log(usuario.getBookNames()) */