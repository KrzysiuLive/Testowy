const startStreamButton = document.getElementById("start-stream");
const stopStreamButton = document.getElementById("stop-stream");
const liveVideo = document.getElementById("live-video");

let mediaStream;

async function startStream() {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        liveVideo.srcObject = mediaStream;

        startStreamButton.disabled = true;
        stopStreamButton.disabled = false;
    } catch (error) {
        alert("Error accessing media devices: " + error.message);
    }
}

function stopStream() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        liveVideo.srcObject = null;

        startStreamButton.disabled = false;
        stopStreamButton.disabled = true;
    }
}

startStreamButton.addEventListener("click", startStream);
stopStreamButton.addEventListener("click", stopStream);
