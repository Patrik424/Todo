package com.example.todo.controller;

import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/todo")
    public List<Todo> getAllTodo(){return todoService.getAllTodo();}

    @GetMapping("/todo/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable("id") Long id){
        return new ResponseEntity<>(todoService.getTodoById(id), HttpStatus.OK);
    }

    @PostMapping("/todo")
    public ResponseEntity<Todo> newTodo(@RequestBody Todo todo){
        return new ResponseEntity<>(todoService.newTodo(todo), HttpStatus.CREATED);
    }

    @PutMapping("/todo/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") Long id, @RequestBody Todo todo){
        return new ResponseEntity<>(todoService.updateTodo(id,todo), HttpStatus.OK);
    }

    @DeleteMapping("/todo/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long id){
        todoService.deleteTodo(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
