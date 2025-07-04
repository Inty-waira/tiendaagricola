
agregarProductoAInventario("Oxicloruro de cobre", 54000, 80000, 20, "/imagenes/Oxicloruro adama.png", 1204);
agregarProductoAInventario("AZUFRE 720", 18000, 30000, 30, "./imagenes/POLYTHION.jpg", 2214);
agregarProductoAInventario("AUTHORITY", 15000, 87000, 15, "./imagenes/AUTHORITY.jpeg", 35446);
agregarProductoAInventario("CARBENDAZIN", 9000, 22000, 20, "./imagenes/carbendazim.jpeg", 4466);
agregarProductoAInventario("MANZATE", 10000, 19200, 110, "./imagenes/MANZATE.jpeg", 5235);
agregarProductoAInventario("FUDIOLAN", 4500, 48000, 10, "./imagenes/FUDIOLAN.jpg", 3338);

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