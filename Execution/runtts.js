const { exec } = require("child_process");
const util = require("util");

const execPromise = util.promisify(exec);

const runTTS = async (text, voicePath, language) => {
  try {
    const outputPath = `D:/COQUITTS/outputs/output_${Date.now()}.wav`;

    // escape quotes in text
    const safeText = text.replace(/"/g, '\\"');

    const command = `"D:/COQUITTS/tts_venv/Scripts/python.exe" "D:/COQUITTS/test.py" "${safeText}" "${voicePath}" "${language}" "${outputPath}"`;

   const { stdout, stderr } = await execPromise(command, {
    timeout: 0 // no timeout
});

    if (stderr) {
      console.warn("Python warning:", stderr);
    }

    return outputPath;

  } catch (error) {
    console.error("TTS Error:", error);
    throw error;
  }
};

module.exports = runTTS;