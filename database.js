const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Definindo o caminho do arquivo do banco de dados SQLite
var dbPath = path.resolve(__dirname, 'mitproject.db');

// Conectando ao banco de dados SQLite
var connection = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
        throw err;
    } else {
        console.log('Conectado ao banco de dados SQLite.');

        // Deletando e recriando as tabelas
        connection.serialize(() => {
            // Excluindo tabelas se existirem
            connection.run(`DROP TABLE IF EXISTS usuarios;`);
            connection.run(`DROP TABLE IF EXISTS palavras;`);

            // Recriando as tabelas
            connection.run(`
                CREATE TABLE usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    login TEXT,
                    email TEXT NOT NULL,
                    senha TEXT NOT NULL
                );
            `);

            connection.run(`
                CREATE TABLE palavras (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
					rank INTEGER,
					nome TEXT NOT NULL,
                    descricao TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);

            console.log('Tabelas recriadas com sucesso.');
        });
    }
});

module.exports = connection;
