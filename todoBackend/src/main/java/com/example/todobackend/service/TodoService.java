package com.example.todobackend.service;


import com.example.todobackend.exception.TodoNotFoundException;
import com.example.todobackend.model.Todo;
import com.example.todobackend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodo(){return todoRepository.findAll();}

    public Todo getTodoById(Long id){
        return todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException(id));
    }

    public Todo newTodo(Todo todo){return todoRepository.save(todo);}

    public Todo updateTodo(Long id, Todo upTodo) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(upTodo.getTitle());
                    todo.setCompleted(upTodo.isCompleted());
                    return todoRepository.save(todo);
                })
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    public void deleteTodo(Long id){
        todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException(id));
        todoRepository.deleteById(id);
    }

    public void resetTodos() {
        todoRepository.deleteAll();
    }


}
