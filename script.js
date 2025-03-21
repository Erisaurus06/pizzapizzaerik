  
  
let totalGlobal = 0;
let nombreGlobal = "";
let fechaGlobal = "";
let complementosDetalleGlobal = [];
let pizza1Global = 0;
let pizza2Global = 0;
let pizza3Global = 0;

document.getElementById("comenzar").addEventListener("click", function () {
    document.getElementById("bienvenida").classList.remove("activa");
    document.getElementById("formulario-seccion").classList.add("activa");
});

// Calcular pedido
document.getElementById("calcular").addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value;
    const Fecha = document.getElementById("Fecha").value;
    const pizza1 = parseFloat(document.getElementById("Pizza1").value);
    const pizza2 = parseFloat(document.getElementById("Pizza2").value);
    const pizza3 = parseFloat(document.getElementById("Pizza3").value);

    const complementos = document.querySelectorAll('.checkbox-container input[type="checkbox"]:checked');
    let complementosTotal = 0;
    let complementosDetalle = [];

    complementos.forEach((complemento) => {
        complementosTotal += parseFloat(complemento.value);
        complementosDetalle.push(complemento.nextElementSibling.textContent);
    });

    const total = pizza1 + pizza2 + pizza3 + complementosTotal;

    // Guardamos globalmente
    totalGlobal = total;
    nombreGlobal = nombre;
    fechaGlobal = Fecha;
    complementosDetalleGlobal = complementosDetalle;
    pizza1Global = pizza1;
    pizza2Global = pizza2;
    pizza3Global = pizza3;

    document.getElementById("detalle-seccion").classList.add("activa");
    document.getElementById("formulario-seccion").classList.remove("activa");

    document.getElementById("detallePedido").innerHTML = `
        <strong>Nombre:</strong> ${nombre}<br>
        <strong>Fecha:</strong> ${Fecha}<br>
        <strong>Productos:</strong> 
        <ul>
            <li>Pizza Mexicana ($${pizza1.toFixed(2)})</li>
            <li>Pizza Pepperoni ($${pizza2.toFixed(2)})</li>
            <li>Pizza Hawaiana ($${pizza3.toFixed(2)})</li>
        </ul>
        <strong>Complementos:</strong> ${complementosDetalle.join(", ")}<br>
        <strong>Total:</strong> $${total.toFixed(2)}
    `;
});

// Continuar pago
document.getElementById("continuarPago").addEventListener("click", function () {
    const metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
    const tipoServicio = document.querySelector('input[name="tipoServicio"]:checked').value;

    if (tipoServicio === "Entrega a domicilio") {
        document.getElementById("detalle-seccion").classList.remove("activa");
        document.getElementById("domicilio-seccion").classList.add("activa");
    } else {
        document.getElementById("detalle-seccion").classList.remove("activa");
        if (metodoPago === "Efectivo") {
            document.getElementById("efectivo-seccion").classList.add("activa");
        } else if (metodoPago === "Tarjeta") {
            document.getElementById("tarjeta-seccion").classList.add("activa");
        }
    }
});

// Continuar domicilio
document.getElementById("continuarDomicilio").addEventListener("click", function(){
    document.getElementById("domicilio-seccion").classList.remove("activa");
    const metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;

    if(metodoPago === "Efectivo"){
        document.getElementById("efectivo-seccion").classList.add("activa");
    } else if(metodoPago === "Tarjeta"){
        document.getElementById("tarjeta-seccion").classList.add("activa");
    }
});

// Finalizar efectivo
document.getElementById("finalizarEfectivo").addEventListener("click", function () {
    const montoPago = parseFloat(document.getElementById("montoPago").value);
    if (isNaN(montoPago) || montoPago < totalGlobal) {
        document.getElementById("mensajeCambio").innerText = "El monto ingresado es insuficiente.";
        return;
    }
    const cambio = montoPago - totalGlobal;
    document.getElementById("mensajeCambio").innerHTML = `Cambio: <strong>$${cambio.toFixed(2)}</strong>`;

    document.getElementById("efectivo-seccion").classList.remove("activa");
    document.getElementById("ticket-seccion").classList.add("activa");

    mostrarTicket("Efectivo", montoPago, cambio);
});

// Finalizar tarjeta
document.getElementById("finalizarTarjeta").addEventListener("click", function () {
    document.getElementById("tarjeta-seccion").classList.remove("activa");
    document.getElementById("ticket-seccion").classList.add("activa");

    mostrarTicket("Tarjeta", totalGlobal, 0); // No hay cambio en tarjeta
});

// Función para mostrar ticket (evitamos duplicar código)
function mostrarTicket(metodoPago, montoPagado, cambio) {
    document.getElementById("ticketResumen").innerHTML = `
        <strong>Nombre:</strong> ${nombreGlobal}<br>
        <strong>Fecha:</strong> ${fechaGlobal}<br>
        <strong>Productos:</strong>
        <ul>
            <li>Pizza Mexicana ($${pizza1Global.toFixed(2)})</li>
            <li>Pizza Pepperoni ($${pizza2Global.toFixed(2)})</li>
            <li>Pizza Hawaiana ($${pizza3Global.toFixed(2)})</li>
        </ul>
        <strong>Complementos:</strong> ${complementosDetalleGlobal.join(", ")}<br>
        <strong>Total:</strong> $${totalGlobal.toFixed(2)}<br>
        <strong>Método de Pago:</strong> ${metodoPago}<br>
        ${metodoPago === "Efectivo" ? `<strong>Total pagado:</strong> $${montoPagado.toFixed(2)}<br>
        <strong>Cambio:</strong> $${cambio.toFixed(2)}<br>` : ""}
    `;
}

// Botón para volver al inicio
document.getElementById("volver-inicio").addEventListener("click", function () {
    location.reload();
});
