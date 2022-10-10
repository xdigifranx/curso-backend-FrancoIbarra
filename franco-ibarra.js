class Usuario{
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

console.log(usuario.getBookNames())