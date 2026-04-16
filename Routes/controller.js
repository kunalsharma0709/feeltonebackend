const speechtotext = require("./stt");
const ttscontroller = require("./tts");

async function controller(req, res) {
    const {  gender, emotion, language, agegroup } = req.body;

    if ( !gender || !emotion || !language || !agegroup) {
        return res.status(400).json({
            msg: "all fields are not selected"
        });
    }
    
    const text = await speechtotext()
    const a = await ttscontroller(
        text,
        gender,
        emotion,
        language,
        agegroup
    );
    
    return res.json({
        msg: "process completed successfully",
        outputpath: a.outputPath,
        gender: a.voice.gender,
        emotion: a.voice.emotion,
        agegroup: a.voice.agegroup
    });
}

module.exports = controller;