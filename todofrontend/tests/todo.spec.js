import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  // Körs före varje test
  test.beforeEach(async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    await page.goto('/');
  });

  test('visar Todo App rubrik', async ({ page }) => {
    const heading = page.getByTestId('app-heading');
    await expect(heading).toHaveText('Todo App');
  });

  test('kan skapa en todo', async ({ page }) => {
    const input = page.getByTestId('new-todo-input');
    const addButton = page.getByTestId('add-todo-button');

    await input.fill('Playwright Todo');
    await addButton.click();

    const todo = page.getByTestId('todo-title').filter({ hasText: 'Playwright Todo' });
    await expect(todo).toBeVisible();
  });

  test('kan markera todo som klar', async ({ page }) => {
    const checkbox = page.getByTestId('todo-checkbox').first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test('kan uppdatera titel', async ({ page }) => {
    const titleInput = page.getByTestId('todo-title-input').first();
    await titleInput.fill('Updated Todo');
    await titleInput.blur();

    const updated = page.getByTestId('todo-title').filter({ hasText: 'Updated Todo' });
    await expect(updated).toBeVisible();
  });

  test('kan ta bort en todo', async ({ page }) => {
    const deleteButton = page.getByTestId('delete-todo-button').first();
    await deleteButton.click();

    const removed = page.getByTestId('todo-title').first();
    await expect(removed).not.toHaveText('Playwright Todo');
  });
});



