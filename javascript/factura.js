document.addEventListener('DOMContentLoaded', () => {
    const listaProductosFactura = document.getElementById('lista-productos-factura');
    const totalFacturaElement = document.getElementById('total-factura');

    const carritoGuardado = localStorage.getItem('carritoDeCompras');
    const totalGuardado = localStorage.getItem('totalCarrito');

    console.log("Datos del carrito recuperados de localStorage (en factura.html):", carritoGuardado);
    console.log("Total del carrito recuperado de localStorage (en factura.html):", totalGuardado);

    if (carritoGuardado && totalGuardado) {
        let carrito;
        try {
            carrito = JSON.parse(carritoGuardado);
        } catch (e) {
            console.error("Error al parsear el carrito de localStorage:", e);
            alert("Hubo un error al cargar los datos del carrito. Por favor, intente de nuevo.");
            listaProductosFactura.innerHTML = '<tr><td colspan="4">Error al cargar productos.</td></tr>';
            totalFacturaElement.textContent = 'Total a Pagar: $0,00';
            return;
        }
        
        let htmlProductos = '';

        if (Object.keys(carrito).length > 0) {
            for (const clave in carrito) {
                const item = carrito[clave];
                const precio = parseFloat(item.precioUnitario) || 0;
                const cantidad = parseInt(item.cantidad) || 0;
                const subtotal = precio * cantidad;
                
                htmlProductos += `
                    <tr>
                        <td>${item.descripcion}</td>
                        <td>${cantidad}</td>
                        <td>$${precio.toLocaleString('es-CO')}</td>
                        <td>$${subtotal.toLocaleString('es-CO')}</td>
                    </tr>
                `;
            }
            listaProductosFactura.innerHTML = htmlProductos;
            totalFacturaElement.textContent = `Total a Pagar: $${parseFloat(totalGuardado).toLocaleString('es-CO')}`;
        } else {
            listaProductosFactura.innerHTML = '<tr><td colspan="4">El carrito estaba vacío al momento de la compra.</td></tr>';
            totalFacturaElement.textContent = 'Total a Pagar: $0,00';
        }

        localStorage.removeItem('carritoDeCompras');
        localStorage.removeItem('totalCarrito');

    } else {
        listaProductosFactura.innerHTML = '<tr><td colspan="4">No hay productos en la factura.</td></tr>';
        totalFacturaElement.textContent = 'Total a Pagar: $0,00';
    }

    document.querySelector('.efectivo').addEventListener('click', () => {
        alert('Has seleccionado pagar con Efectivo. ¡Gracias por tu compra!');
        window.location.href = 'index.html';
    });

    document.querySelector('.transferencia').addEventListener('click', () => {
        alert('Has seleccionado pagar con Transferencia. Se te proporcionarán los datos de la cuenta.');
        window.location.href = 'index.html';
    });
});