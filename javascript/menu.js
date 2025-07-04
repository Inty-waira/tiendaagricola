// JavaScript para el toggle del menú
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    // Seleccionamos directamente el elemento nav con el ID 'main-nav'
    const mainNav = document.getElementById('main-nav'); 

    menuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('active'); // Agrega o quita la clase 'active'

    });
});