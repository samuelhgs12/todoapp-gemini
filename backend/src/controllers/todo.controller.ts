import { Request, Response } from 'express';
import { db } from '../database';

// Interface para definir a estrutura de um Todo
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// GET /api/todos - Busca todas as tarefas
export const getTodos = (req: Request, res: Response) => {
  const sql = 'SELECT * FROM todos ORDER BY id';
  db.all(sql, [], (err, rows: Todo[]) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Converte o valor de 'completed' de 0/1 para booleano
    const todos = rows.map(todo => ({
      ...todo,
      completed: !!todo.completed
    }));
    res.json(todos);
  });
};

// POST /api/todos - Cria uma nova tarefa
export const createTodo = (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const sql = 'INSERT INTO todos (title, completed) VALUES (?, ?)';
  const params = [title, 0]; // Novas tarefas começam como não concluídas (false)

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, completed: false });
  });
};

// PUT /api/todos/:id - Atualiza uma tarefa existente
export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (title === undefined || completed === undefined) {
    return res.status(400).json({ error: 'Title and completed status are required' });
  }

  const sql = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';
  const params = [title, completed ? 1 : 0, id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }
    res.json({ id: Number(id), title, completed });
  });
};

// DELETE /api/todos/:id - Deleta uma tarefa
export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todos WHERE id = ?';

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }
    res.status(204).send(); // 204 No Content
  });
};
