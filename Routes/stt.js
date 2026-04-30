const { spawn } = require("child_process");

function speechtotext() {
    return new Promise((resolve, reject) => {

        const process = spawn(
            "D:/COQUITTS/tts_venv/Scripts/python.exe",
            ["D:/COQUITTS/stt.py"]
        );
        
        let finalText = "";
        
        process.stderr.on("data", (data) => {
            console.error("PYTHON:", data.toString());
        });

        process.stdout.on("data", (data) => {
            finalText += data.toString();
        });  
        
        process.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error("STT process failed with code " + code));
            }
           
            // Remove any "Detected language: ..." lines Whisper leaks to stdout
            const cleaned = finalText
                .split("\n")
                .filter(line => !line.toLowerCase().startsWith("detected language"))
                .join(" ")
                .trim();

            resolve(cleaned);
        });
    });
}

module.exports = speechtotext;