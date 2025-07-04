const form = document.getElementById("formulario");
const respuesta = document.getElementById("contenedor");
respuesta.innerHTML = "";
const stand = {
    touchdown: { dosis: 2500, presentacion: "liquido" },
    troton: { dosis: 350, presentacion: "liquido" },
    select: { dosis: 500, presentacion: "liquido" },
    basagran: { dosis: 1500, presentacion: "liquido" },
    polythion: { dosis: 1000, presentacion: "liquido" },
    oxicloruro: { dosis: 1500, presentacion: "solido" },
    authority: { dosis: 600, presentacion: "liquido" },
};
function calcularDosis(event) {
event.preventDefault();
    const producto = document.getElementById("producto").value;
    const area = parseFloat(document.getElementById("area").value)
    const tipoArea = document.getElementById("tipoArea").value;

    if (isNaN(area) || area <= 0 || producto === "" || tipoArea === "") {
        respuesta.textContent = "Por favor, ingresa un formato válido y positivo.";
        return;
    }
    for (const nombreProducto in stand) {
        const detalles = stand[nombreProducto];
        let dosis = detalles.dosis;
        let dosisAplicar = dosis * area
        let unidadMedida;
        if (producto === nombreProducto) {
            if (detalles.presentacion === "liquido") {
                unidadMedida = 'cm³';
            } else if (detalles.presentacion === "solido") {
                unidadMedida = 'gr';
            }
            if (tipoArea === "metros") {
                dosisAplicar /= 10000
            }
                    respuesta.innerHTML += `<p> La cantidad de ${nombreProducto} es de : ${dosisAplicar} ${unidadMedida} </p>`;
            return;
        }
    }
}


form.addEventListener('submit', calcularDosis);
