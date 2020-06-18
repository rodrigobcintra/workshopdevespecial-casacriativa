const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./src/database/database.db')

db.serialize(function() {
    // criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)
    // // inserir dados
    // const query = `
    //     INSERT INTO ideas(
    //         image,
    //         title,
    //         category,
    //         description,
    //         link
    //         ) VALUES (?,?,?,?,?);
    // `
    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    //     "Karaoke",
    //     "Diversão em família",
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, vel sint reiciendis impedit magni et ducimus dicta nostrum soluta eius reprehenderit placeat quam tenetur quaerat ad, enim neque quas porro.",
    //     "https://rocketseat.com.br"
    // ]
    // db.run(query, values, function(err) {
    //     if (err)
    //     {
    //         return console.log(err)
    //     }
    //     console.log(this)
    // })
    // // consulta de dados
    // db.all(`SELECT * FROM ideas`, function(err, rows) {
    //     if (err) 
    //     {
    //         return console.log(err)
    //     }
    //     console.log(rows)
    // })
    // // deletar dados
    // db.run(`DELETE FROM ideas WHERE id = ?`, [2], function(err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Deletado", this)
    // })
})
module.exports = db
