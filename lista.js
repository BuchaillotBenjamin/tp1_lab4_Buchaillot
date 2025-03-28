async function cargarUsuarios(filtro = "") {

    let usuarios;

    const respuesta = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BUSCAR`, {
        method: 'GET'
    });

    const resultado = await respuesta.json();
    usuarios = Object.values(resultado);

    const tablaBody = document.getElementById("tablaUsuarios");
    tablaBody.innerHTML = "";

    usuarios
        .filter(user => user.usuario.includes(filtro.toLowerCase()))
        .forEach(user => {
            let row = document.createElement("tr");
            row.className = user.bloqueado === "Y" ? "bloqueado" : "desbloqueado";
            row.dataset.id = user.id;

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.usuario}</td>
                <td>${user.bloqueado}</td>
                <td>${user.apellido}</td>
                <td>${user.nombre}</td>
                <td class='bloquear'><img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" class="icon"></td>
                <td class='desbloquear'><img src="https://cdn-icons-png.flaticon.com/512/5219/5219070.png" class="icon"></td>
            `;
            tablaBody.appendChild(row);
        });
}

function filtrarUsuarios() {
    let filtro = document.getElementById("buscar").value;
    cargarUsuarios(filtro);
}

cargarUsuarios();

const tablaBody = document.getElementById('tablaUsuarios'); 

tablaBody.addEventListener('click', async (event) => {
    const target = event.target;

    if (target.closest('.bloquear')) {
        const tr = target.closest('tr');
        const userId = tr.dataset.id;

        const respuesta = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&idUser=${userId}&estado=Y`, {
            method: 'GET'
        });

        const resultado = await respuesta.json();
        cargarUsuarios();

    }

    if (target.closest('.desbloquear')) {
        const tr = target.closest('tr');
        const userId = tr.dataset.id;

        const respuesta = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&idUser=${userId}&estado=N`, {
            method: 'GET'
        });

        const resultado = await respuesta.json();
        console.log('Usuario desbloqueado:', resultado);
        cargarUsuarios();

    }
});
