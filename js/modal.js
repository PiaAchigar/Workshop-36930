const carritoAbrir = document.getElementById('boton-carrito');//button linea 22
const carritoCerrar = document.getElementById('carritoCerrar');// button 56

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

carritoAbrir.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active') // hago visible el modal, si no esta le pone la clase
})
carritoCerrar.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active') // le saca la clase
})
modalCarrito.addEventListener('click',(e)=>{ // es similiar al prevent default. Corta la propagación del evento.
    e.stopPropagation()
})
contenedorModal.addEventListener('click', ()=>{ // para que se cierre si hago click afuera del carrito
    carritoCerrar.click()
})
