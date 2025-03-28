
document.getElementById('formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;



    const respuesta = await fetch(`http://181.111.166.250:8081/tp/login.php?user=${usuario}&pass=${clave}`, {
        method: 'GET'
    });

    const resultado = await respuesta.json();

    if (resultado.respuesta != 'OK')
        document.getElementById('resultado').textContent = JSON.stringify(resultado.mje, null, 2);
    else {
        window.location.href = 'lista.html';
    }

});