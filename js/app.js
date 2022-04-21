let carritoDeCompras = [];

const contenedorProductos = document.getElementById("contenedor-productos"); //main
//const contenedorProductos = document.querySelector("#contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor"); //div 57

const botonTerminar = document.getElementById("terminar"); // div 65
//const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById("contadorCarrito"); //span 22
const precioTotal = document.getElementById("precioTotal"); // span 64

const selecTalles = document.getElementById("selecTalles"); // select 27
const buscador = document.getElementById("search"); // input 20

//Filtros
selecTalles.addEventListener("change", () => {
  if (selecTalles.value == "all") {
    mostrarProductos(stockProductos);
  } else {
    mostrarProductos(
      stockProductos.filter((elemento) => elemento.talle == selecTalles.value)
    );
  }
});

//Muestro todos los productos
mostrarProductos(stockProductos);

//logica Ecommerce
function mostrarProductos(array) {
  contenedorProductos.innerHTML = "";

  array.forEach((item) => {
    // por cada elemento de mi array
    let div = document.createElement("div");
    div.classList.add("producto");
    //div.setAttribute("class", "producto");
    //div.className = "producto";
    div.innerHTML += `
                    <div class="card">
                        <div class="card-image">
                            <img src=${item.img}>
                            <span class="card-title">${item.nombre}</span>
                            <a  id="agregar${item.id}" class="btn-floating halfway-fab waves-effect waves-light blue"><i class="material-icons">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <p>${item.desc}</p>
                            <p>Talle: ${item.talle}</p>
                            <p> $${item.precio}</p>
                        </div>
                    </div>
    `;
    contenedorProductos.appendChild(div);

    let btnAgregar = document.getElementById(`agregar${item.id}`); // capturo la etiq "a" para agregarle el evento

    btnAgregar.addEventListener("click", () => {
      agregarAlCarrito(item.id);
      let productoAgregar = stockProductos.find(
        //buscamos el producto en nuestra BD
        (elemento) => elemento.id == item.id
      );
      localStorage.setItem("producto", JSON.stringify(productoAgregar));
    });
  });
}

// Agrego el producto cliquedo al carrito
function agregarAlCarrito(id) {
  let yaEsta = carritoDeCompras.find((item) => item.id == id); //para no repetirlo
  console.log(yaEsta);
  if (yaEsta) {// se va al else con -> false, null, undefind y " " 
    yaEsta.cantidad = yaEsta.cantidad + 1;
    document.getElementById(
      `und${yaEsta.id}`
    ).innerHTML = ` <p id=und${yaEsta.id}>Und:${yaEsta.cantidad}</p>`;
    actualizarCarrito();
  } else {
    let productoAgregar = stockProductos.find((elemento) => elemento.id == id);

    productoAgregar.cantidad = 1; //le agrego una propiedad "cantidad"

    carritoDeCompras.push(productoAgregar); // lo guardo en mi array

    actualizarCarrito();

    mostrarCarrito(productoAgregar);
  }

  localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}

//Muestro los productos agregados al carrito
function mostrarCarrito(productoAgregar) {
  let div = document.createElement("div");
  div.className = "productoEnCarrito";
  div.innerHTML = `
                    <p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="und${productoAgregar.id}">Und:${productoAgregar.cantidad}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `;
  contenedorCarrito.appendChild(div);

  let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`);

  btnEliminar.addEventListener("click", () => {
    if (productoAgregar.cantidad == 1) { //¿cuantos hay?  
      btnEliminar.parentElement.remove();// de ése nodoBoton, remové el padre (en éste caso es el div)
      carritoDeCompras = carritoDeCompras.filter(
        (item) => item.id != productoAgregar.id
      );
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    } else {
      productoAgregar.cantidad = productoAgregar.cantidad - 1;
      document.getElementById(
        `und${productoAgregar.id}`
      ).innerHTML = ` <p id=und${productoAgregar.id}>Und:${productoAgregar.cantidad}</p>`;
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    }
  });
}

//Actualizacion de "cantidad" y "precio"
function actualizarCarrito() {
  contadorCarrito.innerText = carritoDeCompras.reduce( //actualiza la cantidad de productos que hay en el carrito
    (acc, el) => acc + el.cantidad,
    0
  );
  precioTotal.innerText = carritoDeCompras.reduce( //actualiza el precio
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
}

function recuperar() {
  let recuperarLS = JSON.parse(localStorage.getItem("carrito")); // si no existe, devuele null

  if (recuperarLS) {
    recuperarLS.forEach((el) => {
      mostrarCarrito(el);
      carritoDeCompras.push(el);
      actualizarCarrito();
    });
  }
}

recuperar();
