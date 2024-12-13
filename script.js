
function obtenerImagen(nombre) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];  
    const producto = productos.find(item => item.nombre === nombre);
    return producto ? producto.imagenes[0] : 'comingsoon.jpeg';
}


window.onload = function() {
    mostrarFormularioFechas();
};


function mostrarFormularioDatosPersonales() {
    const contenedor = document.querySelector('.contenedor-datos');

    const nombreCompleto = localStorage.getItem('nombreCompleto') || '';
    const dni = localStorage.getItem('dni') || '';
    const email = localStorage.getItem('email') || '';
    const telefono = localStorage.getItem('telefono') || ''; 

    contenedor.innerHTML = `
        <h2>Primero, ingresa tus datos personales:</h2>
        <div class=datos>
            <label for="nombre-completo"><h3>Nombre Completo:</h3></label>
            <input type="text" id="nombre-completo" value="${nombreCompleto}">
            <label for="dni"><h3>DNI:</h3></label>
            <input type="text" id="dni" value="${dni}">
            <label for="email"><h3>Correo Electrónico:</h3></label>
            <input type="email" id="email" value="${email}">
            <label for="telefono"><h3>Número de Teléfono (incluyendo país y área):</h3></label>
            <input type="text" id="telefono" value="${telefono}" placeholder="+XX XXX XXXXXXXX">  <!-- Campo para teléfono -->
        </div>
            <button id="confirmar-datos">Continuar</button>
        
    `;
    

    document.getElementById('confirmar-datos').addEventListener('click', function () {
        const nombreCompleto = document.getElementById('nombre-completo').value.trim();
        const dni = document.getElementById('dni').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

    
        if (nombreCompleto && dni && email && telefono) {
        
            localStorage.setItem('nombreCompleto', nombreCompleto);
            localStorage.setItem('dni', dni);
            localStorage.setItem('email', email);
            localStorage.setItem('telefono', telefono); 
            mostrarFormularioFechas(); 
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos.',
                confirmButtonColor: '#d33',
                background: '#f8d7da',
            });
        }
    });
}


window.onload = function () {
    mostrarFormularioDatosPersonales();
};


function mostrarFormularioFechas() {
    const contenedor = document.querySelector('.contenedor-fechas');


    const fechaLlegada = localStorage.getItem('fechaLlegada') || '';
    const fechaSalida = localStorage.getItem('fechaSalida') || '';

    contenedor.innerHTML = `
        <h2>Segundo, ya podes ingresár las fechas en las que viajaras con nosotros:</h2>
        <label for="fecha-llegada">Fecha de Llegada:</label>
        <input type="date" id="fecha-llegada" value="${fechaLlegada}">
        <label for="fecha-salida">Fecha de Salida:</label>
        <input type="date" id="fecha-salida" value="${fechaSalida}">
        <button id="confirmar-fechas">Seleccionar fechas</button>
    `;


    document.getElementById('confirmar-fechas').addEventListener('click', function() {
        const fechaLlegada = document.getElementById('fecha-llegada').value;
        const fechaSalida = document.getElementById('fecha-salida').value;

    
            if (fechaLlegada && fechaSalida) {
            
            localStorage.setItem('fechaLlegada', fechaLlegada);
            localStorage.setItem('fechaSalida', fechaSalida);

            const fechaLlegadaObj = new Date(fechaLlegada);
            const fechaSalidaObj = new Date(fechaSalida);

            fechaSalidaObj.setDate(fechaSalidaObj.getDate() - 1);

            const diasTotales = Math.floor((fechaSalidaObj - fechaLlegadaObj) / (1000 * 60 * 60 * 24));

            localStorage.setItem('diasTotales', diasTotales);
            

            
            mostrarProductos(diasTotales);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa ambas fechas.',
                confirmButtonColor: '#d33',
                background: '#f8d7da',
            });
        }
    });
}


function mostrarProductos() {
    fetch('./info.json')
        .then(response => response.json())
        .then(productos => {
            
            localStorage.setItem('productos', JSON.stringify(productos));
            agregarProductos(productos);
        })
}

