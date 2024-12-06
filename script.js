// Función para obtener la imagen del producto (si no existe, puedes usar una imagen predeterminada)
function obtenerImagen(nombre) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];  // Definir productos globalmente
    const producto = productos.find(item => item.nombre === nombre);
    return producto ? producto.imagen : 'comingsoon.jpeg';
}

// Cargar los productos al cargar la página
window.onload = function() {
    mostrarFormularioFechas();
};

// Función para mostrar el formulario de fechas
function mostrarFormularioFechas() {
    const contenedor = document.querySelector('.contenedor-fechas');

    // Recuperar las fechas guardadas en localStorage, si existen
    const fechaLlegada = localStorage.getItem('fechaLlegada') || '';
    const fechaSalida = localStorage.getItem('fechaSalida') || '';

    contenedor.innerHTML = `
        <h2>Por favor, ingresa las fechas de llegada y salida:</h2>
        <label for="fecha-llegada">Fecha de Llegada:</label>
        <input type="date" id="fecha-llegada" value="${fechaLlegada}">
        <label for="fecha-salida">Fecha de Salida:</label>
        <input type="date" id="fecha-salida" value="${fechaSalida}">
        <button id="confirmar-fechas">Seleccionar fechas</button>
    `;

    // Asignar evento al botón de actualizar fechas
    document.getElementById('confirmar-fechas').addEventListener('click', function() {
        const fechaLlegada = document.getElementById('fecha-llegada').value;
        const fechaSalida = document.getElementById('fecha-salida').value;

        // Verificar que ambas fechas sean seleccionadas
        if (fechaLlegada && fechaSalida) {
            // Guardar fechas en el localStorage
            localStorage.setItem('fechaLlegada', fechaLlegada);
            localStorage.setItem('fechaSalida', fechaSalida);
            mostrarProductos();
        } else {
            alert("Por favor, completa ambas fechas.");
        }
    });
}

// Función para mostrar los productos
function mostrarProductos() {
    fetch('./info.json')
        .then(response => response.json())
        .then(productos => {
            // Guardamos los productos en el localStorage
            localStorage.setItem('productos', JSON.stringify(productos));
            agregarProductos(productos);
        })
        .catch(error => console.error("Error al cargar los productos:", error));
}

