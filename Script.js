
        document.getElementById("comenzar").addEventListener("click", function () {
            document.getElementById("bienvenida").classList.remove("activa");
            document.getElementById("formulario-seccion").classList.add("activa");
        });

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

        document.getElementById("continuarDomicilio").addEventListener("click", function(){
            document.getElementById("domicilio-seccion").classList.remove("activa");
            const metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
            if(metodoPago === "Efectivo"){
                document.getElementById("efectivo-seccion").classList.add("activa");
            } else if(metodoPago === "Tarjeta"){
                document.getElementById("tarjeta-seccion").classList.add("activa");
            }
        });

        document.getElementById("finalizarTarjeta").addEventListener("click", function () {
            alert("Pago con tarjeta realizado con éxito. ¡Gracias por tu pedido!");
        });
        document.getElementById("finalizarEfectivo").addEventListener("click", function () {
            alert("Gracias por tu pedido. El pago se realizará al momento de la entrega o consumo.");
        });
    