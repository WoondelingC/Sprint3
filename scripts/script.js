import {data} from '../data/data.js';

const templateCard = document.getElementById('template-card').content; 
const fragment = document.createDocumentFragment();
const items = document.getElementById('items');
const detalle = document.getElementById('detalle');
const totalCompra = document.getElementById('totalCompra');
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    
    loadImage(data);
})

const loadImage = data => {
    //recorro un ciclo for dentro de la data
    data.forEach(movie => {
        
        //desestructuracion
        const{id,imag} = movie;
        templateCard.querySelector('img').setAttribute('src',imag);
        templateCard.querySelector('#comprar').dataset.id = id;
        const clone = templateCard.cloneNode(true);
        
        //clonamos en templaCard las veces que sea necesaria
        fragment.appendChild(clone)
        
    })
    items.appendChild(fragment);
}

items.addEventListener('click', e => {
    let idTarget = e.target.dataset.id;

    //recorremos nuevamente la data
    data.forEach(movie =>{
        //desestructuramos 
        const{id,nombre,imag,precio}=movie;
        //se valida el id capturado con el id de la data
        if(id == idTarget){
            //creamos un objeto donde se la asignan las propiedades de la peliculaseleccionada
            const objeto = {
                id: id,
                nombre: nombre,
                imag: imag,
                precio: precio
            }
            //almacenamos en el local storage la informacion de la pelicula
            localStorage.setItem("cartelera",JSON.stringify(objeto));
            getMovie();
            carrito.push(objeto);
            localStorage.setItem('Carrito',JSON.stringify(carrito));
            listaCarro();
        }
    })
    e.stopPropagation();
    e.preventDefault();
})

function getMovie(){

    detalle.innerHTML = '';
    const movie = JSON.parse(localStorage.getItem("cartelera"));
    //desestructuracion de objetos
    const {id,nombre,imag,precio} = movie;
    //dibujamos la informacion desustructurada en una tabla
    detalle.innerHTML = `
    <div align="center">
    <table>
    <tr>
    <td><h3 align="center" id="nombres">${nombre}</h3>
    <img src="${imag}" width= "300" height="400"></img>
    <h2 align="center">${precio}</h2>
    </td>
    </tr>
    </div>
    `
}

const listaCarro = () => {
    listaCompra.innerHTML = '';
    let total = 0;
    let totalInt = 0;
    carrito = JSON.parse(localStorage.getItem('Carrito'));
    carrito === null ? (carrito = []) : (
        carrito.forEach(element => {
            totalInt += element.precio
            listaCompra.innerHTML += `<br> <br> 
            <div id="lista" width="150" height="150" align="center">
            <span>${element.nombre}</span>
            <span>${element.precio}</span>
            <span><button id="${element.id}"><i class="fas fa-trash-alt"></i></button></span><br>
            </div>            
            `
            total = totalInt;
            console.log(total);
        })
    )
    getTotal(total);
}
function getTotal (total){
    totalCompra.innerHTML = '';
    totalCompra.innerHTML = `<h1 align="center" id="total">Total a pagar = ${total}</h1>
        <a href="form.html"><button id="pagar">Pagar</button></a>
        `
    localStorage.setItem('Total',total)
}
listaCompra.addEventListener('click', (e) =>{
    e.preventDefault();
    if(e.target.classList.contains('fa-trash-alt')){
    let id = e.target.id;
    deleteMovie(id);  
    }
    
})
function deleteMovie(idI){
    let indexArreglo;
    carrito.forEach((elemento,index) =>{
        if(elemento.id==idI)
        indexArreglo = index;
    })
    carrito.splice(indexArreglo,1);
    localStorage.setItem('Carrito',JSON.stringify(carrito));
    listaCarro();
}



//funciones de la pagina 
const fila = document.querySelector('.contenedor-lista');
const peliculas = document.querySelectorAll('.row');
const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener('click', () => {
    fila.scrollLeft += fila.offsetWidth;

    const indicadorActivo = document.querySelector('.indicadores .activo');
    if (indicadorActivo.nextSibling) {
        indicadorActivo.nextSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
});

// ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener('click', () => {
    fila.scrollLeft -= fila.offsetWidth;


});

//----- ----- lista de peliculas ----- -----
const numeroPaginas = Math.ceil(peliculas.length / 5);
for (let i = 0; i < numeroPaginas; i++) {
    const indicador = document.createElement('button');

    
    indicador.addEventListener('click', (e) => {
        fila.scrollLeft = i * fila.offsetWidth;

    });
}

// ? ----- ----- Hover ----- -----
peliculas.forEach((pelicula) => {
    pelicula.addEventListener('mouseenter', (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
            peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
            elemento.classList.add('hover');
        }, 170);
    });
});

fila.addEventListener('mouseleave', () => {
    peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});



