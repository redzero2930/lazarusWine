document.addEventListener('DOMContentLoaded', function () {
    const passwordField = document.getElementById('password');
    const toggleButton = document.getElementById('toggle-password');
    const eyeOpenedIcon = "../images/eye-opened.png"; // Ruta de la imagen de ojo abierto
    const eyeClosedIcon = "../images/eye-closed.png"; // Ruta de la imagen de ojo cerrado
    const toggleIcon = toggleButton.querySelector('img'); // Selecciona la imagen dentro del botón

    toggleButton.addEventListener('click', function () {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleIcon.src = eyeOpenedIcon; // Cambia a la imagen de ojo abierto
        } else {
            passwordField.type = 'password';
            toggleIcon.src = eyeClosedIcon; // Cambia a la imagen de ojo cerrado
        }
    });
});