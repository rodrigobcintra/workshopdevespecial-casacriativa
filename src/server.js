// express cria e configura  o servidor
const express = require("express")
const server = express()
const db = require("./database/db.js")

// configurar arquivos estaticos (css, scripts,)
server.use(express.static("public"))
// hablitar o req.body
server.use(express.urlencoded({extended: true}))
// configuracao do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// criar rota /
// e captura um pedido do cliente
server.get("/", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) 
        {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        // adicionando ("espalhando") os objetos de rows e nao os referenciando
        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
        return res.render("index.html", {ideas: lastIdeas})
        console.log(rows)
    })
})
server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) 
        {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        const reversedIdeas = [...rows].reverse()
        return res.render("ideas.html", {ideas: reversedIdeas})
        console.log(rows)
    })
})
server.post("/", function(req, res) {
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
            ) VALUES (?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    db.run(query, values, function(err) {
        if (err) 
        {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        return res.redirect("/ideias")
        console.log(this)
    })
})
// porta na qual o servidor esta aberto
server.listen(3000)