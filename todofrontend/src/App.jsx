import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Visa alert med timeout
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todo');
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
      showAlert('danger', 'Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async () => {
    if (!newTitle.trim()) return showAlert('warning', 'Title cannot be empty');
    try {
      const res = await fetch('/api/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, completed: false }),
      });
      if (!res.ok) throw new Error('Failed to create todo');
      setNewTitle('');
      fetchTodos();
      showAlert('success', 'Todo created!');
    } catch (err) {
      console.error(err);
      showAlert('danger', 'Failed to create todo');
    }
  };

  const toggleCompleted = async (id, completed) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const res = await fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: todo.title, completed: !completed }),
      });
      if (!res.ok) throw new Error('Failed to update todo');
      fetchTodos();
      showAlert('info', 'Todo updated!');
    } catch (err) {
      console.error(err);
      showAlert('danger', 'Failed to update todo');
    }
  };

  const updateTitle = async (id, title) => {
    if (!title.trim()) return showAlert('warning', 'Title cannot be empty');
    try {
      const todo = todos.find((t) => t.id === id);
      const res = await fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: todo.completed }),
      });
      if (!res.ok) throw new Error('Failed to update todo');
      fetchTodos();
      showAlert('info', 'Todo updated!');
    } catch (err) {
      console.error(err);
      showAlert('danger', 'Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    try {
      const res = await fetch(`/api/todo/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete todo');
      fetchTodos();
      showAlert('success', 'Todo deleted!');
    } catch (err) {
      console.error(err);
      showAlert('danger', 'Failed to delete todo');
    }
  };

  return (
    <div className="container mt-5" data-testid="app">
      <h1 className="mb-4" data-testid="app-title">Todo App</h1>

      {alert.message && (
        <div className={`alert alert-${alert.type}`} role="alert" data-testid="alert">
          {alert.message}
        </div>
      )}

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New todo"
          value={newTitle}
          data-testid="new-todo-input"
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && createTodo()}
        />
        <button className="btn btn-primary" onClick={createTodo} data-testid="add-todo-btn">
          Add
        </button>
      </div>

      <div className="row">
        {todos.map((todo) => (
          <div key={todo.id} className="col-md-6 mb-2" data-testid={`todo-item-${todo.id}`}>
            <div className={`card ${todo.completed ? 'bg-light text-decoration-line-through' : ''}`}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={todo.completed}
                    data-testid={`todo-checkbox-${todo.id}`}
                    onChange={() => toggleCompleted(todo.id, todo.completed)}
                  />
                  <input
                    type="text"
                    className="form-control d-inline w-auto border-0 bg-transparent p-0"
                    defaultValue={todo.title}
                    data-testid={`todo-title-${todo.id}`}
                    onBlur={(e) => updateTitle(todo.id, e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  data-testid={`todo-delete-${todo.id}`}
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
