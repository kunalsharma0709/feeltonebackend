const express = require("express");
const cors = require("cors")
const app =express()
app.use(cors());
app.use(express.json());

const controller =require("./Routes/controller");
const speechtotext =require("./Routes/stt")
app.post("/lolla",controller);

app.get("/",(req,res)=>{
    return res.json({
        msg:"server running"
    })
})

// app.post("/comma", async (req, res) => {
//     try {
//         const text = await speechtotext();
//         res.json({ text });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

app.listen(3000)