import sqlite3 from 'sqlite3';
import path from 'path';

// Define o caminho para o arquivo do banco de dados na raiz do backend
const dbPath = path.resolve(__dirname, '..', '..', 'database.sqlite');

// Cria uma nova conexão com o banco de dados
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Função para criar a tabela de tarefas (todos) se ela não existir
export const createTable = () => {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL CHECK (completed IN (0, 1))
    );
  `;

  db.run(createTableSql, (err) => {
    if (err) {
      console.error('Error creating table', err.message);
    } else {
      console.log('Table "todos" is ready.');
    }
  });
};
