document.addEventListener("DOMContentLoaded", () => {
    const costoTotal = (precio) => (consultas) => precio * consultas;
    const costoConsulta = costoTotal(10000);
    const costoResultado = costoConsulta(3);

    const tiempoPromedioEspera = (tiempos) => tiempos.reduce((acumulado, tiempo) => acumulado + tiempo, 0) / tiempos.length;
    const tiempoEsperaResultado = tiempoPromedioEspera([10, 20, 30]);

    const horasConsultaTotal = (dias, horasPorDia) => {
        if (dias === 0) return 0;
        return horasPorDia + horasConsultaTotal(dias - 1, horasPorDia);
    };
    const horasConsultaResultado = horasConsultaTotal(5, 6);

    const aplicarDescuento = (descuento) => (precio) => precio * (1 - descuento);
    const aplicarDescuentoPorVolumen = (precio) => aplicarDescuento(0.10)(precio); 
    const descuentoResultado = aplicarDescuentoPorVolumen(100);

    const resultadosDiv = document.querySelector("#resultados");
    resultadosDiv.innerHTML = `
        <h3>Resultados de Programación Funcional:</h3>
        <p><strong>Costo Total por 3 Consultas:</strong> $${costoResultado}</p>
        <p><strong>Tiempo Promedio de Espera:</strong> ${tiempoEsperaResultado} minutos</p>
        <p><strong>Horas Totales de Consulta en una Semana:</strong> ${horasConsultaResultado} horas</p>
        <p><strong>Precio después de Descuento del 10%:</strong> $${descuentoResultado}</p>
    `;

    if (window.location.pathname.includes("contacto.html")) {
        document.querySelector(".contact__button").addEventListener("click", (e) => {
            e.preventDefault();
            alert("Formulario enviado con éxito.");
            
            const nombrePaciente = document.querySelector("input[placeholder='Nombre']").value;
            const emailPaciente = document.querySelector("input[placeholder='Dirección de su E-Mail']").value;
            const asuntoMensaje = document.querySelector("input[placeholder='Asunto del Mensaje']").value;
            const mensajePaciente = document.querySelector("textarea[placeholder='Mensaje']").value;

            const eventoPaciente = new CustomEvent("nuevoPaciente", {
                detail: { nombrePaciente, emailPaciente, asuntoMensaje, mensajePaciente }
            });

            document.dispatchEvent(eventoPaciente);
        });

        document.addEventListener("nuevoPaciente", (e) => {
            alert(`Nuevo paciente: ${e.detail.nombrePaciente}\nEmail: ${e.detail.emailPaciente}\nAsunto: ${e.detail.asuntoMensaje}\nMensaje: ${e.detail.mensajePaciente}`);
        });
    }
    

    document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".contact").addEventListener("submit", (e) => {
        e.preventDefault();

        const nombrePaciente = document.querySelector("input[placeholder='Nombre']").value;
        const emailPaciente = document.querySelector("input[placeholder='Dirección de su E-Mail']").value;
        const asuntoMensaje = document.querySelector("input[placeholder='Asunto del Mensaje']").value;
        const mensajePaciente = document.querySelector("textarea[placeholder='Mensaje']").value;

        const eventoPaciente = new CustomEvent("nuevoPaciente", {
            detail: { nombrePaciente, emailPaciente, asuntoMensaje, mensajePaciente }
        });

        document.dispatchEvent(eventoPaciente);
    });

    document.addEventListener("nuevoPaciente", (e) => {
        alert(`Nuevo paciente: ${e.detail.nombrePaciente}\nEmail: ${e.detail.emailPaciente}\nAsunto: ${e.detail.asuntoMensaje}\nMensaje: ${e.detail.mensajePaciente}`);
    });
});


    async function obtenerDoctores() {
        try {
            const respuesta = await fetch("./doctores.json");
            if (!respuesta.ok) {
                throw new Error("Error al obtener los datos de los doctores.");
            }
            const datos = await respuesta.json();
            console.log(datos);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    }

    obtenerDoctores();

    class Doctor {
        constructor(nombre, especialidad, experiencia) {
            this.nombre = nombre;
            this.especialidad = especialidad;
            this.experiencia = experiencia;
            this._añosExperiencia = experiencia; 
        }

        get añosExperiencia() {
            return this._añosExperiencia;
        }

        set añosExperiencia(valor) {
            if (valor >= 0) this._añosExperiencia = valor;
            else console.error("Valor inválido para años de experiencia.");
        }

        mostrarInfo() {
            return `${this.nombre}, ${this.especialidad} con ${this.experiencia} años de experiencia.`;
        }
    }

    class Cirujano extends Doctor {
        constructor(nombre, experiencia, operaciones) {
            super(nombre, "Cirugía", experiencia);
            this.operaciones = operaciones;
        }

        calcularOperaciones() {
            return this.operaciones;
        }
    }

    const drMario = new Doctor("Dr. Mario", "Medicina Interna", 10);
    console.log(drMario.mostrarInfo());

    const drAna = new Cirujano("Dra. Ana Polo", 6, 200);
    console.log(drAna.calcularOperaciones());

    if (window.location.pathname.includes("equipo-medico.html")) {
        fetch("./doctores.json")
            .then((response) => response.json())
            .then((doctores) => {
                const container = document.querySelector(".container.py-2");
                const section = document.createElement("section");
                section.className = "mt-4";

                const titulo = document.createElement("h2");
                titulo.textContent = "Conoce a Nuestros Doctores";
                titulo.className = "text-center mt-4 mb-3";
                section.appendChild(titulo);

                const row = document.createElement("div");
                row.className = "row g-4";

                doctores.forEach((doctor) => {
                    const { nombre, especialidad, experiencia, disponibilidad, contacto } = doctor;

                    const div = document.createElement("div");
                    div.className = "col-12 col-md-6 col-lg-4";
                    div.innerHTML = `
                        <div class="card h-100 text-center">
                            <h3>${nombre}</h3>
                            <p><i>${especialidad}</i></p>
                            <p>Experiencia: ${experiencia} años</p>
                            <p>Disponibilidad: ${disponibilidad}</p>
                            <p>Email: ${contacto.email}</p>
                            <p>Teléfono: ${contacto.telefono}</p>
                        </div>
                    `;
                    row.appendChild(div);
                });

                section.appendChild(row);
                container.appendChild(section);
            })
            .catch((error) => console.error("Error al procesar los datos JSON:", error.message));
    }
});