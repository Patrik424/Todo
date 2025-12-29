import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import api from '../api';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get('');
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to fetch todos', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
        const res = await api.post('', { title: newTodo, completed: false });
      setTodos(prev => [...prev, res.data]);
      setNewTodo('');
    } catch (err) {
      console.error('Failed to add todo', err);
    }
  };

  const toggleTodo = async (todo) => {
    try {
        const res = await api.put(`${todo.id}`, { ...todo, completed: !todo.completed });
      setTodos(prev => prev.map(t => (t.id === todo.id ? res.data : t)));
    } catch (err) {
      console.error('Failed to toggle todo', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
        await api.delete(`${id}`);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete todo', err);
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container mt-4">
      <h1>Todo List</h1>

      <div className="d-flex mb-3">
        <Form.Control
          data-testid="new-todo-input"
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button data-testid="add-todo-btn" className="ms-2" onClick={addTodo}>
          Add
        </Button>
      </div>

      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
      ))}
    </div>
  );
};

export default TodoList;