// Función para agregar los productos al DOM
function agregarProductos(productos) {
    const contenedorHabitaciones = document.querySelector('.productos-habitaciones');
    const contenedorServiciosHabitacion = document.querySelector('.productos-servicios-habitacion');
    const contenedorServiciosPlaya = document.querySelector('.productos-servicios-playa');

    if (!contenedorHabitaciones || !contenedorServiciosHabitacion || !contenedorServiciosPlaya) {
        console.error("No se encontraron los contenedores en el HTML");
        return;
    }

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('catalogo');

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="./imagenes/${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <p class="precio">$${producto.precio}</p>
            ${producto.pasajeros ? `<p class="pasajeros">Pasajeros: ${producto.pasajeros}</p>` : ""}
            <input type="number" class="cantidad" value="1" min="1" style="width: 60px; margin-bottom: 10px;">
            <button>Agregar al Carrito</button>
        `;

        if (producto.categoria === "habitaciones") {
            contenedorHabitaciones.appendChild(tarjeta);
        } else if (producto.categoria === "servicio-habitacion") {
            contenedorServiciosHabitacion.appendChild(tarjeta);
        } else if (producto.categoria === "servicio-playa") {
            contenedorServiciosPlaya.appendChild(tarjeta);
        }
    });

    // Asignar eventos de agregar al carrito
    const botonesAgregarCarrito = document.querySelectorAll('.catalogo button');
    botonesAgregarCarrito.forEach((boton) => {
        boton.addEventListener('click', function() {
            const tarjeta = this.closest('.catalogo');
            const nombre = tarjeta.querySelector('h3').innerText;
            const precio = parseFloat(tarjeta.querySelector('.precio').innerText.replace('$', ''));
            const cantidad = parseInt(tarjeta.querySelector('.cantidad').value);

            agregarAlCarrito(nombre, precio, cantidad);
        });
    });
}

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio, cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += cantidad; 
    } else {
        carrito.push({ nombre, precio, cantidad });
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar mensaje en la parte inferior derecha de la pantalla
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-carrito');
    mensaje.innerHTML = `${nombre} agregado al carrito`;

    // Agregar el mensaje al body y luego eliminarlo después de 0.7 segundos
    document.body.appendChild(mensaje);
    setTimeout(() => {
        mensaje.remove();
    }, 1000);

    // Actualizar la visualización del carrito
    mostrarCarrito();
}

// Función para restar un ítem del carrito
function restarProducto(nombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const producto = carrito.find(item => item.nombre === nombre);
    if (producto && producto.cantidad > 1) {
        producto.cantidad -= 1;
    } else {
        carrito = carrito.filter(item => item.nombre !== nombre);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la visualización del carrito
    mostrarCarrito();
}

// Función para sumar un ítem del carrito
function sumarProducto(nombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad += 1; // Aumentar la cantidad
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la visualización del carrito
    mostrarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(nombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Eliminar el producto del carrito
    carrito = carrito.filter(item => item.nombre !== nombre);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la visualización del carrito
    mostrarCarrito();
}

// Mostrar el carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = ''; // Limpiar carrito previo

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    let total = 0;

    // Crear un contenedor para los productos del carrito
    const productosCarrito = document.createElement('div');
    productosCarrito.classList.add('productos-carrito');

    carrito.forEach(item => {
        total += item.precio * item.cantidad;

        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('item-carrito');
        itemCarrito.innerHTML = `
            <div class="producto-card">
                <img src="./imagenes/${obtenerImagen(item.nombre)}" alt="${item.nombre}" class="imagen-producto">
                <div class="detalles-producto">
                    <p>${item.nombre} - $${item.precio} x${item.cantidad}</p>
                    <div class="boton">
                        <button class="sumar" data-nombre="${item.nombre}">+</button>
                        <button class="restar" data-nombre="${item.nombre}">-</button>
                        <button class="eliminar" data-nombre="${item.nombre}">Eliminar</button>
                    </div>
                </div>
            </div>
        `;

        productosCarrito.appendChild(itemCarrito);
    });

    // Agregar los productos al carritoContainer
    carritoContainer.appendChild(productosCarrito);

    // Crear y agregar el total
    const totalCarrito = document.createElement('div');
    totalCarrito.innerHTML = `
        <div class="total-carrito">
            <h3>Total: $${total}</h3>
            <button class="btn-enviar-consulta">Enviar consulta</button>
        </div>
    `;
    carritoContainer.appendChild(totalCarrito);

    // Asignar eventos para sumar, restar y eliminar productos
    const botonesRestar = document.querySelectorAll('.restar');
    botonesRestar.forEach((boton) => {
        boton.addEventListener('click', function() {
            const nombreProducto = this.dataset.nombre;
            restarProducto(nombreProducto);
        });
    });

    const botonesSumar = document.querySelectorAll('.sumar');
    botonesSumar.forEach((boton) => {
        boton.addEventListener('click', function() {
            const nombreProducto = this.dataset.nombre;
            sumarProducto(nombreProducto);
        });
    });

    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', function() {
            const nombreProducto = this.dataset.nombre;
            eliminarProducto(nombreProducto);
        });
    });

    // Evento para el botón de enviar consulta
    const botonEnviarConsulta = document.querySelector('.btn-enviar-consulta');
    if (botonEnviarConsulta) {
        botonEnviarConsulta.addEventListener('click', function() {
            // Mostrar mensaje con SweetAlert2 al enviar la consulta
            Swal.fire({
                icon: 'success',
                title: 'Solicitud enviada',
                text: 'Nos estaremos poniendo en contacto contigo en la brevedad. Nos vemos Pronto!',
                confirmButtonText: '¡Gracias!'
            });
        });
    }
}

// Asignar el botón para ver el carrito
document.getElementById('ver-carrito-btn').addEventListener('click', function() {
    document.getElementById('carrito-container').classList.toggle('visible');
});
