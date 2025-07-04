const form = document.getElementById("registroForm");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const areaTexto = document.getElementById("textArea");

const errornombre = document.getElementById("errorNombre");
const erroremail = document.getElementById("errorEmail");
const errorTextArea = document.getElementById("errorTextArea"); 
// Funcion anonima
const validarNombre = function() {
    if (nombre.value.trim() === '') {
        errornombre.textContent = `El nombre es obligatorio`;
    } else {
        errornombre.textContent = '';
    }
};
// funcion declarativa
function validarEmail() {
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email.value)) {
        erroremail.textContent = 'Ingrese un correo electronico valido';
    } else {
        erroremail.textContent = '';
    }
}
// funcion fecha
const validarTextArea = () => {
    if (areaTexto.value.length < 12) {
        errorTextArea.textContent = `El mensaje debe tener mínimo 12 caracteres`;
    } else {
        errorTextArea.textContent = '';
    }
};

nombre.addEventListener('input', validarNombre);
email.addEventListener('input', validarEmail);
areaTexto.addEventListener('input', validarTextArea);

form.addEventListener('submit', function(event) {
    validarNombre();
    validarEmail();
    validarTextArea();

    if (errornombre.textContent || erroremail.textContent || errorTextArea.textContent) {
        event.preventDefault();
        alert('Por favor, corrige los errores en el formulario antes de enviar.'); 
        return;
    }else alert('Mensaje enviado correctamente')
});