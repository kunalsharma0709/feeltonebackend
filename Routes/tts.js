
const {emotions} = require("../database/db")
const {languages} = require("../database/db")
const runTTS = require("../Execution/runtts")


const path = require("path");


async function ttscontroller(text,gender,emotion,language) {

    const languagedoc = await languages.findById("languages_map");
    
    if (!languagedoc) {
        return res.status(400).json({
            msg: "language data not found"
        });
    }
    
    const languagecode = languagedoc.languages.get(language);

    const voice = await emotions.findOne({
        gender: gender,
        emotion: emotion
    });

    if (!voice) {
        return res.status(400).json({
            msg: "our model does not support this voice right now"
        });
    }

    // ✅ FIXED PATH (IMPORTANT)
    const fullPath = path.join(
        "D:/COQUITTS/voices",
        voice.filePath.replace(/^\/+/, "")
    );

    const outputPath = await runTTS(text, fullPath, languagecode);

    return ({
        outputPath,
        voice
    });
}

module.exports = ttscontroller;