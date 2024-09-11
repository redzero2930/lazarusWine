document.addEventListener('DOMContentLoaded', function () {
    const passwordField = document.getElementById('password');
    const toggleButton = document.getElementById('toggle-password');
    const eyeOpenedIcon = "../images/eye-opened.png"; 
    const eyeClosedIcon = "../images/eye-closed.png"; 
    const toggleIcon = toggleButton.querySelector('img'); 

    toggleButton.addEventListener('click', function () {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleIcon.src = eyeOpenedIcon; 
        } else {
            passwordField.type = 'password';
            toggleIcon.src = eyeClosedIcon; 
        }
    });
});