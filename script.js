"use strict";

// // REQUISITOS
// ● El juego debe mostrar diversos botones asociados visualmente a
// una batería / drum pad.
// ● Pulsando cada uno de los botones se reproducirá un sonido
// asociado al mismo de los ficheros de sonido proporcionados.
// ● Cada botón también debe tener una tecla del teclado asociada que
// haría el mismo efecto que pulsarlo.
// //

//Esta función indicara que tecla ha sido pulsada y enviará las llamadas correspondientes para reproducir el audio.
function handleKeyPress(key) {
  let teclaPulsada = key.key;

  // console.log("La tecla", teclaPulsada, "ha sido pulsada");

  let instrumento = soundSelect(teclaPulsada);
  reproducir(instrumento);
}

let hihatOpen = false;

//Esta función nos permite seleccionar el audio en función de la tecla pulsada.
function soundSelect(tecla) {
  let sonido;

  if (tecla === "a") {
    sonido = new Audio("./assets/sounds/crash.wav");
  }
  if (tecla === "s") {
    if (!hihatOpen) {
      sonido = new Audio("./assets/sounds/hihat-close.wav");
    }
    if (hihatOpen) {
      sonido = new Audio("./assets/sounds/hihat-open.wav");
    }
  }
  if (tecla === "d") {
    sonido = new Audio("./assets/sounds/kick.wav");
  }
  if (tecla === "f") {
    sonido = new Audio("./assets/sounds/ride.wav");
  }
  if (tecla === "h") {
    sonido = new Audio("./assets/sounds/snare.wav");
  }
  if (tecla === "j") {
    sonido = new Audio("./assets/sounds/tom-high.wav");
  }
  if (tecla === "k") {
    sonido = new Audio("./assets/sounds/tom-low.wav");
  }
  if (tecla === "l") {
    sonido = new Audio("./assets/sounds/tom-mid.wav");
  }
  return sonido;
}

//Esta función nos permite reproducir el audio indicado
function reproducir(audio) {
  audio.play();
}

//Este evento detecta cuando una tecla es pulsada dentro de la ventana
window.addEventListener("keypress", (event) => {
  handleKeyPress(event);
});

// Detección del checkbox

const checkbox = document.getElementById("myCheckbox");

checkbox.addEventListener("change", (event) => {
  if (event.target.checked) {
    hihatOpen = true;
  } else {
    hihatOpen = false;
  }
});

///////////////////////////
//AQUÍ COMIENZA EL AUDIO DEL GRABADOR Y REPRODUCTOR DE AUDIO

// Variables a usar:
//
let datosTeclas = [];
let ultimaPulsacion = null;
let reproducirTecla;
//Booleanos de grabación y reproducción
let grabar = false;
let reproduciendo = false;

// Función para alternar el valor del booleano "grabar"
function toggleGrabar() {
  grabar = !grabar; // Cambia el valor de true a false o viceversa

  //Si está grabando, el botón grabar cambiará su texto a detener y se deshabilita el botón reproducir
  if (grabar) {
    recordButton.textContent = "Detener";
    playButton.disabled = true;
  }
  //Si NO está grabando, el botón detener cambiará su texto a grabar y se habilita el botón reproducir
  if (!grabar) {
    recordButton.textContent = "Grabar";
    playButton.disabled = false;
  }
}

//Desactiva o activa los botonoes reproducir y grabar para evitar problemas
//Funciona igual que la función anterior, salvo que esta detiene ambos botones
function toggleReproduciendo() {
  reproduciendo = !reproduciendo;

  if (reproduciendo) {
    playButton.textContent = "Reproduciendo";
    playButton.disabled = true;
    recordButton.disabled = true;
  }
  if (!reproduciendo) {
    playButton.textContent = "Reproducir";
    playButton.disabled = false;
    recordButton.disabled = false;
  }
}

// Asociamos la función al evento de clic del botón grabar y reseteamos el array
document.getElementById("recordButton").addEventListener("click", () => {
  toggleGrabar();
  if (grabar) {
    datosTeclas = [];
  }
});

// Evento de teclado para capturar teclas y tiempos
document.addEventListener("keydown", (event) => {
  //Función que nos crea un array de objetos con los valores tecla y tiempo.
  if (grabar) {
    const tecla = event.key;
    const tiempoActual = new Date().getTime();

    // Si es la primera pulsación, no calculamos el tiempo transcurrido
    if (ultimaPulsacion !== null) {
      const tiempoTranscurrido = tiempoActual - ultimaPulsacion;
      datosTeclas.push({
        tecla: tecla,
        tiempo: tiempoTranscurrido,
      });
    } else {
      datosTeclas.push({
        tecla: tecla,
        tiempo: 0, // Primer tecla presionada
      });
    }

    // Actualizamos el tiempo de la última pulsación
    ultimaPulsacion = tiempoActual;
  }
});

// Evento del botón para guardar los datos
document.getElementById("playButton").addEventListener("click", () => {
  console.log("Datos guardados:", datosTeclas);

  toggleReproduciendo();
  // Reproducimos el audio pasandole dos parametros a las funciones, el primero será el valor "tecla" y el segundo será el array "tiempo" del objeto que corresponda
  if (reproduciendo) {
    reproducirGrabacion(datosTeclas);
  }
  const espera = datosTeclas.reduce(
    (acc, datosTeclas) => acc + datosTeclas.tiempo,
    0
  );
  setTimeout(() => toggleReproduciendo(), espera);
});

async function reproducirGrabacion(data) {
  for (let i = 0; i < data.length; i++) {
    let tempo = data[i].tiempo;
    const promesa = await new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve("hola");
      }, tempo);
    });

    reproducirTecla = data[i].tecla;

    let instrumento = soundSelect(reproducirTecla);
    reproducir(instrumento);
  }
}

//  Nota:
//  No he conseguido hacerlo funcionar con los botones, así que el grabador solo funciona con teclas.
