import React from 'react';
import { Button, Form } from 'react-bootstrap';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div
      data-testid="todo-item"
      className="d-flex align-items-center justify-content-between mb-2 p-2 border rounded"
    >
      <Form.Check 
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        data-testid="todo-checkbox"
        className="me-2"
      />
      <span
        data-testid="todo-title"
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          flexGrow: 1
        }}
      >
        {todo.title}
      </span>
      <Button
        variant="danger"
        size="sm"
        onClick={onDelete}
        data-testid="delete-todo-btn"
      >
        Delete
      </Button>
    </div>
  );
};

export default TodoItem;



