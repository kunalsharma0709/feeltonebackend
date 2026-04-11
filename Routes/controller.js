const speechtotext = require("./stt")
const ttscontroller = require("./tts")

async function controller(req,res){
    const {gender,emotion,language}=req.body;

    if(!gender||!emotion || !language){
        return res.status(400).json({
            msg:"all fields are not selected"
        })
    }

    
    
    const b= await speechtotext()
    const a = await ttscontroller(
        b,
        gender,
        emotion,
        language
    )
    
    
    res.json({
        msg:"process completed successfully",
        outputpath:a.outputPath,
        gender:a.voice.gender,
        emotion:a.voice.emotion

    })
}

module.exports=controller;