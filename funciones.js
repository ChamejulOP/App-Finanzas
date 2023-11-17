function navegarRegistro() {
    window.location.href = "registro.html";
}

function navegarLogin() {
    window.location.href = "login.html";
}

document.getElementById("registro-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = {
        DNI: document.getElementById("DNI").value,
        Nombre: document.getElementById("Nombre").value,
        FechaDeNacimiento: document.getElementById("FechaDeNacimiento").value,
        Correo: document.getElementById("Correo").value,
        Contraseña: document.getElementById("Contraseña").value
    };

    // Envía los datos al servidor
    fetch('/registrar-usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuario registrado con éxito');
            // Realiza acciones adicionales, como redireccionar a otra página
        } else {
            alert('Error al registrar el usuario: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
