package com.example.todobackend.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;


import com.example.todobackend.exception.TodoNotFoundException;
import com.example.todobackend.model.Todo;
import com.example.todobackend.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTodo() {
        Todo t1 = new Todo(1L, "Buy groceries", false);
        Todo t2 = new Todo(2L, "Walk dog", true);

        when(todoRepository.findAll()).thenReturn(Arrays.asList(t1, t2));

        List<Todo> todos = todoService.getAllTodo();
        assertEquals(2, todos.size());
        verify(todoRepository, times(1)).findAll();
    }

    @Test
    void testGetTodoById_Found() {
        Todo t = new Todo(1L, "Buy groceries", false);
        when(todoRepository.findById(1L)).thenReturn(Optional.of(t));

        Todo result = todoService.getTodoById(1L);
        assertEquals("Buy groceries", result.getTitle());
    }

    @Test
    void testGetTodoById_NotFound() {
        when(todoRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(TodoNotFoundException.class, () -> todoService.getTodoById(1L));
    }

    @Test
    void testNewTodo() {
        Todo t = new Todo(null, "Read book", false);
        when(todoRepository.save(t)).thenReturn(new Todo(1L, "Read book", false));

        Todo result = todoService.newTodo(t);
        assertNotNull(result.getId());
        assertEquals("Read book", result.getTitle());
    }

    @Test
    void testUpdateTodo() {
        Todo existing = new Todo(1L, "Buy groceries", false);
        Todo update = new Todo(null, "Buy groceries and milk", true);

        when(todoRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(todoRepository.save(existing)).thenReturn(new Todo(1L, "Buy groceries and milk", true));

        Todo result = todoService.updateTodo(1L, update);
        assertEquals("Buy groceries and milk", result.getTitle());
        assertTrue(result.isCompleted());
    }
}