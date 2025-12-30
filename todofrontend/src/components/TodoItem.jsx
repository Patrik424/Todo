import React from 'react';
import { Button, Form } from 'react-bootstrap';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div
      data-testid="todo-item"
      className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
    >
      <Form.Check
        data-testid="todo-checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        label={
          <span data-testid="todo-title">
            {todo.title}
          </span>
        }
      />

      <Button
  data-testid="delete-todo-btn"
  variant="danger"
  size="sm"
  onClick={() => {
    if (window.confirm(`Är du säker på att du vill ta bort "${todo.title}"?`)) {
      onDelete(todo.id);
    }
  }}
>
  Delete
</Button>
    </div>
  );
};

export default TodoItem;

