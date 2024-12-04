const productos =[
    {id:1, nombre: "Habitación grand", categoria: "habitaciones", subcategoria:"habitaciones", stock: 10, precio: 160, pasajeros:6, imagen:"grand.jpg" },
    {id:2, nombre: "Habitación quintuple", categoria: "habitaciones", subcategoria:"habitaciones", stock: 10, precio: 140, pasajeros:5, imagen:"quintuple.jpg" },
    {id:3, nombre: "Habitación cuadruple", categoria: "habitaciones", subcategoria:"habitaciones", stock: 10, precio: 120, pasajeros:4, imagen:"cuadruple.jpg" },
    {id:4, nombre: "Habitación triple", categoria: "habitaciones", subcategoria:"habitaciones", stock: 10, precio: 100, pasajeros:3, imagen:"triple.jpg" },
    {id:5, nombre: "Habitación doble", categoria: "habitaciones", subcategoria:"habitaciones", stock: 10, precio: 80, pasajeros:2, imagen:"doble.jpg" },

    {id:6, nombre: "Café", categoria: "servicio-habitacion", subcategoria:"bebida - infusión", stock: 1000, precio: 4, pasajeros:null, imagen:"cafe.jpg" },
    {id:7, nombre: "Té", categoria: "servicio-habitacion", subcategoria:"bebida - infusión", stock: 1000, precio: 4, pasajeros:null, imagen:"te.jpeg" },
    {id:8, nombre: "Mate cocido", categoria: "servicio-habitacion", subcategoria:"bebida - infusión", stock: 1000, precio: 3, pasajeros:null, imagen:"matecocido.jpg" },
    {id:9, nombre: "Medialunas", categoria: "servicio-habitacion", subcategoria:"alimento - panificado", stock: 2000, precio: 2, pasajeros:null, imagen:"medialunas.jpg"},
    {id:10, nombre: "Tostadas", categoria: "servicio-habitacion", subcategoria:"alimento - panificado", stock: 2000, precio: 2, pasajeros:null, imagen:"tostadas.jpg"},
    {id:11, nombre: "Milanesas", categoria: "servicio-habitacion", subcategoria:"alimento - carne", stock: 2000, precio: 5, pasajeros:null, imagen:"milanesas.png"},
    {id:12, nombre: "Asado de banderitas", categoria: "servicio-habitacion", subcategoria:"alimento - carne", stock: 2000, precio: 8, pasajeros:null, imagen:"asadobanderita.PNG"},
    {id:13, nombre: "Pure", categoria: "servicio-habitacion", subcategoria:"alimento - guarnición", stock: 2000, precio: 4, pasajeros:null, imagen:"pure.jpg"},
    {id:14, nombre: "Ensalada", categoria: "servicio-habitacion", subcategoria:"alimento - guarnición", stock: 2000, precio: 4, pasajeros:null, imagen:"ensalada.jpg"},
    {id:15, nombre: "Papas fritas", categoria: "servicio-habitacion", subcategoria:"alimento - guarnición", stock: 2000, precio: 2, pasajeros:null, imagen:"papasfritas.jpg"},
    {id:16, nombre: "Caipirinha", categoria: "servicio-habitacion", subcategoria:"bebida alcoholica", stock: 1000, precio: 5, pasajeros:null, imagen:"caipirinha.PNG"},
    {id:17, nombre: "Caipiroska", categoria: "servicio-habitacion", subcategoria:"bebida alcoholica", stock: 1000, precio: 5, pasajeros:null, imagen:"caipiroska.jpg"},
    {id:18, nombre: "Fernet-cola", categoria: "servicio-habitacion", subcategoria:"bebida alcoholica", stock: 1000, precio: 5, pasajeros:null, imagen:"fernetcola.png"},
    {id:19, nombre: "Gancia-limón", categoria: "servicio-habitacion", subcategoria:"bebida alcoholica", stock: 1000, precio: 5, pasajeros:null, imagen:"gancia-limon.jpg"},
    {id:20, nombre: "Cerveza", categoria: "servicio-habitacion", subcategoria:"bebida alcoholica", stock: 2000, precio: 3, pasajeros:null, imagen:"cerveza.PNG"},
    {id:21, nombre: "Agua", categoria: "servicio-habitacion", subcategoria:"bebida sin alcohol", stock: 2000, precio: 1, pasajeros:null, imagen:"agua.PNG"},
    {id:22, nombre: "Caipirinha sin alcohol", categoria: "servicio-habitacion", subcategoria:"bebida sin alcohol", stock: 2000, precio: 4, pasajeros:null, imagen:"caipirinha.PNG"},
    {id:23, nombre: "Caipiroska sin alcohol", categoria: "servicio-habitacion", subcategoria:"bebida sin alcohol", stock: 2000, precio: 4, pasajeros:null, imagen:"caipiroska.jpg"},
    {id:24, nombre: "Licuado", categoria: "servicio-habitacion", subcategoria:"bebida sin alcohol", stock: 2000, precio: 2, pasajeros:null, imagen:"licuado.jpg"},
    {id:25, nombre: "Jugo de frutas", categoria: "servicio-habitacion", subcategoria:"bebida sin alcohol", stock: 2000, precio: 2, pasajeros:null, imagen:"juegodefrutas.png"},
    {id:26, nombre: "Gaseosa", categoria: "servicio-habitacion", subcategoria:"bebida sin alcohol", stock: 2000, precio: 3, pasajeros:null, imagen:"gaseosa.PNG"},
    
    
    {id:27, nombre: "Café", categoria: "servicio-playa", subcategoria:"bebida - infusión", stock: 1000, precio: 5, pasajeros:null, imagen:"cafe.jpg" },
    {id:28, nombre: "Té", categoria: "servicio-playa", subcategoria:"bebida - infusión", stock: 1000, precio: 5, pasajeros:null, imagen:"te.jpeg" },
    {id:29, nombre: "Mate cocido", categoria: "servicio-playa", subcategoria:"bebida - infusión", stock: 1000, precio: 4, pasajeros:null, imagen:"matecocido.jpg" },
    {id:30, nombre: "Medialunas", categoria: "servicio-playa", subcategoria:"alimento - panificado", stock: 2000, precio: 3, pasajeros:null, imagen:"medialunas.jpg"},
    {id:31, nombre: "Tostadas", categoria: "servicio-playa", subcategoria:"alimento - panificado", stock: 2000, precio: 3, pasajeros:null, imagen:"tostadas.jpg"},
    {id:32, nombre: "Milanesas", categoria: "servicio-playa", subcategoria:"alimento - carne", stock: 2000, precio: 6, pasajeros:null, imagen:"milanesas.png"},
    {id:33, nombre: "Asado de banderitas", categoria: "servicio-playa", subcategoria:"alimento - carne", stock: 2000, precio: 8, pasajeros:null, imagen:"asadobanderita.PNG"},
    {id:34, nombre: "Pure", categoria: "servicio-playa", subcategoria:"alimento - guarnición", stock: 2000, precio: 5, pasajeros:null, imagen:"pure.jpg"},
    {id:35, nombre: "Ensalada", categoria: "servicio-playa", subcategoria:"alimento - guarnición", stock: 2000, precio: 5, pasajeros:null, imagen:"ensalada.jpg"},
    {id:36, nombre: "Papas fritas", categoria: "servicio-playa", subcategoria:"alimento - guarnición", stock: 2000, precio: 3, pasajeros:null, imagen:"papasfritas.jpg"},
    {id:37, nombre: "Caipirinha", categoria: "servicio-playa", subcategoria:"bebida alcoholica", stock: 1000, precio: 6, pasajeros:null, imagen:"caipirinha.PNG"},
    {id:38, nombre: "Caipiroska", categoria: "servicio-playa", subcategoria:"bebida alcoholica", stock: 1000, precio: 6, pasajeros:null, imagen:"caipiroska.jpg"},
    {id:39, nombre: "Fernet-cola", categoria: "servicio-playa", subcategoria:"bebida alcoholica", stock: 1000, precio: 6, pasajeros:null, imagen:"fernetcola.png"},
    {id:40, nombre: "Gancia-limón", categoria: "servicio-playa", subcategoria:"bebida alcoholica", stock: 1000, precio: 6, pasajeros:null, imagen:"gancia-limon.jpg"},
    {id:41, nombre: "Cerveza", categoria: "servicio-playa", subcategoria:"bebida alcoholica", stock: 2000, precio: 4, pasajeros:null, imagen:"cerveza.PNG"},
    {id:42, nombre: "Agua", categoria: "servicio-playa", subcategoria:"bebida sin alcohol", stock: 2000, precio: 2, pasajeros:null, imagen:"agua.PNG"},
    {id:43, nombre: "Caipirinha sin alcohol", categoria: "servicio-playa", subcategoria:"bebida sin alcohol", stock: 2000, precio: 5, pasajeros:null, imagen:"caipirinha.PNG"},
    {id:44, nombre: "Caipiroska sin alcohol", categoria: "servicio-playa", subcategoria:"bebida sin alcohol", stock: 2000, precio: 5, pasajeros:null , imagen:"caipiroska.jpg"},
    {id:45, nombre: "Licuado", categoria: "servicio-playa", subcategoria:"bebida sin alcohol", stock: 2000, precio: 3, pasajeros:null , imagen:"licuado.jpg"},
    {id:46, nombre: "Jugo de frutas", categoria: "servicio-playa", subcategoria:"bebida sin alcohol", stock: 2000, precio: 3, pasajeros:null , imagen:"juegodefrutas.png"},
    {id:47, nombre: "Gaseosa", categoria: "servicio-playa", subcategoria:"bebida sin alcohol", stock: 2000, precio: 3, pasajeros:null, imagen:"gaseosa.PNG" },
    {id:48, nombre: "Alquiler de reposera", categoria: "servicio-playa", subcategoria:"bebida sin alcohol", stock: 2000, precio: 2, pasajeros:null, imagen:"reposera.PNG" },
    {id:49, nombre: "Alquiler de mesa de playa", categoria: "servicio-playa", subcategoria:"bebida sin alcohol", stock: 2000, precio: 2, pasajeros:null , imagen:"mesitadeplaya.PNG" },
    {id:50, nombre: "Alquiler de sombrilla", categoria: "servicio-playa", subcategoria:"bebida sin alcohol", stock: 2000, precio: 2, pasajeros:null , imagen:"sombrilla.PNG" },

];

// Función para agregar los productos dinámicamente
function agregarProductos() {
    // Obtener los contenedores donde se agregarán los productos
    const contenedorHabitaciones = document.querySelector('.productos-habitaciones');
    const contenedorServiciosHabitacion = document.querySelector('.productos-servicios-habitacion');
    const contenedorServiciosPlaya = document.querySelector('.productos-servicios-playa');

    // Recorrer el array de productos y agregar las tarjetas en los contenedores correspondientes
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

        // Dependiendo de la categoría, agregar el producto en el contenedor correspondiente
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
    productosCarrito.classList.add('productos-carrito'); // Añadir clase para flexbox

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
}

// Función para obtener la imagen del producto (si no existe, puedes usar una imagen predeterminada)
function obtenerImagen(nombre) {
    const producto = productos.find(item => item.nombre === nombre);
    return producto ? producto.imagen : 'imagen-predeterminada.jpg';
}

// Asignar el evento para el botón "Ver carrito"
document.querySelector('.ver-carrito').addEventListener('click', mostrarCarrito);

// Cargar los productos al cargar la página
window.onload = agregarProductos;
