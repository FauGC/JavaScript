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
            <input type="text" id="telefono" value="${telefono}" placeholder="+XX XXX XXXXXXXX">
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

    const fechaHoy = new Date().toISOString().split('T')[0];

    contenedor.innerHTML = `
        <h2>Segundo, ya podes ingresár las fechas en las que viajaras con nosotros:</h2>
        <label for="fecha-llegada">Fecha de Llegada:</label>
        <input type="date" id="fecha-llegada" value="${fechaLlegada}" min="${fechaHoy}">
        <label for="fecha-salida">Fecha de Salida:</label>
        <input type="date" id="fecha-salida" value="${fechaSalida}" min="${fechaHoy}">
        <button id="confirmar-fechas">Seleccionar fechas</button>
    `;

    let fechasConfirmadas = false;
    const fechaLlegadaInput = document.getElementById('fecha-llegada');
    const fechaSalidaInput = document.getElementById('fecha-salida');
    const confirmarFechasBtn = document.getElementById('confirmar-fechas');

    function mostrarAlertaFechasBloqueadas() {
        Swal.fire({
            icon: 'error',
            title: 'Cambios no permitidos',
            text: 'Si quieres cambiar las fechas, por favor reinicia la página.',
            confirmButtonColor: '#d33',
            background: '#f8d7da'
        });
    }

    confirmarFechasBtn.addEventListener('click', function () {
        if (fechasConfirmadas) {
            mostrarAlertaFechasBloqueadas();
            return; // No continuar si las fechas ya están confirmadas
        }

        const fechaLlegada = fechaLlegadaInput.value;
        const fechaSalida = fechaSalidaInput.value;

        if (!fechaLlegada || !fechaSalida) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe seleccionar la fecha de salida y la fecha de llegada.',
                confirmButtonColor: '#d33',
                background: '#f8d7da',
            });
            return;
        }

        const fechaLlegadaObj = new Date(fechaLlegada);
        const fechaSalidaObj = new Date(fechaSalida);

        if (fechaLlegadaObj < new Date(fechaHoy)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de llegada debe ser hoy o posterior.',
                confirmButtonColor: '#d33',
                background: '#f8d7da'
            });
            return;
        }

        if (fechaSalidaObj < new Date(fechaHoy)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de salida debe ser hoy o posterior.',
                confirmButtonColor: '#d33',
                background: '#f8d7da'
            });
            return;
        }

        if (fechaSalidaObj <= fechaLlegadaObj) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de salida debe ser al menos un día después de la fecha de llegada.',
                confirmButtonColor: '#d33',
                background: '#f8d7da'
            });
            return;
        }

        // Almacenar las fechas seleccionadas
        localStorage.setItem('fechaLlegada', fechaLlegada);
        localStorage.setItem('fechaSalida', fechaSalida);

        const diasTotales = ((fechaSalidaObj - fechaLlegadaObj) / (1000 * 60 * 60 * 24));

        localStorage.setItem('diasTotales', diasTotales);

        fechasConfirmadas = true;

        mostrarProductos(diasTotales); // Mostrar el catálogo de productos
    });

    fechaLlegadaInput.addEventListener('input', function() {
        if (fechasConfirmadas) {
            fechaLlegadaInput.value = localStorage.getItem('fechaLlegada');
            mostrarAlertaFechasBloqueadas();
        }
    });

    fechaSalidaInput.addEventListener('input', function() {
        if (fechasConfirmadas) {
            fechaSalidaInput.value = localStorage.getItem('fechaSalida');
            mostrarAlertaFechasBloqueadas();
        }
    });
}
