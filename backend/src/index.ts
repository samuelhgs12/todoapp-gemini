import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import { createTable } from './database';

const app = express();
const PORT = process.env.PORT || 3000;

// Habilita o CORS para permitir requisições do frontend
app.use(cors());

// Habilita o parsing de JSON no corpo das requisições
app.use(express.json());

// Monta as rotas da API de todos sob o prefixo /api/todos
app.use('/api/todos', todoRoutes);

// Garante que a tabela 'todos' seja criada ao iniciar o servidor
createTable();

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
