document.getElementById("calcularTotal").addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const pizza1 = parseFloat(document.getElementById("pizza1").value);
    const pizza2 = parseFloat(document.getElementById("pizza2").value);
    const pizza3 = parseFloat(document.getElementById("pizza3").value);
    const complementos = document.querySelectorAll("input[name='complemento']:checked");

    let total = 0;
    let detallePizzas = "";

    if (pizza1 > 0) {
        total += pizza1;
        detallePizzas += `<li>Pizza 1: $${pizza1.toFixed(2)}</li>`;
    }
    if (pizza2 > 0) {
        total += pizza2;
        detallePizzas += `<li>Pizza 2: $${pizza2.toFixed(2)}</li>`;
    }
    if (pizza3 > 0) {
        total += pizza3;
        detallePizzas += `<li>Pizza 3: $${pizza3.toFixed(2)}</li>`;
    }

    let complementosDetalle = [];
    complementos.forEach(comp => {
        total += parseFloat(comp.value);
        complementosDetalle.push(comp.nextElementSibling.innerText);
    });

    document.getElementById("total").innerText = `Total: $${total.toFixed(2)}`;

    document.getElementById("detallePedido").innerHTML = `
        <strong>Nombre:</strong> ${nombre}<br>
        <strong>Fecha:</strong> ${fecha}<br>
        <strong>Productos:</strong> 
        <ul>${detallePizzas || "<li>Ninguna pizza seleccionada</li>"}</ul>
        <strong>Complementos:</strong> ${complementosDetalle.join(", ") || "Ninguno"}<br>
        <strong>Total:</strong> $${total.toFixed(2)}
    `;
});

document.getElementById("pagarTarjeta").addEventListener("click", function () {
    document.getElementById("tarjetaForm").style.display = "block";
});

document.getElementById("pagarEfectivo").addEventListener("click", function () {
    alert("Pago en efectivo realizado. ¡Gracias por tu pedido!");
});

document.getElementById("finalizarTarjeta").addEventListener("click", function () {
    const numeroTarjeta = document.getElementById("numeroTarjeta").value;
    const fechaExp = document.getElementById("fechaExp").value;
    const cvv = document.getElementById("cvv").value;

    if (numeroTarjeta.length !== 16 || isNaN(numeroTarjeta)) {
        alert("Por favor, ingrese un número de tarjeta válido de 16 dígitos.");
        return;
    }
    if (!/^\d{2}\/\d{2}$/.test(fechaExp)) {
        alert("Por favor, ingrese una fecha de expiración en formato MM/AA.");
        return;
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
        alert("Por favor, ingrese un CVV válido de 3 dígitos.");
        return;
    }

    alert("Pago con tarjeta realizado con éxito. ¡Gracias por tu pedido!");
});
