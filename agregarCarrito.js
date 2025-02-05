function agregarAlCarrito(nombre, precio, cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ nombre, precio, cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-carrito');
    mensaje.innerHTML = `${nombre} agregado al carrito`;

    document.body.appendChild(mensaje);
    setTimeout(() => {
        mensaje.remove();
    }, 1000);

    mostrarCarrito();
}


function restarProducto(nombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto && producto.cantidad > 1) {
        producto.cantidad -= 1;
    } else {
        carrito = carrito.filter(item => item.nombre !== nombre);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    mostrarCarrito();
}


function sumarProducto(nombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad += 1; 
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
}


function eliminarProducto(nombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito = carrito.filter(item => item.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
}