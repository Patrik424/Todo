// tests/todo.spec.js
import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {

  // Körs före varje test
  test.beforeEach(async ({ page }) => {
    page.on('dialog', dialog => dialog.accept()); // acceptera delete-confirm
    await page.goto('/'); // baseURL från config
  });

  test('visar Todo App rubrik', async ({ page }) => {
    const title = await page.getByTestId('app-title').textContent();
    expect(title).toBe('Todo App');
  });

  test('kan skapa en todo', async ({ page }) => {
    const input = page.getByTestId('new-todo-input');
    const addButton = page.getByTestId('add-todo-button');

    await input.fill('Playwright Todo');
    await addButton.click();

    const todos = page.getByTestId('todo-item');
    await expect(todos).toContainText('Playwright Todo');
  });

  test('kan markera todo som klar', async ({ page }) => {
    const checkbox = page.getByTestId('todo-completed').first();
    await checkbox.check();

    // Kontrollera att kortet får strike-through class
    const card = page.getByTestId('todo-item').first();
    await expect(card).toHaveClass(/text-decoration-line-through/);
  });

  test('kan uppdatera titel', async ({ page }) => {
    const input = page.getByTestId('todo-title-input').first();
    await input.fill('Updated Todo');
    await input.blur(); // onBlur triggers update

    const todos = page.getByTestId('todo-item');
    await expect(todos).toContainText('Updated Todo');
  });

  test('kan ta bort en todo', async ({ page }) => {
    const deleteButton = page.getByTestId('todo-delete-button').first();
    await deleteButton.click(); // dialog accepteras automatiskt

    const todos = page.getByTestId('todo-item');
    await expect(todos).not.toContainText('Updated Todo');
  });

});


