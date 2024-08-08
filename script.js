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
    sonido = new Audio("/assets/sounds/crash.wav");
  }
  if (tecla === "s") {
    if (!hihatOpen) {
      sonido = new Audio("/assets/sounds/hihat-close.wav");
    }
    if (hihatOpen) {
      sonido = new Audio("/assets/sounds/hihat-open.wav");
    }
  }
  if (tecla === "d") {
    sonido = new Audio("/assets/sounds/kick.wav");
  }
  if (tecla === "f") {
    sonido = new Audio("/assets/sounds/ride.wav");
  }
  if (tecla === "h") {
    sonido = new Audio("/assets/sounds/snare.wav");
  }
  if (tecla === "j") {
    sonido = new Audio("/assets/sounds/tom-high.wav");
  }
  if (tecla === "k") {
    sonido = new Audio("/assets/sounds/tom-low.wav");
  }
  if (tecla === "l") {
    sonido = new Audio("/assets/sounds/tom-mid.wav");
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

// function alternarHiHat() {
//   if ((hihatOpen = true && tecla === " ")) {
//     hihatOpen = false;
//   }
//   if ((hihatOpen = false && tecla === " ")) {
//     hihatOpen = true;
//   }
//   console.log(hihatOpen);
//   return hihatOpen;
// }

//Lo comentado abajo es un intento fallido de detectar el boton pulsado, en su lugar he añadido en el html eventos de onclick en cada boton que llaman a las funciones dandoles un parametro distinto a cada uno.

// //Intento de detectar la pulsación de un boton
// const nombreBoton = document.getElementById("test");
// const btn = document.querySelector("button");

// btn.addEventListener("click", (event) => {
//   console.log("Botón pulsado");
//   //////////
//   // Presuntamente una vez que el consolelog funcione adecuadamente, al quitar el comentario debería sonar un sonido.
//   //   reproducir(soundSelect("a"));
// });
