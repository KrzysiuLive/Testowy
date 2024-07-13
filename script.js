document.addEventListener("DOMContentLoaded", function () {
    // This script runs when the DOM is fully loaded
    const loadingScreen = document.getElementById('loading-screen');

    // Hide the loading screen after a certain time or condition
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 5000); // Adjust the timeout as needed
});
