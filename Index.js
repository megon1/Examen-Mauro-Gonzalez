document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-producto');
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    
    // Función para renderizar la tabla de productos
    function renderizarTabla() {
        // Limpiar tabla
        cuerpoTabla.innerHTML = '';
        
        // Obtener todos los productos
        const productos = Producto.obtenerTodos();
        
       
       
        productos.forEach(producto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td class="acciones">
                    <button class="btn-eliminar" data-codigo="${producto.codigo}">Eliminar</button>
                </td>
            `;
            cuerpoTabla.appendChild(fila);
        });
        
        
        document.querySelectorAll('.btn-eliminar').forEach(boton => {
            boton.addEventListener('click', function() {
                const codigo = this.getAttribute('data-codigo');
                eliminarProducto(codigo);
            });
        });
    }
    
    // agregar un producto
    function agregarProducto(codigo, nombre, precio) {
       
        const nuevoProducto = new Producto(codigo, nombre, parseInt(precio));
        
        // Agregar a la lista estática
        Producto.agregar(nuevoProducto);
        
        // Actualizar la tabla
        renderizarTabla();
    }
    
    // eliminar un producto
    function eliminarProducto(codigo) {
        if (confirm('¿Está seguro de que desea eliminar este producto?')) {
            const eliminado = Producto.eliminar(codigo);
            if (eliminado) {
                renderizarTabla();
                alert('Producto eliminado correctamente');
            } else {
                alert('Error al eliminar el producto');
            }
        }
    }
    
    // listea para el formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // datos para el formulario
        const codigo = document.getElementById('codigo').value;
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        
      
        
        // Agregar el producto
        agregarProducto(codigo, nombre, precio);
        
        
        // Enfocar el primer campo
        document.getElementById('codigo').focus();
    });
    
    // Renderizar tabla inicial
    renderizarTabla();
});

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando aplicación...');
    
    const form = document.getElementById('form-producto');
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    
    // Verificar que los elementos existen
    if (!form || !cuerpoTabla) {
        console.error('No se encontraron los elementos necesarios en el DOM');
        return;
    }
    
    // Función para mostrar mensajes
    function mostrarMensaje(mensaje, tipo = 'exito') {
        // Eliminar mensajes anteriores
        const mensajeAnterior = document.querySelector('.mensaje-exito, .mensaje-error');
        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }
        
        // Crear nuevo mensaje
        const divMensaje = document.createElement('div');
        divMensaje.className = tipo === 'exito' ? 'mensaje-exito' : 'mensaje-error';
        divMensaje.textContent = mensaje;
        
        // Insertar después del formulario
        const formContainer = document.querySelector('.form-container');
        formContainer.appendChild(divMensaje);
        
        // Auto-eliminar después de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
    
    // Función para renderizar la tabla de productos
    function renderizarTabla() {
        console.log('Renderizando tabla...');
        
        // Limpiar tabla
        cuerpoTabla.innerHTML = '';
        
        // Obtener todos los productos
        const productos = Producto.obtenerTodos();
        console.log('Productos encontrados:', productos);
        
        // Si no hay productos, mostrar mensaje
        if (productos.length === 0) {
            const fila = document.createElement('tr');
            fila.innerHTML = `<td colspan="4" style="text-align: center; color: #666;">No hay productos registrados</td>`;
            cuerpoTabla.appendChild(fila);
            return;
        }
        
        // Agregar cada producto a la tabla
        productos.forEach(producto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td class="acciones">
                    <button class="btn-eliminar" data-codigo="${producto.codigo}">Eliminar</button>
                </td>
            `;
            cuerpoTabla.appendChild(fila);
        });
        
        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.btn-eliminar').forEach(boton => {
            boton.addEventListener('click', function() {
                const codigo = this.getAttribute('data-codigo');
                eliminarProducto(codigo);
            });
        });
    }
    
    // Función para agregar un producto
    function agregarProducto(codigo, nombre, precio) {
        try {
            // Validar datos
            if (!codigo || !nombre || !precio) {
                throw new Error('Todos los campos son obligatorios');
            }
            
            if (isNaN(precio) || parseFloat(precio) <= 0) {
                throw new Error('El precio debe ser un número mayor a 0');
            }
            
            // Crear nueva instancia de Producto
            const nuevoProducto = new Producto(codigo.trim(), nombre.trim(), parseFloat(precio));
            
            // Agregar a la lista estática
            Producto.agregar(nuevoProducto);
            
            // Actualizar la tabla
            renderizarTabla();
            
            // Mostrar mensaje de éxito
            mostrarMensaje(`Producto "${nombre}" agregado correctamente`, 'exito');
            
            return true;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            mostrarMensaje(error.message, 'error');
            return false;
        }
    }
    
    // Función para eliminar un producto
    function eliminarProducto(codigo) {
        if (confirm('¿Está seguro de que desea eliminar este producto?')) {
            const eliminado = Producto.eliminar(codigo);
            if (eliminado) {
                renderizarTabla();
                mostrarMensaje('Producto eliminado correctamente', 'exito');
            } else {
                mostrarMensaje('Error al eliminar el producto', 'error');
            }
        }
    }
    
    // Event listener para el formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulario enviado');
        
        // Obtener valores del formulario
        const codigo = document.getElementById('codigo').value;
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        
        console.log('Datos del formulario:', { codigo, nombre, precio });
        
        // Validar que el código no exista
        const existe = Producto.obtenerTodos().some(producto => producto.codigo === codigo);
        if (existe) {
            mostrarMensaje('Ya existe un producto con ese código', 'error');
            return;
        }
        
        // Agregar el producto
        const agregado = agregarProducto(codigo, nombre, precio);
        
        if (agregado) {
           
            form.reset();
            
            // Enfocar el primer campo
            document.getElementById('codigo').focus();
        }
    });
    
});