const speechtotext = require("./stt");
const ttscontroller = require("./tts");
const translateText = require("./translate");

async function controller(req, res) {
    try {
        const { gender, emotion, language, agegroup } = req.body;

        const text = await speechtotext();

        const translated = await translateText(text, language);

        const a = await ttscontroller(  
            translated,
            gender,
            emotion,
            language,
            agegroup
        );     
        
        res.json({
            originalText: text,
            translatedText: translated,
            outputpath: a.outputPath
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = controller;