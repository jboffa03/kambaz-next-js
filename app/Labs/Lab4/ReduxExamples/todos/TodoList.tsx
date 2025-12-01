"use client";

import { useState } from "react";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node"  }]);
  const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });
  const addTodo = (todo: any) => {
    const newTodos = [ ...todos, { ...todo,
      id: new Date().getTime().toString() }];
    setTodos(newTodos);
    setTodo({id: "-1", title: ""});
  };
  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const updateTodo = (todo: any) => {
    const newTodos = todos.map((item) =>
      (item.id === todo.id ? todo : item));
    setTodos(newTodos);
    setTodo({id: "-1", title: ""});
  };
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem>
          <Button onClick={() => addTodo(todo)}
                  id="wd-add-todo-click" className="btn btn-success float-end"> Add </Button>
          <Button onClick={() => updateTodo(todo)}
                  id="wd-update-todo-click" className="btn btn-warning float-end"> Update </Button>
          <FormControl value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}/>
        </ListGroupItem>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <Button onClick={() => deleteTodo(todo.id)}
                    id="wd-delete-todo-click" className="btn btn-danger float-end"> Delete </Button>
            <Button onClick={() => setTodo(todo)}
                    id="wd-set-todo-click" className="btn float-end"> Edit </Button>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup><hr/>
</div>);}