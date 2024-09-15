const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

// Definindo o caminho do arquivo do banco de dados SQLite
const dbPath = path.resolve(__dirname, 'mitproject.db');

// Conectando ao banco de dados SQLite
let connection;
(async () => {
    try {
        connection = await sqlite.open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        console.log('Conectado ao banco de dados SQLite.');

        // Deletando e recriando as tabelas
        await connection.exec(`
            DROP TABLE IF EXISTS usuarios;
            DROP TABLE IF EXISTS palavras;

            CREATE TABLE usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                login TEXT,
                email TEXT NOT NULL,
                senha TEXT NOT NULL
            );

            CREATE TABLE palavras (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rank INTEGER,
                nome TEXT NOT NULL,
                descricao TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Tabelas recriadas com sucesso.');

    } catch (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
        throw err;
    }
})();

module.exports = connection;
