import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/TodoPage';

test.describe('Todo App', () => {

  test.beforeEach(async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();

    // Reset backend innan varje test
    await todo.clearTodos();
  });

  test('can add a new todo', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.addTodo('Buy milk');

    // Verifiera att todo finns
    await expect(todo.todoItems).toHaveCount(1);
    await expect(todo.todoItems.locator('[data-testid="todo-title"]')).toHaveText('Buy milk');
  });

  test('can toggle a todo', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.addTodo('Learn Playwright');

    // Toggle checkbox
    await todo.toggleTodo(0);

    // Kontrollera att checkbox är markerad
    const checkbox = todo.todoItems.nth(0).locator('[data-testid="todo-checkbox"]');
    await expect(checkbox).toBeChecked();
  });

  test('can delete a todo', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.addTodo('Clean room');

    // Radera todo
    await todo.deleteTodo(0);

    // Verifiera att listan är tom
    await expect(todo.todoItems).toHaveCount(0);
  });

});

