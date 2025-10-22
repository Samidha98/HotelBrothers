let scanner;

// Start Scanning
document.getElementById("startBtn").addEventListener("click", () => {
  // Clear any previous messages
  document.querySelector("#result span").textContent = "";

  if (!scanner) {
    scanner = new Html5Qrcode("reader");
  }

  scanner
    .start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 500, height: 600 } },
      (decodedText) => {
        // Stop the scanner immediately after a successful scan
        scanner
          .stop()
          .then(() => {
            console.log("Scanner successfully stopped.");
            // Clear the camera view
            scanner.clear();
            scanner = null;

            // Update the UI with the success message
            const resultSpan = document.querySelector("#result span");
            resultSpan.textContent = "Attendance marked successfully!";
            console.log("Scanned:", decodedText);
            console.log("UI updated with success message.");
          })
          .catch((err) => console.error("Stop failed:", err));
      },
      (error) => {
        console.warn(error);
      }
    )
    .catch((err) => {
      console.error("Camera start failed:", err);
    });
});

// Stop Scanning (This button is now optional but kept for manual control)
document.getElementById("stopBtn").addEventListener("click", () => {
  if (scanner) {
    scanner
      .stop()
      .then(() => {
        scanner.clear();
        scanner = null;
        const resultSpan = document.querySelector("#result span");
        resultSpan.textContent = "Scanner stopped by user.";
      })
      .catch((err) => console.error("Stop failed:", err));
  }
});
