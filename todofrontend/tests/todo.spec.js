import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/TodoPage';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.clearTodos(); // reset backend + frontend
  });

  test('can add a new todo', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.addTodo('Buy milk');

    await expect(todo.todoItems).toHaveCount(1);
    await expect(todo.todoItems.locator('[data-testid="todo-title"]')).toHaveText('Buy milk');
  });

  test('can toggle a todo', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.addTodo('Learn Playwright');

    await todo.toggleTodo(0);

    const checkbox = todo.todoItems.nth(0).locator('[data-testid="todo-checkbox"]');
    await expect(checkbox).toBeChecked();
  });

  test('can delete a todo', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.addTodo('Clean room');

    await todo.deleteTodo(0);

    await expect(todo.todoItems).toHaveCount(0);
  });
});
