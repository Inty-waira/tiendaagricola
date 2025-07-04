agregarProductoAInventario("", 115000, 80000, 20, "./imagenes/.jpg", 1204);
agregarProductoAInventario("", 18000, 12000, 30, "./imagenes/.jpg", 2214);
agregarProductoAInventario("", 15000, 10000, 15, "./imagenes/.jpg", 35446);
agregarProductoAInventario("", 9000, 6000, 20, "./imagenes/.jpg", 4466);
agregarProductoAInventario("", 10000, 7000, 110, "./imagenes/.jpg", 5235);
agregarProductoAInventario("", 4500, 3000, 10, "./imagenes/.jpg", 3338);

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