function agregarProductos(productos) {
    const contenedorHabitaciones = document.querySelector('.productos-habitaciones');
    const contenedorExcursiones = document.querySelector('.productos-excursiones');  

    if (!contenedorHabitaciones || !contenedorExcursiones) {
        return;
    }

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('catalogo');
        
        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="./imagenes/${producto.imagenes[0]}" alt="${producto.nombre}" class="imagen-producto" data-imagenes='${JSON.stringify(producto.imagenes)}'>
            <p class="precio">USD$${producto.precio} por día</p>
            ${producto.pasajeros ? `<p class="pasajeros">Pasajeros: ${producto.pasajeros}</p>` : ""}            
            <button>Agregar al Carrito</button> <input type="number" class="cantidad" value="1" min="1" style="width: 60px; margin-bottom: 10px;">
        `;

    
        if (producto.categoria === "habitaciones") {
            contenedorHabitaciones.appendChild(tarjeta);
        } else if (producto.categoria === "excursiones") {  
            contenedorExcursiones.appendChild(tarjeta);
        }

        const imagenProducto = tarjeta.querySelector('.imagen-producto');
        imagenProducto.addEventListener('click', function() {
            const imagenes = JSON.parse(imagenProducto.getAttribute('data-imagenes'));
            mostrarGaleria(imagenes);
        });
    });

    const botonesAgregarCarrito = document.querySelectorAll('.catalogo button');
    botonesAgregarCarrito.forEach((boton) => {
        boton.addEventListener('click', function() {
            const tarjeta = this.closest('.catalogo');
            const nombre = tarjeta.querySelector('h3').innerText;
            const precio = parseFloat(tarjeta.querySelector('.precio').innerText.replace('USD$', ''));
            const cantidad = parseInt(tarjeta.querySelector('.cantidad').value);

            agregarAlCarrito(nombre, precio, cantidad);
        });
    });
}


function mostrarGaleria(imagenes) {

    const galeria = document.createElement('div');
    galeria.classList.add('galeria-imagenes');

    
    const tarjetaImagen = document.createElement('div');
    tarjetaImagen.classList.add('tarjeta-imagen');
    galeria.appendChild(tarjetaImagen);

    
    const imagenElemento = document.createElement('img');
    imagenElemento.src = `./imagenes/${imagenes[0]}`;
    imagenElemento.alt = "Imagen del producto";
    imagenElemento.classList.add('imagen-galeria');
    tarjetaImagen.appendChild(imagenElemento);


const botones = document.createElement('div');
botones.classList.add('botones-galeria');


const cerrarGaleria = document.createElement('button');
cerrarGaleria.innerText = 'Cerrar';
cerrarGaleria.classList.add('cerrar-galeria');
cerrarGaleria.addEventListener('click', function() {
    galeria.remove();
});
botones.appendChild(cerrarGaleria);


const anteriorBtn = document.createElement('button');
anteriorBtn.innerText = 'Anterior';
anteriorBtn.classList.add('anterior');
botones.appendChild(anteriorBtn);

const siguienteBtn = document.createElement('button');
siguienteBtn.innerText = 'Siguiente';
siguienteBtn.classList.add('siguiente');
botones.appendChild(siguienteBtn);



tarjetaImagen.appendChild(botones); 



    let indiceImagen = 0;

    
    function actualizarImagen() {
        imagenElemento.src = `./imagenes/${imagenes[indiceImagen]}`;
    }

    
    siguienteBtn.addEventListener('click', function() {
        if (indiceImagen < imagenes.length - 1) {
            indiceImagen++;
        } else {
            indiceImagen = 0; 
        }
        actualizarImagen();
    });

    anteriorBtn.addEventListener('click', function() {
        if (indiceImagen > 0) {
            indiceImagen--;
        } else {
            indiceImagen = imagenes.length - 1; 
        }
        actualizarImagen();
    });

    document.body.appendChild(galeria);
}


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


function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = '';
    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }
    let total = 0;
    let detallesCarrito = '';

    const productosCarrito = document.createElement('div');
    productosCarrito.classList.add('productos-carrito');
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        detallesCarrito += ` | ${item.nombre} - $${item.precio} x${item.cantidad} x |  `;
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
    carritoContainer.appendChild(productosCarrito);


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




    
    const totalCarrito = document.createElement('div');
    totalCarrito.innerHTML = `
        <div class="total-carrito">
            <h3>Total: $${total}</h3>
            <button class="btn-enviar-consulta">Enviar consulta</button>
        </div>
    `;
    carritoContainer.appendChild(totalCarrito);


    emailjs.init("jG55NQ5pF4Qie2WvZ"); 
    

    const botonEnviarConsulta = document.querySelector('.btn-enviar-consulta');
    if (botonEnviarConsulta) {
        botonEnviarConsulta.addEventListener('click', function() {
        
            const nombreCompleto = localStorage.getItem('nombreCompleto') || '';
            const dni = localStorage.getItem('dni') || '';
            const emailUsuario = localStorage.getItem('email') || '';
            const telefono = localStorage.getItem('telefono') || ''; 

            
            const fechaLlegada = localStorage.getItem('fechaLlegada') || '';
            const fechaSalida = localStorage.getItem('fechaSalida') || '';

            
            emailjs.send('service_dgomyco', 'template_bx1tqtb', {
                to_email: 'lembranzasbr@gmail.com',  
                subject: 'Nueva Consulta Recibida',
                nombreCompleto: nombreCompleto, 
                dni: dni,                    
                emailUsuario: emailUsuario,  
                telefono: telefono,          
                fechaLlegada: fechaLlegada,  
                fechaSalida: fechaSalida,    
                detallesCarrito: detallesCarrito,  
                total: total                 
            
            });

            
            Swal.fire({
                icon: 'success',
                title: 'Solicitud enviada',
                text: 'Nos estaremos poniendo en contacto contigo en la brevedad. ¡Nos vemos pronto!',
                confirmButtonText: '¡Gracias!'
            });
        });
    }
}


