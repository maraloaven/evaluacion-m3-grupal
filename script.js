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
            this.nombre             = nombre;
            this.especialidad       = especialidad;
            this.experiencia        = experiencia;
            this._añosExperiencia   = experiencia; 
            this.pacientesAtendidos = 0;
            this.costoPorConsulta   = 7800; // Costo base por consulta
            this.horasDisponibles   = []; // Array para almacenar horas disponibles
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
         // Método para calcular total de pacientes atendidos
        calcularTotalPacientes() {
            return this.pacientesAtendidos;
        }
        // Método para atender a un paciente
        atenderPaciente() {
            this.pacientesAtendidos++;
        }
        // Método para calcular costo de consulta
        calcularCostoConsulta() {
            return this.costoPorConsulta + (this._añosExperiencia * 5); // Aumenta 5 por cada año de experiencia
        }
        // Método para agregar horas disponibles
        agregarHoraDisponible(hora) {
            this.horasDisponibles.push(hora);
        }
        // Método para reservar una hora
        reservarHora(hora) {
            const index = this.horasDisponibles.indexOf(hora);
            if (index !== -1) {
            this.horasDisponibles.splice(index, 1);
            return true;
            }
            return false;
        }
        // Método para mostrar horas disponibles
        mostrarHorasDisponibles() {
            return this.horasDisponibles.length > 0 ? this.horasDisponibles : "No hay horas disponibles";
        }
    }

    class Cirujano extends Doctor {
        constructor(nombre, experiencia, operaciones) {
            super(nombre, "Cirugía", experiencia);
            this.operaciones = operaciones;
            this.costoPorOperacion = 580780; 
        }
        calcularOperaciones() {
            return this.operaciones;
        }
        // Nuevo método específico para Cirujano
        realizarOperacion() {
            this.operaciones++;
            this.atenderPaciente(); // También incrementa pacientesAtendidos
        }
        // Sobrescritura del método calcularCostoConsulta (polimorfismo)
        calcularCostoConsulta() {
            return super.calcularCostoConsulta() * 1.5; // 50% más caro que un doctor regular
        }
        // Nuevo método para calcular costo de operación
        calcularCostoOperacion() {
            return this.costoPorOperacion + (this.operaciones * 10); // Aumenta 10 por cada operación realizada
        }
    }

/*     const drMario = new Doctor("Dr. Mario", "Medicina Interna", 10);
    console.log(drMario.mostrarInfo());

    const drAna = new Cirujano("Dra. Ana Polo", 6, 200);
    console.log(drAna.calcularOperaciones()); */


    const drMario = new Doctor("Dr. Mario", "Medicina Interna", 10);
    drMario.agregarHoraDisponible("09:00 AM");
    drMario.agregarHoraDisponible("10:30 AM");
    drMario.agregarHoraDisponible("12:00 PM");
    drMario.atenderPaciente();
    drMario.atenderPaciente();
    console.log(drMario.mostrarInfo());
    console.log(`Horas disponibles del Dr. ${drMario.nombre}:${drMario.mostrarHorasDisponibles()}`);
    const hora_reservada = "10:30 AM";
    if (drMario.reservarHora(hora_reservada)) {
      console.log(`Hora reservada: ${hora_reservada}`);
    } else {
      console.log("No se pudo reservar la hora");
    }
    console.log(`Horas disponibles actualizadas: ${drMario.mostrarHorasDisponibles()}`);
    console.log("Pacientes atendidos:", drMario.calcularTotalPacientes());
    console.log("Valor total de consultas realizadas (pacientes atendidos)", (drMario.calcularCostoConsulta()*drMario.calcularTotalPacientes()));
    
    
    const drAna = new Cirujano("Dra. Ana Polo", 6, 7);
    drAna.agregarHoraDisponible("14:00 PM");
    drAna.agregarHoraDisponible("16:00 PM");
    console.log(`Horas disponibles de  ${drAna.nombre}: ${drAna.mostrarHorasDisponibles()}`);
    console.log(`Costo de consulta con cirujano: $${drAna.calcularCostoConsulta()}`);
    drAna.realizarOperacion();
    drAna.realizarOperacion();
    console.log(drAna.mostrarInfo());
    console.log(`Operaciones realizadas: ${drAna.operaciones}`);
    console.log(`Valor total de las operaciones realizadas: $${(drAna.calcularCostoOperacion()*drAna.operaciones)}`);


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

    if (window.location.pathname.includes("index.html")) {
        fetch("./servicios.json")
            .then((response) => response.json())
            .then((servicios) => {
                const container = document.querySelector(".container.py-2");
                const section = document.createElement("section");
                section.className = "mt-4";
    
                const titulo = document.createElement("h2");
                titulo.textContent = "Nuestros Servicios Médicos";
                titulo.className = "text-center mt-4 mb-3";
                section.appendChild(titulo);
    
                const row = document.createElement("div");
                row.className = "row g-4";
    
                servicios.forEach((servicio) => {
                    const { id, nombre, descripcion, precio } = servicio;
    
                    const div = document.createElement("div");
                    div.className = "col-12 col-md-6 col-lg-4";
                    div.innerHTML = `
                        <div class="card h-100 text-center">
                            <h3>${nombre}</h3>
                            <p><i>${descripcion}</i></p>
                            <p>Precio: $${precio}</p>
                            <img src="./images/ser${id}.jpg" alt="${nombre}">
                        </div>
                    `;
                    row.appendChild(div);
                });
    
                section.appendChild(row);
                container.appendChild(section);
            })
            .catch((error) => console.error("Error al procesar los datos JSON:", error.message));
    }

    if (window.location.pathname.includes("contacto.html")) {
        fetch("./citas.json")
        .then((response) => response.json())
        .then((citas) => {
            const container = document.querySelector(".container.py-2");
            const section = document.createElement("section");
            section.className = "mt-4";
            const titulo = document.createElement("h2");
            titulo.textContent = "Citas Agendadas";
            titulo.className = "text-center mt-4 mb-3";
            section.appendChild(titulo);
    
            const row = document.createElement("div");
            row.className = "row g-4";
    
            citas.forEach((cita) => {
                const { id, fecha, hora, doctor, servicio } = cita;
    
                const div = document.createElement("div");
                div.className = "col-12 col-md-6 col-lg-4";
                div.innerHTML = `
                    <div class="card h-100 text-center">
                        <h3>${fecha}</h3>
                        <p><i>${hora}</i></p>
                        <p>Doctor: ${doctor}</p>
                        <p>Servicio: ${servicio}</p>
                    </div>
                `;
                row.appendChild(div);
            });
    
            section.appendChild(row);
            container.appendChild(section);
        })
        .catch((error) => console.error("Error al procesar los datos JSON:", error.message));
    
    }
    
    const reservarBtn = document.querySelector(".navbar__link--special");
    reservarBtn.addEventListener("click", () => {
        const nombre = prompt("¿Cuál es tu nombre?");
        if (nombre) {
            alert(`Gracias por reservar con nosotros, ${nombre}.`);
            console.log(`Reserva realizada por: ${nombre}`);
        } else {
            alert("La reserva fue cancelada.");
        }
    });
    
});