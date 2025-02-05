
function obtenerImagen(nombre) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];  
    const producto = productos.find(item => item.nombre === nombre);
    return producto ? producto.imagenes[0] : 'LOGO.png';
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

        const diasTotales = localStorage.getItem('diasTotales');

        total += item.precio * item.cantidad * diasTotales;

        detallesCarrito += ` | ${item.nombre} - USD$ ${item.precio} x ${item.cantidad} unidad/es x ${diasTotales} días.|  `;
        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('item-carrito');
        itemCarrito.innerHTML = `
            <div class="producto-card">
                <img src="./imagenes/${obtenerImagen(item.nombre)}" alt="${item.nombre}" class="imagen-producto">
                <div class="detalles-producto">
                    <p>${item.nombre} - USD $${item.precio} x ${item.cantidad} unidad/es x ${diasTotales} días.</p>
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
            <h3>Total: USD$${total}</h3>
            <button class="btn-enviar-consulta">Enviar consulta</button>
        </div>
    `;
    carritoContainer.appendChild(totalCarrito);
    
    emailjs.init("jG55NQ5pF4Qie2WvZ");
    
    const botonEnviarConsulta = document.querySelector('.btn-enviar-consulta');
    if (botonEnviarConsulta) {
        botonEnviarConsulta.addEventListener('click', function () {
            const nombreCompleto = localStorage.getItem('nombreCompleto') || 'No especificado';
            const dni = localStorage.getItem('dni') || 'No especificado';
            const emailUsuario = localStorage.getItem('email') || 'No especificado';
            const telefono = localStorage.getItem('telefono') || 'No especificado';
            const diasTotales = localStorage.getItem('diasTotales') || 'No especificado';
            const fechaLlegada = localStorage.getItem('fechaLlegada') || 'No especificado';
            const fechaSalida = localStorage.getItem('fechaSalida') || 'No especificado';
        
            emailjs.send('service_dgomyco', 'template_bx1tqtb', {
                to_email: 'lembranzasbr@gmail.com',
                subject: 'Nueva Consulta Recibida',
                nombreCompleto: nombreCompleto,
                dni: dni,
                emailUsuario: emailUsuario,
                telefono: telefono,
                fechaLlegada: fechaLlegada,
                fechaSalida: fechaSalida,
                diasTotales: diasTotales,
                detallesCarrito: detallesCarrito,
                total: total
            });
        
            Swal.fire({
                icon: 'success',
                title: 'Solicitud enviada',
                text: 'Nos estaremos poniendo en contacto contigo en la brevedad. ¡Nos vemos pronto!',
                confirmButtonText: '¡Gracias!'
            }).then(() => {
                localStorage.clear();
                window.location.href = "/";
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    let currentIndex = 0;

    const firstImageClone = images[0].cloneNode(true);
    carouselImages.appendChild(firstImageClone);

    const totalImages = images.length + 1;

    function slideCarousel() {
        currentIndex++;
        carouselImages.style.transition = 'transform 0.5s ease-in-out';
        carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;

        if (currentIndex === totalImages - 1) {
            setTimeout(() => {
                carouselImages.style.transition = 'none';
                currentIndex = 0;
                carouselImages.style.transform = `translateX(0)`;
            }, 500);
        }
    }

    setInterval(slideCarousel, 2000);
});
