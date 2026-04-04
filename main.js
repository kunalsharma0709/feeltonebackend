const express = require("express");
const cors = require("cors")
const app =express()
app.use(cors());
app.use(express.json());

const ttscontroller =require("./Routes/king");

app.post("/lolla",ttscontroller);

app.get("/",(req,res)=>{
    return res.json({
        msg:"server running"
    })
})

app.listen(3000)