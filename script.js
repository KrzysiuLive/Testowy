const startStreamButton = document.getElementById("start-stream");
const stopStreamButton = document.getElementById("stop-stream");
const liveVideo = document.getElementById("live-video");

let mediaStream;

async function startStream() {
    try {
        // Prośba o dostęp do kamery i mikrofonu
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        liveVideo.srcObject = mediaStream;

        // Aktualizacja przycisków
        startStreamButton.disabled = true;
        stopStreamButton.disabled = false;

        showNotification("Streaming started successfully!");
    } catch (error) {
        // Obsługa błędów
        console.error("Error accessing media devices:", error);
        alert("Could not start the stream. Please check permissions or device availability.");
    }
}

function stopStream() {
    if (mediaStream) {
        // Zatrzymaj wszystkie strumienie
        mediaStream.getTracks().forEach(track => track.stop());
        liveVideo.srcObject = null;

        // Aktualizacja przycisków
        startStreamButton.disabled = false;
        stopStreamButton.disabled = true;

        showNotification("Streaming stopped.");
    }
}

function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

startStreamButton.addEventListener("click", startStream);
stopStreamButton.addEventListener("click", stopStream);
