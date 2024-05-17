    require("dotenv").config({path: "./config.env"})
    const express = require("express")
    const app = express()
    const port = 3030
    const bcrypt = require("bcrypt")
    const path = require("path")
    const User = require("./models/User")
    const bodyParser = require("body-parser")

    app.use(express.static(path.join (__dirname, "public")))
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.get("/", (req,res)=> {
        res.sendFile(path.join(__dirname, "public", "views", "home.html"))
    })


    app.get("/sign-up", (req,res)=>{
        res.sendFile(path.join(__dirname, "public", "views", "sign-up.html"))
    })

    app.post("/sign-up", async(req,res) =>{
        const {userName, email, password} = req.body

        try{
            const existingEmail = await User.findOne({where: {email}})
            const existingUserName = await User.findOne({where: {userName}})

            if (existingEmail){
                return res.status(400).json({error: "O email ja está em uso."})
            }
            if (existingUserName){
                return res.status(400).json({error: "O nome de usuario ja está em uso."})
            }

            const hashedPassword = await bcrypt.hash(password,10)

            await User.create({
                userName,
                email,
                password: hashedPassword
            })

            res.status(201).json({message: "Usuario criado com sucesso"})
        } catch(error){
            console.error("Erro: ", error)
            res.status(500).json({error: "Erro ao criar usuario. Por favor, tente novamente"})
        }
    })

    app.get("/login", (req,res)=>{
        res.sendFile(path.join(__dirname, "public", "views", "login.html"))
    })
    app.listen(port, function(){
        console.log(`Sevido inciando na porta http://localhost:${port}`)
    })