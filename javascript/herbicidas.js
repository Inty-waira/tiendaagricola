
agregarProductoAInventario("METSULFURON", 115000, 2500, 20, "./imagenes/METSULFURON.jpg", 12041);
agregarProductoAInventario("BASAGRAN", 18000, 87000, 30, "./imagenes/BASAGRAN.jpg", 22142);
agregarProductoAInventario("SELECT", 15000, 58000, 15, "./imagenes/SELECT.png", 354463);
agregarProductoAInventario("PANZER 648", 25000, 6000, 20, "./imagenes/PANZER 648.png", 44664);
agregarProductoAInventario("TROTON *1lt", 32000, 30000, 110, "./imagenes/troton.jpg", 52355);
agregarProductoAInventario("TOUCHDOWN *4Lt", 150000, 130000, 10, "./imagenes/touchdown.jpg", 33386);

for (const clave in productosInventario) {
    crearProductoHTML(productosInventario[clave]);
}

document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const codigoProducto = event.target.dataset.codigo;
            const inputCantidad = document.getElementById(`cantidad-${codigoProducto}`);
            const cantidadSeleccionada = inputCantidad.value;

            agregarAlCarrito(codigoProducto, cantidadSeleccionada);
            inputCantidad.value = 0;
        });
    });

    actualizarVistaCarrito();

    const sendButton = document.querySelector('.send-button');
    if (sendButton) {
        sendButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (Object.keys(carrito).length === 0) {
                alert("El carrito está vacío. ¡Agregue algunos productos antes de comprar!");
                return;
            }

            localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
            localStorage.setItem('totalCarrito', calcularTotalCarrito().toString());

            console.log("Datos del carrito guardados en localStorage (después de guardar):", localStorage.getItem('carritoDeCompras'));
            console.log("Total del carrito guardado en localStorage (después de guardar):", localStorage.getItem('totalCarrito'));

            window.location.href = 'factura.html';
        });
    } else {
        console.error("Error: El botón 'COMPRAR' (.send-button) no fue encontrado en el DOM.");
    }
});