let mediaRecorder;
let audioChunks = [];

const recordButton = document.getElementById("recordButton");
const playButton = document.getElementById("playButton");

recordButton.addEventListener("click", async () => {
  // Si el botón de grabar se encuentra grabando, al pulsar se detendrá la grabación y se habilitará el botón de reproducir
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    recordButton.textContent = "Grabar";
    playButton.disabled = false;
  } else {
    // Si no se encuentra grabando, comenzamos la grabación
    if (!mediaRecorder) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        audioChunks = [];
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        playButton.onclick = () => {
          audio.play();
        };
      };
    }

    mediaRecorder.start();
    recordButton.textContent = "Detener";
    playButton.disabled = true;
  }
});
