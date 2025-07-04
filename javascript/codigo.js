const contenedor = document.querySelector(".contenedor");
const carrito = {};
const productosInventario = {};
const carritoTotalDiv = document.createElement('div');
carritoTotalDiv.id = 'total-carrito';
carritoTotalDiv.textContent = 'Total Carrito: $0,00';
contenedor.insertAdjacentElement('afterend', carritoTotalDiv);

function agregarProductoAInventario(descripcion, precioUnitario, costoUnitario, cantidad, imgPath, codigo) {
    const claveProducto = `producto-${codigo}`;
    productosInventario[claveProducto] = {
        descripcion: descripcion,
        precioUnitario: precioUnitario,
        costoUnitario: costoUnitario,
        cantidad: cantidad,
        imagen: imgPath,
        codigo: codigo,
    };
}

function crearProductoHTML(productoData) {
    let div = document.createElement("DIV");
    div.classList.add(`producto-${productoData.codigo}`);

    let imgHTML = `<img class='imagenImg' src='${productoData.imagen}' alt='${productoData.descripcion}'>`;
    let nombreHTML = `<h2>${productoData.descripcion}</h2>`;
    let presentacionHTML = `<h3 id="stock-${productoData.codigo}">Stock: ${productoData.cantidad} unidades</h3>`;
    let cantidadInputHTML = `
        <label for="cantidad-${productoData.codigo}">Cantidad a comprar:</label>
        <input type="number" id="cantidad-${productoData.codigo}" name="cantidad" value="0" min="0" max="${productoData.cantidad}" class="input-cantidad">
    `;
    let precioHTML = `<p>Precio Unitario: <b>$${productoData.precioUnitario.toLocaleString('es-CO')}</b></p>`;
    let botonAgregar = `<button class="btn-agregar" data-codigo="${productoData.codigo}">Agregar al Carrito</button>`;
    
    div.innerHTML = imgHTML + nombreHTML + presentacionHTML + cantidadInputHTML + precioHTML + botonAgregar;
    contenedor.appendChild(div);
    return div;
}

function agregarAlCarrito(codigoProducto, cantidad) {
    const claveProducto = `producto-${codigoProducto}`;
    const productoEnInventario = productosInventario[claveProducto];

    cantidad = parseInt(cantidad);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert(`No se agregó ${productoEnInventario.descripcion}: La cantidad debe ser un número positivo.`);
        return;
    }

    if (carrito[claveProducto]){
        const canActualCarrito = carrito[claveProducto].cantidad;
        const nuevoTotalCantidad = canActualCarrito + cantidad;

        if (nuevoTotalCantidad > productoEnInventario.cantidad) {
            alert(`No puedes agregar esa cantidad. Ya tienes ${canActualCarrito} en el carrito y solo quedan ${productoEnInventario.cantidad - canActualCarrito} en stock.`);
            return;
        }
    }

    if (carrito[claveProducto]){
        carrito[claveProducto].cantidad += cantidad;
    } else {
        carrito[claveProducto] = {
            descripcion: productoEnInventario.descripcion,
            precioUnitario: productoEnInventario.precioUnitario,
            cantidad: cantidad
        };
    }
    actualizarVistaCarrito();
}

function calcularTotalCarrito() {
    let totalCarrito = 0;
    for (const clave in carrito) {
        const item = carrito[clave];
        totalCarrito += item.precioUnitario * item.cantidad;
    }
    return totalCarrito;
}

function actualizarVistaCarrito() {
    const totalElement = document.getElementById('total-carrito');
    if (totalElement) {
        totalElement.textContent = `Total Carrito: $${calcularTotalCarrito().toLocaleString('es-CO')}`;
    }

    for (const clave in productosInventario) {
        const productoData = productosInventario[clave];
        const stockElement = document.getElementById(`stock-${productoData.codigo}`);
        if (stockElement) {
            const cantidadEnCarrito = carrito[`producto-${productoData.codigo}`] ? carrito[`producto-${productoData.codigo}`].cantidad : 0;
            const stockRemanente = productoData.cantidad - cantidadEnCarrito;
            stockElement.textContent = `Stock: ${stockRemanente} unidades`;
        }
    }
}
