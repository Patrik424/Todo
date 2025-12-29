import { expect } from '@playwright/test';
import api, { resetTodos } from '../../src/api';

export class TodoPage {
  constructor(page) {
    this.page = page;
    this.newTodoInput = page.locator('[data-testid="new-todo-input"]');
    this.addButton = page.locator('[data-testid="add-todo-btn"]');
    this.todoItems = page.locator('[data-testid="todo-item"]');
  }

  async goto() {
    await this.page.goto('http://localhost:5173'); // ändra om du kör annan port för Vite
    await this.newTodoInput.waitFor({ state: 'visible' });
  }

  async clearTodos() {
    // Reset backend via API with error handling and verification
    try {
      const response = await resetTodos();
      if (response.status !== 204) {
        throw new Error(`resetTodos failed: status ${response.status}`);
      }
    } catch (err) {
      throw new Error('Failed to reset backend: ' + err);
    }
    // Optionally verify that todos are cleared
    await this.page.reload();
    await this.newTodoInput.waitFor({ state: 'visible' });
    const count = await this.todoItems.count();
    if (count !== 0) {
      throw new Error(`Expected 0 todos after reset, but found ${count}`);
    }
  }

  async addTodo(title) {
    await this.newTodoInput.fill(title);
    await this.addButton.click();
    await expect(this.todoItems).toHaveCount(1); // validering att todo har lagts till
  }

  async toggleTodo(index = 0) {
    const checkbox = this.todoItems.nth(index).locator('[data-testid="todo-checkbox"]');
    await checkbox.click();
  }

  async deleteTodo(index = 0) {
    const deleteButton = this.todoItems.nth(index).locator('[data-testid="delete-todo-btn"]');
    await deleteButton.click();
  }
}


