var datos = [];
var myChartBarras = null; 
var myChartCircular = null; 

function cargarDatos() {
    fetch('Fútbol (respuestas).json') 
        .then(response => response.json())
        .then(json => {
            datos = json;
            mostrarPreguntas();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

function mostrarPreguntas() {
    var preguntasDropdown = document.getElementById("preguntasDropdown");
    var preguntas = Object.keys(datos[0]); 
    preguntas.forEach(pregunta => {
        if (pregunta !== 'Nombre y apellidos') {
            var opcion = document.createElement("option");
            opcion.value = pregunta;
            opcion.textContent = pregunta;
            preguntasDropdown.appendChild(opcion);
        }
    });
}

function mostrarRespuestas() {
    var preguntaSeleccionada = document.getElementById("preguntasDropdown").value;
    var tablaRespuestasBody = document.getElementById("tablaRespuestasBody");
    tablaRespuestasBody.innerHTML = "";

    if (preguntaSeleccionada) {
        datos.forEach(encuesta => {
            var fila = document.createElement("tr");
            var pregunta = document.createElement("td");
            var participante = document.createElement("td");
            var respuesta = document.createElement("td");
            pregunta.textContent = preguntaSeleccionada;
            participante.textContent = encuesta['Nombre y apellidos'];
            respuesta.textContent = encuesta[preguntaSeleccionada];
            fila.appendChild(pregunta);
            fila.appendChild(participante);
            fila.appendChild(respuesta);
            tablaRespuestasBody.appendChild(fila);
        });

                var respuestasFrecuencia = {};
        datos.forEach(encuesta => {
            var respuesta = encuesta[preguntaSeleccionada];
            respuestasFrecuencia[respuesta] = (respuestasFrecuencia[respuesta] || 0) + 1;
        });

                var labels = Object.keys(respuestasFrecuencia);
        var data = Object.values(respuestasFrecuencia);

              if (myChartBarras) {
            myChartBarras.destroy();
        }
        if (myChartCircular) {
            myChartCircular.destroy();
        }

                var ctxBarras = document.getElementById('graficoBarras').getContext('2d');
        myChartBarras = new Chart(ctxBarras, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Frecuencia de respuestas',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

                var ctxCircular = document.getElementById('graficoCircular').getContext('2d');
        myChartCircular = new Chart(ctxCircular, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Frecuencia de respuestas',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

cargarDatos();

document.getElementById("preguntasDropdown").addEventListener("change", mostrarRespuestas);